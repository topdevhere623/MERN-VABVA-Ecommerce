const mongoose = require('mongoose');
const moment = require('moment');

const ObjectID = mongoose.Types.ObjectId;

const { toJSON, paginate } = require('./plugins');

const calendarSchema = mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    month: { type: String, required: true }, // "2021-09"
    quantityPerDayObj: { type: Object, default: {} }, // { '2021-09-09': 30  }
  },
  {
    timestamps: true,
    minimize: false,
  }
);

// add plugin that converts mongoose to json
calendarSchema.plugin(toJSON);
calendarSchema.plugin(paginate);

calendarSchema.statics.getProductsPerDates = async function (hireProducts) {

  const allMonths = [];
  const $orQuery = [];
  let hireIds = [];

  for (const product of hireProducts) {
    let { productId } = product;
    hireIds.push(productId = ObjectID(productId))

    for (const date of product.dates) {
      const monthString = moment(new Date(date)).format('YYYY-MM').toString();
      const dayString = moment(new Date(date)).format('YYYY-MM-DD').toString();

      allMonths.push(monthString);
      $orQuery.push({
        productId: productId,
        'dates.k': dayString,
      });
    }
  }

  let _query = [
    {
      $match: {
        productId: { $in: hireIds },
        month: { $in: allMonths },
      },
    },
    {
      $addFields: {
        dates: { $objectToArray: '$quantityPerDayObj' },
      },
    },
    {
      $unwind: '$dates',
    },
    { $match: { $or: $orQuery } },
    { $addFields: { dates: ['$dates'] } },
    {
      $group: {
        _id: '$productId',
        dates: {
          $push: { $arrayToObject: '$dates' },
        },
      },
    },
    {
      $project: {
        productId: '$_id',
        dates: 1,
        _id: 0,
      },
    },
  ]

  // console.log(JSON.stringify(_query))
  const queryResponse = await this.aggregate(_query);

  //all of this code is used to find missing dates from results and append them with 0 so we know that nothing has been booked.
  let availableProductIds = queryResponse.map(x => x.productId);

  let availableProductMap = new Map();
  for (const item of queryResponse) {
    const { productId } = item
    let availableDates = [];
    for (let i = 0; i < item.dates.length; i++) {
      const _availableDay = moment(new Date(Object.keys(item.dates[i])[0])).format('YYYY-MM-DD').toString()
      availableDates.push(_availableDay)
    }

    availableProductMap.set(productId.toString(), availableDates);

  }

  let productDatesMap = new Map();
  let pushedIds = new Map();

  for (const product of hireProducts) {
    let { productId } = product;

    if (!availableProductMap.get(productId.toString())) {
      if (!pushedIds.get(productId.toString())) {
        let dates = product.dates.map(x => {
          let _x = moment(new Date(x)).format('YYYY-MM-DD').toString()
          let newDate = {};
          newDate[_x] = 0;
          return newDate;
        })
        queryResponse.push({ productId, dates })
        pushedIds.set(productId.toString(), true)
      }

    } else {
      product.dates.map(x => {
        let _x = moment(new Date(x)).format('YYYY-MM-DD').toString()
        let newDate = {};
        newDate[_x] = 0;

        if (availableProductMap.get(productId.toString()).indexOf(_x) == -1) {
          if (!productDatesMap.get(productId.toString())) {
            productDatesMap.set(productId.toString(), [newDate])
          } else {
            let x = productDatesMap.get(productId.toString());
            x.push(newDate)
            productDatesMap.set(productId.toString(), x)
          }
        }
      })

    }

  }

  for (let i = 0; i < queryResponse.length; i++) {
    if (productDatesMap.get(queryResponse[i].productId.toString())) {
      queryResponse[i].dates.push(...productDatesMap.get(queryResponse[i].productId.toString()))
    }
  }

  // console.log(queryResponse)
  return queryResponse;
};

calendarSchema.statics.getHireProductsPerMonths = async function (hireProducts, session = null) {
  if (hireProducts.length > 0) {
    const allMonths = [];
    const allProductsIds = [];
    hireProducts.forEach((product) => {
      const { productId } = product;
      allProductsIds.push(ObjectID(productId));
      product.service.dates.forEach((date) => {
        const monthString = moment(new Date(date)).format('YYYY-MM').toString();
        allMonths.push(monthString);
      });
    });

    const producstPerMonths = await this.find({
      productId: { $in: allProductsIds },
      month: { $in: allMonths },
    })
      .session(session)
      .lean();
    const productPerMonthsObj = {};
    producstPerMonths.forEach((productPerMonth) => {
      const { productId, month } = productPerMonth;
      productPerMonthsObj[`${productId.toString()}@${month}`] = productPerMonth;
    });

    return productPerMonthsObj;
  }
  return null;
};
/**
 * @typedef Calendar
 */
const Calendar = mongoose.model('Calendar', calendarSchema);

module.exports = Calendar;
