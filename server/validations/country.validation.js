const Joi = require('joi');
const { objectId } = require('./custom.validation');


const getCountry = {
    params: Joi.object().keys({
        countryId: Joi.string().custom(objectId),
    }),
}

module.exports = {
    getCountry,
}