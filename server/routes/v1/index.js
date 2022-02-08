const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const locationRoute = require('./location.route');
const productRoute = require('./product.route');
const basketRoute = require('./basket.route');
const addressRoute = require('./address.route');
const balanceRoute = require('./balance.route');
const categoryRoute = require('./category.route');
const feeRoute = require('./fee.route');
const deliveryEstimate = require('./deliveryestimate.route');
const paymentRoute = require('./payment.route');
const messageRoute = require('./message.route');
const messageDetailRoute = require('./messagedetails.route');
const orderRoute = require('./order.route');
const orderDetailRoute = require('./orderdetails.route');
const reorderRoute = require('./reorder.route');
const reviewRoute = require('./review.route');
const taxIdRoute = require('./taxid.route');
const countryRoute = require('./country.route');
const availabilityRoute = require('./availability.route');

const docsRoute = require('./docs.route');
const config = require('../../config/config');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/user',
    route: userRoute,
  },
  {
    path: '/location',
    route: locationRoute,
  },
  {
    path: '/product',
    route: productRoute,
  },
  {
    path: '/availability',
    route: availabilityRoute,
  },
  {
    path: '/basket',
    route: basketRoute,
  },
  {
    path: '/address',
    route: addressRoute,
  },
  {
    path: '/balance',
    route: balanceRoute,
  },
  {
    path: '/category',
    route: categoryRoute,
  },
  {
    path: '/fee',
    route: feeRoute,
  },
  {
    path: '/deliveryEstimate',
    route: deliveryEstimate,
  },
  {
    path: '/payment',
    route: paymentRoute,
  },
  {
    path: '/message',
    route: messageRoute,
  },
  {
    path: '/messageDetail',
    route: messageDetailRoute,
  },
  {
    path: '/order',
    route: orderRoute,
  },
  {
    path: '/orderDetail',
    route: orderDetailRoute,
  },
  {
    path: '/reorder',
    route: reorderRoute,
  },
  {
    path: '/review',
    route: reviewRoute,
  },
  {
    path: '/taxId',
    route: taxIdRoute,
  },
  {
    path: '/country',
    route: countryRoute,
  },
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
