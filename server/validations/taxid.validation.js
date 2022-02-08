const Joi = require('joi');
const { objectId, isMobile, isCountryCode } = require('./custom.validation');
const { costTypes } = require('../config/services');

const createTaxId = {
    body: Joi.object().keys({
        country_code: Joi.string().required().custom(isCountryCode),
        cost: Joi.object().keys({
            type: Joi.string().valid(...costTypes),
            value: Joi.number()
        }),
        localName: Joi.string()
    }).min(2)
}

const getTaxIds = {
    query: Joi.object().keys({
        country_code: Joi.string(),
        sortBy: Joi.string(),
        limit: Joi.number().integer(),
        page: Joi.number().integer(),
    })
}

const getTaxId = {
    params: Joi.object().keys({
        taxIdId: Joi.string().custom(objectId),
    }),
}

const updateTaxId = {
    params: Joi.object().keys({
        taxIdId: Joi.required().custom(objectId),
    }),
    body: Joi.object().keys({
        country_code: Joi.string().required().custom(isCountryCode),
        cost: Joi.object().keys({
            type: Joi.string().valid(...costTypes),
            value: Joi.number()
        }),
        localName: Joi.string()
    }).min(2)
}

const deleteTaxId = {
    params: Joi.object().keys({
        taxIdId: Joi.string().custom(objectId),
    }),
};

module.exports = {
    createTaxId,
    getTaxIds,
    getTaxId,
    updateTaxId,
    deleteTaxId
}