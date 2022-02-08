const Joi = require('joi');
const { objectId, isMobile, isCountryCode } = require('./custom.validation');

const createPayment = {
    body: Joi.object().keys({
        stripe: Joi.object().keys({
            setupIntentsId: Joi.string().required(),
            setupIntentsSuccessful: Joi.bool()
        }),
        addressId: Joi.string().custom(objectId),
        expirey: Joi.object().keys({
            month: Joi.string(),
            year: Joi.string()
        }),
        isDefault: Joi.bool(),
        last4: Joi.string(),
        brand: Joi.string(),
        cvc_check: Joi.string()
    })
        .min(1)
}

const getPayments = {
    query: Joi.object().keys({
        stripe: Joi.string(),
        sortBy: Joi.string(),
        limit: Joi.number().integer(),
        page: Joi.number().integer(),
    })
}

const getPayment = {
    params: Joi.object().keys({
        paymentId: Joi.string().custom(objectId),
    }),
}

const updatePayment = {
    params: Joi.object().keys({
        paymentId: Joi.required().custom(objectId),
    }),
    body: Joi.object().keys({
        stripe: Joi.object().keys({
            setupIntentsId: Joi.string().required(),
            setupIntentsSuccessful: Joi.bool()
        }),
        addressId: Joi.string().custom(objectId),
        expirey: Joi.object().keys({
            month: Joi.string(),
            year: Joi.string()
        }),
        isDefault: Joi.bool(),
        last4: Joi.string(),
        brand: Joi.string(),
        cvc_check: Joi.string()
    }).min(1)
}

const deletePayment = {
    params: Joi.object().keys({
        paymentId: Joi.string().custom(objectId),
    }),
};

module.exports = {
    createPayment,
    getPayments,
    getPayment,
    updatePayment,
    deletePayment
}