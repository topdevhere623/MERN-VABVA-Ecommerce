const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { orderDetailService } = require('../services');

const createOrderDetail = catchAsync(async (req, res) => {
    const userId = req.user._id;
    const reqBodyWithUserId = { userId, ...req.body };
    const orderDetail = await orderDetailService.createOrderDetail(reqBodyWithUserId);
    res.status(httpStatus.CREATED).send(orderDetail);
});

const getOrderDetails = catchAsync(async (req, res) => {
    const filter = pick(req.body, ['orderDetailName']);
    const _filter = filter && filter.orderDetailName ? { orderDetailName: new RegExp("^" + filter.orderDetailName, "i") } : {};
    const options = pick(req.query, ['sortBy', 'limit', 'page']);
    const result = await orderDetailService.queryOrderDetails(_filter, options);
    res.send(result);
});

const getOrderDetail = catchAsync(async (req, res) => {
    const orderDetail = await orderDetailService.getOrderDetailById(req.params.orderDetailId);
    if(!orderDetail) {
        throw new ApiError(httpStatus.NOT_FOUND, 'OrderDetail not found');
    }
    res.send(orderDetail);
});

const updateOrderDetail = catchAsync(async (req, res) => {
    const userId = req.user._id;
    const reqBodyWithUserId = { userId, ...req.body };
    const orderDetail = await orderDetailService.updateOrderDetailById(req.params.orderDetailId, reqBodyWithUserId);
    res.send(orderDetail);
});

const deleteOrderDetail = catchAsync(async (req, res) => {
    await orderDetailService.deleteOrderDetailById(req.params.orderDetailId);
    res.status(httpStatus.NOT_FOUND).send();
});

module.exports = {
    createOrderDetail,
    getOrderDetails,
    getOrderDetail,
    updateOrderDetail,
    deleteOrderDetail,
};  
