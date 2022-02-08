const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const paymentValidation = require('../../validations/payment.validation');
const paymentController = require('../../controllers/payment.controller');

const router = express.Router();

router
    .route('/')
    .get(auth('getPayments'), validate(paymentValidation.getPayments), paymentController.getPayments)
    .post(auth('managePayments'), validate(paymentValidation.createPayment), paymentController.createPayment)

router.route('/:paymentId')
    .get(auth('getPayments'), validate(paymentValidation.getPayment), paymentController.getPayment)
    .patch(auth('managePayments'), validate(paymentValidation.updatePayment), paymentController.updatePayment)
    .delete(auth('managePayments'), validate(paymentValidation.deletePayment), paymentController.deletePayment);

module.exports = router;