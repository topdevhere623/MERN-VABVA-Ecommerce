const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const { OrderDetail } = require('../models');

const createOrderDetail = async (orderDetailBody) => {
    if (await OrderDetail.isOrderDetailExists(orderDetailBody.userId)) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Basket already exists');
    }
    const orderDetail = await OrderDetail.create(orderDetailBody);
    return orderDetail;
}

const queryOrderDetails = async (filter, options) => {
    const orderDetail = await OrderDetail.paginate(filter, options);
    return orderDetail;
}

const getOrderDetailById = async (id) => {
    return OrderDetail.findById(id);
}

const getOrderDetails = async () => {
    return OrderDetail.find();
}

const updateOrderDetailById = async (orderDetailId, updateBody) => {
    const orderDetail = await getOrderDetailById(orderDetailId);
    if(!orderDetail) {
        throw new ApiError(httpStatus.NOT_FOUND, 'OrderDetail not found');
    }
    Object.assign(orderDetail, updateBody);
    await orderDetail.save();
    return orderDetail;
}

const deleteOrderDetailById = async (orderDetailId) => {
    const orderDetail = await getOrderDetailById(orderDetailId);
    if(!orderDetail) {
        throw new ApiError(httpStatus.NOT_FOUND, 'OrderDetail not found');
    }
    await orderDetail.remove();
    return orderDetail;
}

module.exports = {
    createOrderDetail,
    queryOrderDetails,
    getOrderDetailById,
    getOrderDetails,
    updateOrderDetailById,
    deleteOrderDetailById
}