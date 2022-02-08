const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { orderService } = require('../services');

const createOrder = catchAsync(async (req, res) => {
    const userId = req.user._id;
    const reqBodyWithUserId = { userId, ...req.body };
    const order = await orderService.createOrder(reqBodyWithUserId);
    res.status(httpStatus.CREATED).send(order);
});

const getOrders = catchAsync(async (req, res) => {
    const filter = pick(req.body, ['orderName']);
    const _filter = filter && filter.orderName ? { orderName: new RegExp("^" + filter.orderName, "i") } : {};
    const options = pick(req.query, ['sortBy', 'limit', 'page']);
    const result = await orderService.queryOrders(_filter, options);
    res.send(result);
});

const getOrder = catchAsync(async (req, res) => {
    const order = await orderService.getOrderById(req.params.orderId);
    if(!order) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Order not found');
    }
    res.send(order);
});

const updateOrder = catchAsync(async (req, res) => {
    const userId = req.user._id;
    const reqBodyWithUserId = { userId, ...req.body };
    const order = await orderService.updateOrderById(req.params.orderId, reqBodyWithUserId);
    res.send(order);
});

const deleteOrder = catchAsync(async (req, res) => {
    await orderService.deleteOrderById(req.params.orderId);
    res.status(httpStatus.NOT_FOUND).send();
});

module.exports = {
    createOrder,
    getOrders,
    getOrder,
    updateOrder,
    deleteOrder,
};  
