const Joi = require('joi');
const { objectId, isMobile, isCountryCode } = require('./custom.validation');

const createOrder = {
    body: Joi.object().keys({
        productId: Joi.string().custom(objectId),
        refund: Joi.array().items(
            Joi.object().keys({
                balance: Joi.number(),
                paymentIntents: Joi.object().keys({
                    stripeIntentId: Joi.string()
                }),
                description: Joi.string()
            })
        ),
        tracking: Joi.object().keys({
            code: Joi.string(),
            note: Joi.string()
        })

        // userId: Joi.string().custom(objectId),
        // locationName: Joi.object().keys({
            // primary: Joi.string(),
            // secondary: Joi.string()
        // }),
        // location: Joi.object().keys({
        //     type: Joi.string().required(),
        //     coordinates: Joi.array().items(Joi.number()).required()
        // }),
        // tax: Joi.object().keys({
        //     customer: Joi.object().keys({
        //         tax: Joi.number(),
        //         country_code: Joi.string().custom(isCountryCode)
        //     }),
        //     business: Joi.object().keys({
        //         tax: Joi.number(),
        //         country_code: Joi.string().custom(isCountryCode)
        //     })
        // }),
        // paymentIntents: Joi.object().keys({
        //     stripeIntentId: Joi.string()
        // }),
        // orderDetails: Joi.array().items(Joi.string().custom(objectId)),
        // cost: Joi.number()
    }).min(1)
}

const getOrders = {
    query: Joi.object().keys({
        locationName: Joi.string(),
        sortBy: Joi.string(),
        limit: Joi.number().integer(),
        page: Joi.number().integer(),
    })
}

const getOrder = {
    params: Joi.object().keys({
        orderId: Joi.string().custom(objectId),
    }),
}

const updateOrder = {
    params: Joi.object().keys({
        orderId: Joi.required().custom(objectId),
    }),
    body: Joi.object().keys({
        userId: Joi.string().custom(objectId),
        locationName: Joi.object().keys({
            primary: Joi.string(),
            secondary: Joi.string()
        }),
        location: Joi.object().keys({
            type: Joi.string().required(),
            coordinates: Joi.array().items(Joi.number()).required()
        }),
        tax: Joi.object().keys({
            customer: Joi.object().keys({
                tax: Joi.number(),
                country_code: Joi.string().custom(isCountryCode)
            }),
            business: Joi.object().keys({
                tax: Joi.number(),
                country_code: Joi.string().custom(isCountryCode)
            })
        }),
        paymentIntents: Joi.object().keys({     // Stripe payment intent id
            stripeIntentId: Joi.string()
        }),
        orderDetails: Joi.array().items(Joi.string().custom(objectId)),
        cost: Joi.number()
    }).min(3)
}

const deleteOrder = {
    params: Joi.object().keys({
        orderId: Joi.string().custom(objectId),
    }),
};

module.exports = {
    createOrder,
    getOrders,
    getOrder,
    updateOrder,
    deleteOrder
}