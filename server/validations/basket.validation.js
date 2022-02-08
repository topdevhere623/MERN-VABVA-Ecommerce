const Joi = require('joi');
const { objectId } = require('./custom.validation');
const { services, productOptionIdTypes } = require('../config/services');

const createBasket = {
    body: Joi.object().keys({
        locationName: Joi.object().keys({
            primary: Joi.string().required(),
            secondary: Joi.string().required()
        }).required(),
        location: Joi.object().keys({
            type: Joi.string().valid('Point').required(),
            coordinates: Joi.array().ordered(
                Joi.number()
                    .min(-180)
                    .max(180)
                    .required(),
                Joi.number()
                    .min(-90)
                    .max(90)
                    .required()
            )
        }).required(),
        products: Joi.array().items(
            Joi.object().keys({
                productId: Joi.string().custom(objectId),
                selectedIdType: Joi.string().valid(...productOptionIdTypes),
                selectedId: Joi.string().custom(objectId),
                quantity: Joi.number().min(1).required(),
                service: Joi.object().keys({
                    type: Joi.string().valid(...services).required(),
                    dates: Joi.array().items(),
                    numberOfDays: Joi.number(),
                    numberOfHours: Joi.number()
                })
            })
        ).required()
    }).min(1),
};

const getBaskets = {
    query: Joi.object().keys({
        locationName: Joi.string(),
        sortBy: Joi.string(),
        limit: Joi.number().integer(),
        page: Joi.number().integer(),
    })
}

const getBasket = {
    params: Joi.object().keys({
        basketId: Joi.string().custom(objectId),
    }),
}

const updateBasket = {
    body: Joi.object()
        .keys({
            locationName: Joi.object().keys({
                primary: Joi.string().required(),
                secondary: Joi.string().required()
            }).required(),
            location: Joi.object().keys({
                type: Joi.string().valid('Point').required(),
                coordinates: Joi.array().ordered(
                    Joi.number()
                        .min(-180)
                        .max(180)
                        .required(),
                    Joi.number()
                        .min(-90)
                        .max(90)
                        .required()
                )
            }).required(),
            products: Joi.array().items(
                Joi.object().keys({
                    productId: Joi.string().custom(objectId),
                    selectedIdType: Joi.string().valid(...productOptionIdTypes),
                    selectedId: Joi.string().custom(objectId),
                    quantity: Joi.number().min(1).required(),
                    service: Joi.object().keys({
                        dates: Joi.array().items(),
                        type: Joi.string().valid(...services).required(),
                        start: Joi.date().required(),
                        end: Joi.date().required(),
                    })
                })
            ).required()
        })
        .min(1),
};

const deleteBasket = {
    params: Joi.object().keys({
        basketId: Joi.string().custom(objectId),
    }),
};

module.exports = {
    createBasket,
    updateBasket,
    getBasket,
    getBaskets,
    deleteBasket
};
