/* eslint-disable no-restricted-syntax */
const httpStatus = require('http-status');

const { Product, Calendar } = require('../models');
const ApiError = require('../utils/ApiError');
const mongoose = require('mongoose');
const moment = require('moment');

const { x } = require('joi');


const getAvailableQuntityPerDateHire = async (productsDateArray, productDetails) => {
  for (let i = 0; i < productsDateArray.length; i += 1) {
    const currProduct = productsDateArray[i];
    const currProductQuantity = (productDetails.find(x => x._id.toString() == currProduct.productId.toString())).stock.quantity;

    for (const dateObj of currProduct.dates) {
      const keysArray = Object.keys(dateObj);
      for (const key of keysArray) {
        dateObj[key] = currProductQuantity - dateObj[key];
      }
    }
  }
  return productsDateArray;
};
const getAvailableQuantityperDatePurchase = async (purchaseProducts, productDetails) => {

  let availableProductDates = []
  purchaseProducts.map(product => {
    let productDetail = productDetails.find(x => x._id == product.productId);

    if (product.selectedIdType == "product") {
      availableProductDates.push({
        productId: product.productId,
        selectedIdType: product.selectedIdType,
        selectedId: product.selectedId,
        dates: [product.dates.map(x => {
          const dayString = moment(new Date(x)).format('YYYY-MM-DD').toString();
          let newDate = {};
          newDate[dayString] = productDetail.stock.quantity;

          return newDate;
        })]
      })
    } else if (product.selectedIdType == "product_variation") {

      productDetail.variation.find(x => x.items.find(x => {
        if (x._id.toString() == product.selectedId.toString()) {

          availableProductDates.push({
            productId: product.productId,
            selectedIdType: product.selectedIdType,
            selectedId: product.selectedId,
            dates: [product.dates.map(date => {
              const dayString = moment(new Date(date)).format('YYYY-MM-DD').toString();
              let newDate = {};
              newDate[dayString] = x.quantity;
              return newDate;
            })]
          })
        }
      }))

    }

  })

  return availableProductDates;

}
/* note if day not consume we will not return it in the array of dates */
const validateProducts = async (products) => {

  let productIds = products.map(o => o.productId);

  const productDetails = await Product.findArrayOfProducts(productIds);
  if (!productDetails) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'NO PRODUCTS AVAILABLE');
  }

  let hireProductIds = [];
  let purchaseProductIds = [];
  for (const product of productDetails) {
    if (product.service == "hire") {
      hireProductIds.push(product._id.toString());
    } else {
      purchaseProductIds.push(product._id.toString())
    }
  }

  let hireProducts = products.filter((product) => {
    return hireProductIds.indexOf(product.productId) !== -1;
  })

  let purchaseProducts = products.filter((product) => {
    return purchaseProductIds.indexOf(product.productId) !== -1;
  })

  const productsDateArray = await Calendar.getProductsPerDates(hireProducts);
  const availablePerdayHire = await getAvailableQuntityPerDateHire(productsDateArray, productDetails);
  const availablePerDayPurchase = await getAvailableQuantityperDatePurchase(purchaseProducts, productDetails)

  const availableDatesCollecton = [...availablePerdayHire, ...availablePerDayPurchase]
  const filteredAvailableDatesCollecton = availableDatesCollecton.filter(item => hireProductIds.indexOf(item.productId) !== -1 || purchaseProductIds.indexOf(item.productId) !== -1)

  return filteredAvailableDatesCollecton;
};

module.exports = {
  validateProducts,
};
