const Joi = require('joi');
const { objectId, isMobile, isPolygonCoordsClosedLineStrings, isEmail } = require('./custom.validation');
const { services, costTypes, gemetryTypes } = require('../config/services');

const createLocation = {
  body: Joi.object()
    .keys({
      isEnabled: Joi.bool(),
      addressId: Joi.string().custom(objectId),
      locationName: Joi.string().required(),
      email: Joi.string().custom(isEmail),
      geometry: Joi.object().keys({
        type: Joi.string().valid(...gemetryTypes).required(),
        coordinates: Joi.array().custom(isPolygonCoordsClosedLineStrings).required()
      }).required(),
      additionalFee: Joi.array().items(
        Joi.object().keys({
          service: Joi.string().valid(...services).required(),
          name: Joi.string().required(),
          cost: Joi.object().keys({
            type: Joi.string().valid(...costTypes).required(),
            value: Joi.number().required()
          })
        })
      )
    })
    .min(2),
};

const getLocations = {
  query: Joi.object().keys({
    locationName: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  })
}

const getLocation = {
  params: Joi.object().keys({
    locationId: Joi.string().custom(objectId),
  }),
};

// const getAdditionalFee = {
//   param: Joi.object().keys({
//     locationId: Joi.string().custom(objectId),
//     additionalFeeId: Joi.string().custom(objectId)
//   })
// }
// const updateAdditionalFee = {
//   param: Joi.object().keys({
//     locationId: Joi.string().custom(objectId),
//     additionalFeeId: Joi.string().custom(objectId)
//   }),
//   body: Joi.object({
//     type: Joi.string().valid(...services),
//     name: Joi.string(),
//     cost: Joi.object().keys({
//       type: Joi.string().valid(...costTypes),
//       amount: Joi.number()
//     })
//   })
//     .min(1),
// }

// const deleteAdditionalFee = {
//   param: Joi.object().keys({
//     locationId: Joi.string().custom(objectId),
//     additionalFeeId: Joi.string().custom(objectId)
//   })
// }

const updateLocation = {
  params: Joi.object().keys({
    locationId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      isEnabled: Joi.bool(),
      addressId: Joi.string().custom(objectId),
      locationName: Joi.string(),
      email: Joi.string().custom(isEmail),
      geometry: Joi.object().keys({
        type: Joi.string().valid(...gemetryTypes).required(),
        coordinates: Joi.array().custom(isPolygonCoordsClosedLineStrings).required()
      }),
      additionalFee: Joi.array().items(
        Joi.object().keys({
          service: Joi.string().valid(...services).required(),
          name: Joi.string().required(),
          cost: Joi.object().keys({
            type: Joi.string().valid(...costTypes).required(),
            value: Joi.number().required()
          })
        })
      )
    })
    .min(1),
};

const deleteLocation = {
  params: Joi.object().keys({
    locationId: Joi.string().custom(objectId),
  }),
};



module.exports = {
  createLocation,
  getLocations,
  getLocation,
  updateLocation,
  deleteLocation,
  // getAdditionalFee,
  // updateAdditionalFee,
  // deleteAdditionalFee
};
