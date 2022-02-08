const Joi = require('joi');
const { objectId, isMobile, isCountryCode } = require('./custom.validation');
const { messageTypes } = require('../config/services');

const createMessageDetail = {
    body: Joi.object().keys({
        userId: Joi.string().custom(objectId),
        conversationId: Joi.array().items(Joi.string().custom(objectId)),
        type: Joi.string().valid(...messageTypes).required(),
        note: Joi.string(),
        tagName: Joi.string(),
        colour: Joi.string()
    }).min(3)
}

const getMessageDetails = {
    query: Joi.object().keys({
        note: Joi.string(),
        sortBy: Joi.string(),
        limit: Joi.number().integer(),
        page: Joi.number().integer(),
    })
}

const getMessageDetail = {
    params: Joi.object().keys({
        messageDetailId: Joi.string().custom(objectId),
    }),
}

const updateMessageDetail = {
    params: Joi.object().keys({
        messageDetailId: Joi.required().custom(objectId),
    }),
    body: Joi.object().keys({
        userId: Joi.string().custom(objectId),
        conversationId: Joi.array().items(Joi.string().custom(objectId)),
        type: Joi.string().valid(...messageTypes).required(),
        note: Joi.string(),
        tagName: Joi.string(),
        colour: Joi.string()
    }).min(3)
}

const deleteMessageDetail = {
    params: Joi.object().keys({
        messageDetailId: Joi.string().custom(objectId),
    }),
};

module.exports = {
    createMessageDetail,
    getMessageDetails,
    getMessageDetail,
    updateMessageDetail,
    deleteMessageDetail
}