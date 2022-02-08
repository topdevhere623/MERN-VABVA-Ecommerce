const Joi = require('joi');
const { objectId, isMobile, isCountryCode } = require('./custom.validation');
const { dayTypes, repeatTypes } = require('../config/services');

const createReorder = {
    body: Joi.object().keys({
        orderDetailsId: Joi.string().custom(objectId),
        schedule: Joi.object().keys({
            dayOfWeek: Joi.string().valid(...dayTypes),
            dayOfMonth: Joi.number().min(1).max(12),
            repeat: Joi.string().valid(...repeatTypes)
        }),
        lastOrdered: Joi.date(),
        reorderLastChecked: Joi.date(),
        enabled: Joi.bool()
    }).min(3)
}

const getReorders = {
    query: Joi.object().keys({
        orderDetailsId: Joi.string(),
        sortBy: Joi.string(),
        limit: Joi.number().integer(),
        page: Joi.number().integer(),
    })
}

const getReorder = {
    params: Joi.object().keys({
        reorderId: Joi.string().custom(objectId),
    }),
}

const updateReorder = {
    params: Joi.object().keys({
        reorderId: Joi.required().custom(objectId),
    }),
    body: Joi.object().keys({
        orderDetailsId: Joi.string().custom(objectId),
        schedule: Joi.object().keys({
            dayOfWeek: Joi.string().valid(...dayTypes),
            dayOfMonth: Joi.number().min(1).max(12),
            repeat: Joi.string().valid(...repeatTypes)
        }),
        lastOrdered: Joi.date(),
        reorderLastChecked: Joi.date(),
        enabled: Joi.bool()
    }).min(3)
}

const deleteReorder = {
    params: Joi.object().keys({
        reorderId: Joi.string().custom(objectId),
    }),
};

module.exports = {
    createReorder,
    getReorders,
    getReorder,
    updateReorder,
    deleteReorder
}