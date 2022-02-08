const httpStatus = require('http-status');
const { Product, Location, Basket } = require('../models');
const ApiError = require('../utils/ApiError');
const { Payment } = require('../models');

const createPayment = async (paymentBody) => {
    const payment = await Payment.create(paymentBody);
    return payment;
}

const queryPayments = async (filter, options) => {
    const payment = await Payment.paginate(filter, options);
    return payment;
}

const getPaymentById = async (id) => {
    return Payment.findById(id);
}

const getPayments = async () => {
    return Payment.find();
}

const updatePaymentById = async (paymentId, updateBody) => {
    const payment = await getPaymentById(paymentId);
    if(!payment) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Payment not found');
    }
    Object.assign(payment, updateBody);
    await payment.save();
    return payment;
}

const deletePaymentById = async (paymentId) => {
    const payment = await getPaymentById(paymentId);
    if(!payment) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Payment not found');
    }
    await payment.remove();
    return payment;
}

module.exports = {
    createPayment,
    queryPayments,
    getPaymentById,
    getPayments,
    updatePaymentById,
    deletePaymentById
}