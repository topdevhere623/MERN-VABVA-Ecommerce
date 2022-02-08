const httpStatus = require('http-status');
const moment = require('moment');
const mongoose = require('mongoose');
const ApiError = require('../utils/ApiError');
const { Order, Basket, Product, TaxId, Location, Category, Fee, Address, User, Calendar } = require('../models');

const ObjectID = mongoose.Types.ObjectId;

const getAmount = (type, amount, multipler) => {
  const payload = { totalAmount: 0, totalPercent: 0, subAmount: 0 };
  switch (type) {
    case 'daily':
      payload.subAmount = amount * multipler;
      payload.totalAmount += payload.subAmount;
      break;
    case 'percentage':
      payload.subAmount = product.cost.amount;
      payload.totalPercent += payload.subAmount;
      break;
    default:
      payload.subAmount = product.cost.amount;
      payload.totalAmount += payload.subAmount;
  }

  return payload;
};

const getOrderDetails = async (body, order = { _id: '' }, basket = null) => {
  const customerId = body.userId;
  const { productId } = body;
  const basketProduct = basket.products.find((p) => p.productId == body.productId);

  let payload = {};

  const product = await Product.findById(productId);
  const address = await Address.findOne({ userId: customerId });

  const customer = await User.findById(customerId);
  // const customerTaxId = await TaxId.findById(customer.tax.taxNumber);
  const business = await User.findById(product.userId);
  const businessAddress = await Address.findOne({ userId: product.userId });
  const businessTaxId = await TaxId.findOne({ country_code: businessAddress.country_code });
  const businessLocation = await Location.findOne({ userId: product.userId });

  console.log('[tax]', customer, customer.tax, business, business.tax);

  const category = await Category.findById(product.categoryId);
  const categoryJson = JSON.parse(JSON.stringify(category.fee));
  const categoryFeeObj = await Fee.findById(categoryJson.category);
  const referralFeeObj = await Fee.findById(categoryJson.referral);

  let taxPercent = 0;
  if (
    !customer.tax.taxNumber ||
    !customer.tax.verified ||
    !business.tax.taxNumber ||
    !business.tax.verified ||
    customer.tax.country_code != business.tax.country_code
  )
    taxPercent = 0.2;

  const costOptions = [];
  let totalAmount = 0;
  let totalPercent = 0;
  let res = {};

  res = getAmount(product.cost.type, product.cost.amount, product.cost.minimum.days);
  totalAmount += res.totalAmount;
  totalPercent += res.totalPercent;

  costOptions.push({
    name: product.productName,
    mandatory: false,
    type: product.cost.type,
    amount: res.subAmount,
    description: 'XXX',
    quantity: 1,
    selectedIdType: 'product',
    selectedId: product._id,
  });

  // Product Addition
  for (const additional of product.cost.additional) {
    res = getAmount(additional.type, additional.amount, product.cost.minimum.days);
    totalAmount += res.totalAmount;
    totalPercent += res.totalPercent;

    costOptions.push({
      // product additional
      name: product.productName,
      mandatory: additional.mandatory,
      type: additional.type,
      amount: res.amount,
      description: additional.description,
      quantity: 1,
      selectedIdType: 'product_additional',
      selectedId: additional._id,
    });
  }

  // Location addition
  for (const additional of businessLocation.additionalFee) {
    if (additional.service != 'hire') continue; // Only hire service included

    res = getAmount(additional.cost.type, additional.cost.value, 0);
    totalAmount += res.totalAmount;
    totalPercent += res.totalPercent;

    costOptions.push({
      // location additional
      name: additional.name,
      mandatory: true,
      type: additional.cost.type,
      amount: res.subAmount,
      description: 'XXX',
      quantity: 1,
      selectedIdType: 'location',
      selectedId: additional._id,
    });
  }

  totalAmount += (totalAmount * totalPercent) / 100;

  const payloadTax = totalAmount * taxPercent;
  const payloadTotal = totalAmount * (1 + taxPercent);
  const payloadCategoryFee =
    categoryFeeObj.type == 'fixed' ? categoryFeeObj.value : (totalAmount * categoryFeeObj.value) / 100;
  const payloadReferralFee =
    referralFeeObj.type == 'fixed' ? referralFeeObj.value : (payloadCategoryFee * referralFeeObj.value) / 100;
  const payloadCategoryTax =
    businessTaxId.cost.type == 'percentage' ? (payloadCategoryFee * businessTaxId.cost.value) / 100 : 0;

  payload = {
    users: {
      customerId,
      businessId: product.userId,
      referralId: customer.referral.userId,
    },
    orderId: order._id,
    categoryId: product.categoryId,
    productId,
    locationId: product.locationId,
    address: [
      {
        firstName: address.firstName,
        lastName: address.lastName,
        address_line1: address.address_line1,
        address_line2: address.address_line2,
        state: address.state,
        postal_code: address.postal_code,
        country_code: address.country_code,
      },
    ],
    service: basketProduct.service,
    tax: {
      customer: {
        taxNumber: customer.tax.taxNumber,
        country_code: customer.tax.country_code,
      },
      business: {
        taxNumber: business.tax.taxNumber,
        country_code: business.tax.country_code,
      },
    },
    refund: {
      balance: body.refund.reduce((a, b) => a.balance + b.balance, 0),
      transactions: body.refund,
    },
    delivery: {
      estimateId: product.delivery.estimateId,
      tracking: body.tracking,
    },
    cost: {
      options: costOptions,
      tax: payloadTax,
      category: {
        fee: payloadCategoryFee,
        tax: payloadCategoryTax,
      },
      referralFee: payloadReferralFee,
      total: payloadTotal,
    },
  };

  return payload;
};

const checkAvalibltyForHireProducts = (productsFromDbObj, productPerMonthDbObj, hireProducts) => {
  const bulkUpdateArray = [];
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
            throw new ApiError(httpStatus.BAD_REQUEST, 'required quantity is greater than available amount');
          }
        }
      }
      bulkUpdateArray.push({
        updateOne: {
          filter: { productId, month: monthString },
          update: { $inc: { [`quantityPerDayObj.${dayString}`]: requiredQuantity } },
          upsert: true,
        },
      });
    });
  });

  return bulkUpdateArray;
};

const createUpdatesPurchesProducts = (productsFromDbObj, productsArray) => {
  const bulkUpdateArray = [];
  productsArray.forEach((purchaseProduct) => {
    const { productId, selectedId, selectedIdType } = purchaseProduct;
    const productFromDb = productsFromDbObj[productId.toString()];

    if (selectedIdType === 'product_variation') {
      bulkUpdateArray.push({
        updateOne: {
          filter: { _id: productFromDb._id },
          update: {
            $inc: { 'variation.$[].items.$[inner].quantity': -purchaseProduct.quantity },
          },
          arrayFilters: [{ 'inner._id': ObjectID(selectedId) }],
          timestamps: false,
        },
      });
    } else {
      bulkUpdateArray.push({
        updateOne: {
          filter: { _id: productFromDb._id },
          update: { $inc: { 'stock.quantity': -purchaseProduct.quantity } },
        },
      });
    }
  });
  return bulkUpdateArray;
};
const validateBusketProducts = async (basket) => {
  const productsFromDbObj = await Product.validateBasketProducts(basket);
  if (!productsFromDbObj) {
    throw new ApiError(httpStatus.NOT_FOUND, 'One Of the Products not found or not avalible in basket location');
  }

  return productsFromDbObj;
};

const filterBasketProducts = (basketProducst) => {
  const hireProducts = [];
  const purchaseProducts = [];
  basketProducst.forEach((product) => {
    if (product.service.type === 'hire') {
      hireProducts.push(product);
    }
    if (product.service.type === 'purchase') {
      purchaseProducts.push(product);
    }
  });
  return { hireProducts, purchaseProducts };
};
const createOrder = async (orderBody) => {
  const { userId } = orderBody;

  const session = await Basket.startSession();
  session.startTransaction();
  try {
    const basket = await Basket.findOne({ userId }).session(session).lean();

    const productsFromDbObj = await validateBusketProducts(basket);
    const { hireProducts, purchaseProducts } = filterBasketProducts(basket.products);

    const productPerMonthDbObj = await Calendar.getHireProductsPerMonths(hireProducts, session);

    const updateArrayForPurches = createUpdatesPurchesProducts(productsFromDbObj, purchaseProducts);
    const updateArrayForHire = checkAvalibltyForHireProducts(productsFromDbObj, productPerMonthDbObj, hireProducts);

    await Product.bulkWrite(updateArrayForPurches, { session });
    await Calendar.bulkWrite(updateArrayForHire, { session });

    // TODO create orderDetails and then create Order using session then delete userBasket

    await session.commitTransaction();

    session.endSession();
    return basket;
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    throw err;
  }
};

const queryOrders = async (filter, options) => {
  const order = await Order.paginate(filter, options);
  return order;
};

const getOrderById = async (id) => {
  return Order.findById(id);
};

const getOrders = async () => {
  return Order.find();
};

const updateOrderById = async (orderId, updateBody) => {
  const order = await getOrderById(orderId);
  if (!order) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Order not found');
  }
  Object.assign(order, updateBody);
  await order.save();
  return order;
};

const deleteOrderById = async (orderId) => {
  const order = await getOrderById(orderId);
  if (!order) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Order not found');
  }
  await order.remove();
  return order;
};

module.exports = {
  createOrder,
  queryOrders,
  getOrderById,
  getOrders,
  updateOrderById,
  deleteOrderById,
};
