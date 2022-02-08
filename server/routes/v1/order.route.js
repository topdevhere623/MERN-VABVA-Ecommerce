const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const orderValidation = require('../../validations/order.validation');
const orderController = require('../../controllers/order.controller');

const router = express.Router();

router
    .route('/')
    .get(auth('getOrders'), validate(orderValidation.getOrders), orderController.getOrders)
    .post(auth('manageOrders'), validate(orderValidation.createOrder), orderController.createOrder)

router.route('/:orderId')
    .get(auth('getOrders'), validate(orderValidation.getOrder), orderController.getOrder)
    .patch(auth('manageOrders'), validate(orderValidation.updateOrder), orderController.updateOrder)
    .delete(auth('manageOrders'), validate(orderValidation.deleteOrder), orderController.deleteOrder);

module.exports = router;