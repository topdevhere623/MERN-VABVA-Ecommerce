const httpStatus = require('http-status');

const moment = require('moment');

const { Basket, Product, Calendar } = require('../models');
const ApiError = require('../utils/ApiError');

const checkAvalibltyForHireProducts = (productsFromDbObj, productPerMonthDbObj, hireProducts) => {
  hireProducts.forEach((orderProduct) => {
    const { productId } = orderProduct;
    const productFromDb = productsFromDbObj[productId.toString()];

    const requiredQuantity = orderProduct.quantity;
    const productQuantity = productFromDb.stock.quantity;

    orderProduct.service.dates.forEach((date) => {
      const monthString = moment(new Date(date)).format('YYYY-MM').toString();
      const dayString = moment(new Date(date)).format('YYYY-MM-DD').toString();

      const idMonthKey = `${productId.toString()}@${monthString}`;
      if (productPerMonthDbObj[idMonthKey]) {
        const oldBookedQuantity =
          productPerMonthDbObj[idMonthKey].quantityPerDayObj &&
          productPerMonthDbObj[idMonthKey].quantityPerDayObj[dayString];

        if (oldBookedQuantity) {
          if (oldBookedQuantity + requiredQuantity > productQuantity) {
            throw new ApiError(httpStatus.BAD_REQUEST, 'required quantity is greater than available amount in hire product');
          }
        }
      }
      // else mean that no one order that product in the same day means it's available
    });
  });
};

const createBasket = async (basketBody) => {
  const { userId } = basketBody;
  const productsFromDbObj = await Product.validateBasketProducts(basketBody);
  if (!productsFromDbObj) {
    throw new ApiError(httpStatus.NOT_FOUND, 'ONE OF THE PRODUCTS NOT AVALIBLE');
  }

  const hireProducts = basketBody.products.filter((product) => product.service.type === 'hire');
  if (hireProducts.length > 0) {
    const productPerMonthDbObj = await Calendar.getHireProductsPerMonths(hireProducts);

    checkAvalibltyForHireProducts(productsFromDbObj, productPerMonthDbObj, hireProducts);
  }

  // TODO allow user to use baskedId to able to support more than one basket

  const basket = await Basket.findOneAndUpdate({ userId }, basketBody, { upsert: true, new: true });

  return basket;
};

const queryBaskets = async (filter, options) => {
  const basket = await Basket.paginate(filter, options);
  return basket;
};

const getBasketById = async (id) => {
  return Basket.findById(id);
};

const getBaskets = async () => {
  return Basket.find();
};

const updateBasketById = async (basketId, updateBody) => {
  const basket = await getBasketById(basketId);
  if (!basket) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Basket not found');
  }

  for (const product of updateBody.products) {
    if (!(await Product.isProductExists(product.productId))) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
    }
    if (!(await Product.isQuantityAvailable(product.productId))) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Product quantity is run out');
    }
    if (!(await Product.isWithinProductLocation(product.productId, updateBody.location.coordinates))) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Product is out of user location');
    }
  }

  Object.assign(basket, updateBody);
  basket.save();
  return basket;
};

// const deleteBasketById = async (basketId) => {
//     const basket = await getBasketById(basketId);
//     if (!basket) {
//         throw new ApiError(httpStatus.NOT_FOUND, 'Basket not found');
//     }
//     await basket.remove();
//     return basket;
// }

module.exports = {
  createBasket,
  queryBaskets,
  getBasketById,
  getBaskets,
  updateBasketById,
  // deleteBasketById
};
