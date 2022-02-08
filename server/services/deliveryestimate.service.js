const httpStatus = require('http-status');
const { Product, Location, Basket } = require('../models');
const ApiError = require('../utils/ApiError');
const { DeliveryEstimate } = require('../models');

const createDeliveryEstimate = async (deliveryEstimateBody) => {
    const deliveryEstimate = await DeliveryEstimate.create(deliveryEstimateBody);
    return deliveryEstimate;
}

const queryDeliveryEstimates = async (filter, options) => {
    const deliveryEstimate = await DeliveryEstimate.paginate(filter, options);
    return deliveryEstimate;
}

const getDeliveryEstimateById = async (id) => {
    return DeliveryEstimate.findById(id);
}

const getDeliveryEstimates = async () => {
    return DeliveryEstimate.find();
}

const updateDeliveryEstimateById = async (deliveryEstimateId, updateBody) => {
    const deliveryEstimate = await getDeliveryEstimateById(deliveryEstimateId);
    if(!deliveryEstimate) {
        throw new ApiError(httpStatus.NOT_FOUND, 'DeliveryEstimate not found');
    }
    Object.assign(deliveryEstimate, updateBody);
    await deliveryEstimate.save();
    return deliveryEstimate;
}

const deleteDeliveryEstimateById = async (deliveryEstimateId) => {
    const deliveryEstimate = await getDeliveryEstimateById(deliveryEstimateId);
    if(!deliveryEstimate) {
        throw new ApiError(httpStatus.NOT_FOUND, 'DeliveryEstimate not found');
    }
    await deliveryEstimate.remove();
    return deliveryEstimate;
}

module.exports = {
    createDeliveryEstimate,
    queryDeliveryEstimates,
    getDeliveryEstimateById,
    getDeliveryEstimates,
    updateDeliveryEstimateById,
    deleteDeliveryEstimateById
}