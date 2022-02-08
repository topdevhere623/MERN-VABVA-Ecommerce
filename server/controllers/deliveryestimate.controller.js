const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { deliveryEstimateService } = require('../services');

const createDeliveryEstimate = catchAsync(async (req, res) => {
    const deliveryEstimate = await deliveryEstimateService.createDeliveryEstimate(req.body);
    res.status(httpStatus.CREATED).send(deliveryEstimate);
});

const getDeliveryEstimates = catchAsync(async (req, res) => {
    const filter = pick(req.body, ['name']);
    const _filter = filter && filter.name ? { name: new RegExp("^" + filter.name, "i") } : {};
    const options = pick(req.query, ['sortBy', 'limit', 'page']);
    const result = await deliveryEstimateService.queryDeliveryEstimates(_filter, options);
    res.send(result);
});

const getDeliveryEstimate = catchAsync(async (req, res) => {
    const deliveryEstimate = await deliveryEstimateService.getDeliveryEstimateById(req.params.deliveryEstimateId);
    if(!deliveryEstimate) {
        throw new ApiError(httpStatus.NOT_FOUND, 'DeliveryEstimate not found');
    }
    res.send(deliveryEstimate);
});

const updateDeliveryEstimate = catchAsync(async (req, res) => {
    const deliveryEstimate = await deliveryEstimateService.updateDeliveryEstimateById(req.params.deliveryEstimateId, req.body);
    res.send(deliveryEstimate);
});

const deleteDeliveryEstimate = catchAsync(async (req, res) => {
    await deliveryEstimateService.deleteDeliveryEstimateById(req.params.deliveryEstimateId);
    res.status(httpStatus.NOT_FOUND).send();
});

module.exports = {
    createDeliveryEstimate,
    getDeliveryEstimates,
    getDeliveryEstimate,
    updateDeliveryEstimate,
    deleteDeliveryEstimate,
};  
