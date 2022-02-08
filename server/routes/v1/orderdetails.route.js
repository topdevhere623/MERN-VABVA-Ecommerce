const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const orderDetailValidation = require('../../validations/orderdetails.validation');
const orderDetailController = require('../../controllers/orderdetails.controller');

const router = express.Router();

router
    .route('/')
    .get(auth('getOrderDetails'), validate(orderDetailValidation.getOrderDetails), orderDetailController.getOrderDetails)
    .post(auth('manageOrderDetails'), validate(orderDetailValidation.createOrderDetail), orderDetailController.createOrderDetail)

router.route('/:orderDetailId')
    .get(auth('getOrderDetails'), validate(orderDetailValidation.getOrderDetail), orderDetailController.getOrderDetail)
    .patch(auth('manageOrderDetails'), validate(orderDetailValidation.updateOrderDetail), orderDetailController.updateOrderDetail)
    .delete(auth('manageOrderDetails'), validate(orderDetailValidation.deleteOrderDetail), orderDetailController.deleteOrderDetail);

module.exports = router;