const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { paymentService } = require('../services');

const createPayment = catchAsync(async (req, res) => {
    const payment = await paymentService.createPayment(req.body);
    res.status(httpStatus.CREATED).send(payment);
});

const getPayments = catchAsync(async (req, res) => {
    const filter = pick(req.body, ['paymentName']);
    const _filter = filter && filter.paymentName ? { paymentName: new RegExp("^" + filter.paymentName, "i") } : {};
    const options = pick(req.query, ['sortBy', 'limit', 'page']);
    const result = await paymentService.queryPayments(_filter, options);
    res.send(result);
});

const getPayment = catchAsync(async (req, res) => {
    const payment = await paymentService.getPaymentById(req.params.paymentId);
    if(!payment) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Payment not found');
    }
    res.send(payment);
});

const updatePayment = catchAsync(async (req, res) => {
    const payment = await paymentService.updatePaymentById(req.params.paymentId, req.body);
    res.send(payment);
});

const deletePayment = catchAsync(async (req, res) => {
    await paymentService.deletePaymentById(req.params.paymentId);
    res.status(httpStatus.NOT_FOUND).send();
});

module.exports = {
    createPayment,
    getPayments,
    getPayment,
    updatePayment,
    deletePayment,
};  
