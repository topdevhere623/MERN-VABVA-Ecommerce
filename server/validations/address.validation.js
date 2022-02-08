const Joi = require('joi');
const { objectId, isMobile, isCountryCode } = require('./custom.validation');

const createAddress = {
    body: Joi.object().keys({
        displayName: Joi.string(),
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        mobile: Joi.string().custom(isMobile),
        address_line1: Joi.string().required(),
        address_line2: Joi.string(),
        state: Joi.string(),
        postal_code: Joi.string().required(),
        country_code: Joi.string().custom(isCountryCode).required(),
    }).min(5)
}

const getAddresses = {
    query: Joi.object().keys({
        displayName: Joi.string(),
        sortBy: Joi.string(),
        limit: Joi.number().integer(),
        page: Joi.number().integer(),
    })
}

const getAddress = {
    params: Joi.object().keys({
        addressId: Joi.string().custom(objectId),
    }),
}

const updateAddress = {
    params: Joi.object().keys({
        addressId: Joi.required().custom(objectId),
    }),
    body: Joi.object()
        .keys({
            displayName: Joi.string(),
            firstName: Joi.string(),
            lastName: Joi.string(),
            mobile: Joi.string().custom(isMobile),
            address_line1: Joi.string(),
            address_line2: Joi.string(),
            state: Joi.string(),
            postal_code: Joi.string(),
            country_code: Joi.string().custom(isCountryCode),
        })
        .min(1)
}

const deleteAddress = {
    params: Joi.object().keys({
        addressId: Joi.string().custom(objectId),
    }),
};

module.exports = {
    createAddress,
    getAddresses,
    getAddress,
    updateAddress,
    deleteAddress
}