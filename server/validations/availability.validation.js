const Joi = require('joi');
const { objectId } = require('./custom.validation');
const { productOptionIdTypes } = require('../config/services');

const productsAvailability = {
  body: Joi.array()
    .items(
      Joi.object().keys({
        productId: Joi.string().custom(objectId).required(),
        selectedIdType: Joi.string()
          .valid(...productOptionIdTypes)
          .required(),
        selectedId: Joi.string().custom(objectId).required(),
        dates: Joi.array().items(Joi.date().iso()).unique().max(31),
      })
    )
    .min(1),
};

module.exports = {
  productsAvailability,
};
