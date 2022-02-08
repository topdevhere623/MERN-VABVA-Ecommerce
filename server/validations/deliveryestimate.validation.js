const Joi = require('joi');
const { objectId, isMobile, isCountryCode } = require('./custom.validation');

const createDeliveryEstimate = {
    body: Joi.object().keys({
        name: Joi.string().required()
    })
        .min(1)
}

const getDeliveryEstimates = {
    query: Joi.object().keys({
        name: Joi.string(),
        sortBy: Joi.string(),
        limit: Joi.number().integer(),
        page: Joi.number().integer(),
    })
}

const getDeliveryEstimate = {
    params: Joi.object().keys({
        deliveryEstimateId: Joi.string().custom(objectId),
    }),
}

const updateDeliveryEstimate = {
    params: Joi.object().keys({
        deliveryEstimateId: Joi.required().custom(objectId),
    }),
    body: Joi.object().keys({
        name: Joi.string().required()
    })
        .min(1)
}

const deleteDeliveryEstimate = {
    params: Joi.object().keys({
        deliveryEstimateId: Joi.string().custom(objectId),
    }),
};

module.exports = {
    createDeliveryEstimate,
    getDeliveryEstimates,
    getDeliveryEstimate,
    updateDeliveryEstimate,
    deleteDeliveryEstimate
}