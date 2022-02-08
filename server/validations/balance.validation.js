const Joi = require('joi');
const { objectId } = require('./custom.validation');
const { balanceTypes, balanceStatus } = require('../config/services');

const createBalance = {
    body: Joi.object()
        .keys({
            balance: Joi.number(),
            transactions: Joi.array().items(
                Joi.object().keys({
                    balance: Joi.number().required(),
                    type: Joi.string().valid(...balanceTypes).required(),
                    status: Joi.string().valid(...balanceStatus).required(),
                    paymentIntents: Joi.object().keys({
                        stripeIntentId: Joi.string()
                    }),
                    orderId: Joi.string().custom(objectId),
                    description: Joi.string().required()
                })
            ).required()
        })
        .min(2)
}

const getBalances = {
    query: Joi.object().keys({
        userId: Joi.string(),
        sortBy: Joi.string(),
        limit: Joi.number().integer(),
        page: Joi.number().integer(),
    })
}

const getBalance = {
    params: Joi.object().keys({
        balanceId: Joi.string().custom(objectId),
    }),
}

const updateBalance = {
    params: Joi.object().keys({
        balanceId: Joi.required().custom(objectId),
    }),
    body: Joi.object()
        .keys({
            balance: Joi.number(),
            transactions: Joi.array().items(
                Joi.object().keys({
                    balance: Joi.number().required(),
                    type: Joi.string().valid(...balanceTypes).required(),
                    status: Joi.string().valid(...balanceStatus).required(),
                    paymentIntents: Joi.object().keys({
                        stripeIntentId: Joi.string()
                    }),
                    orderId: Joi.string(),
                    description: Joi.string().required()
                })
            ).required()
        })
        .min(2)
}

// const deleteBalance = {
//     params: Joi.object().keys({
//         balanceId: Joi.string().custom(objectId),
//     }),
// };

module.exports = {
    createBalance,
    getBalances,
    getBalance,
    updateBalance,
    // deleteBalance
}