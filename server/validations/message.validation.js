const Joi = require('joi');
const { objectId, isMobile, isCountryCode } = require('./custom.validation');
const { costTypes, services } = require('../config/services');

const createMessage = {
    body: Joi.object().keys({
        // conversationId: Joi.string().custom(objectId),
        isRead: Joi.bool(),
        users: Joi.object().keys({
            customerId: Joi.string().custom(objectId),
            businessId: Joi.string().custom(objectId)
        }),
        message: Joi.string(),
        files: Joi.array().items(
            Joi.string()
        ),
        customPayment: Joi.object().keys({
            productId: Joi.string().custom(objectId),
            orderId: Joi.string().custom(objectId),
            cost: Joi.object().keys({
                type: Joi.string().valid(...costTypes),
                value: Joi.number()
            }),
            service: Joi.object().keys({
                type: Joi.string().valid(...services),
                start: Joi.date(),
                end: Joi.date()
            })
        }),
        lastEdited: Joi.date()
    }).min(3)
}

const getMessages = {
    query: Joi.object().keys({
        message: Joi.string(),
        sortBy: Joi.string(),
        limit: Joi.number().integer(),
        page: Joi.number().integer(),
    })
}

const getMessage = {
    params: Joi.object().keys({
        messageId: Joi.string().custom(objectId),
    }),
}

const updateMessage = {
    params: Joi.object().keys({
        messageId: Joi.required().custom(objectId),
    }),
    body: Joi.object().keys({
        // conversationId: Joi.string().custom(objectId),
        isRead: Joi.bool(),
        users: Joi.object().keys({
            customerId: Joi.string().custom(objectId),
            businessId: Joi.string().custom(objectId)
        }),
        message: Joi.string(),
        files: Joi.array().items(
            Joi.string()
        ),
        customPayment: Joi.object().keys({
            productId: Joi.string().custom(objectId),
            orderId: Joi.string().custom(objectId),
            cost: Joi.object().keys({
                type: Joi.string().valid(...costTypes),
                value: Joi.number()
            }),
            service: Joi.object().keys({
                type: Joi.string().valid(...services),
                start: Joi.date(),
                end: Joi.date()
            })
        }),
        lastEdited: Joi.date()
    }).min(3)
}

const deleteMessage = {
    params: Joi.object().keys({
        messageId: Joi.string().custom(objectId),
    }),
};

module.exports = {
    createMessage,
    getMessages,
    getMessage,
    updateMessage,
    deleteMessage
}