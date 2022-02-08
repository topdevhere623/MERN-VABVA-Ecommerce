const Joi = require('joi');
const { objectId, isMobile, isCountryCode } = require('./custom.validation');
const { feeTypes } = require('../config/services');

const createFee = {
    body: Joi.object().keys({
        type: Joi.string().valid(...feeTypes).required(),
        value: Joi.number().required()
    })
        .min(2)
}

const getFees = {
    query: Joi.object().keys({
        type: Joi.string().valid(...feeTypes),
        sortBy: Joi.string(),
        limit: Joi.number().integer(),
        page: Joi.number().integer(),
    })
}

const getFee = {
    params: Joi.object().keys({
        feeId: Joi.string().custom(objectId),
    }),
}

const updateFee = {
    params: Joi.object().keys({
        feeId: Joi.required().custom(objectId),
    }),
    body: Joi.object().keys({
        type: Joi.string().valid(...feeTypes).required(),
        value: Joi.number().required()
    })
        .min(2)
}

const deleteFee = {
    params: Joi.object().keys({
        feeId: Joi.string().custom(objectId),
    }),
};

module.exports = {
    createFee,
    getFees,
    getFee,
    updateFee,
    deleteFee
}