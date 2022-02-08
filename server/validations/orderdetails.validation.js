const Joi = require('joi');
const { objectId, isMobile, isCountryCode } = require('./custom.validation');
const { services, productOptionIdTypes, costTypes } = require('../config/services');

const createOrderDetail = {
    body: Joi.object().keys({
        users: Joi.object().keys({
            customerId: Joi.string().custom(objectId), // from the request 
            businessId: Joi.string().custom(objectId), // from Product.userId
            referralId: Joi.string().custom(objectId)  // User.referral.userId
        }).required(),
        orderId: Joi.string().custom(objectId).required(),      // Order.id
        categoryId: Joi.string().custom(objectId).required(), // Product.categoryId
        productId: Joi.string().custom(objectId).required(),  // request body
        locationId: Joi.string().custom(objectId),              // Product.locationId
        address: Joi.array().items(Joi.object().keys({          // From Address model
            firstName: Joi.string().required(),
            lastName: Joi.string().required(),
            address_line1: Joi.string().required(),
            address_line2: Joi.string(),
            state: Joi.string(),
            postal_code: Joi.string().required(),
            country_code: Joi.string().required().min(2).custom(isCountryCode)
        })),
        service: Joi.object().keys({                        // Available
            type: Joi.string().valid(...services),
            start: Joi.date(),
            end: Joi.date()
        }),
        tax: Joi.object().keys({
            customer: Joi.object().keys({                   // From User model
                taxNumber: Joi.string(),
                country_code: Joi.string().custom(isCountryCode).min(2)
            }),
            business: Joi.object().keys({                   // From User model
                taxNumber: Joi.string(),
                country_code: Joi.string().custom(isCountryCode).min(2)
            })
        }),
        refund: Joi.object().keys({
            balance: Joi.number(),                          // Refund balance can't exceed cost.total
            transactions: Joi.array().items(
                Joi.object().keys({                         // Each item
                    balance: Joi.number().required(),
                    paymentIntents: Joi.object().keys({
                        stripeIntentId: Joi.string()
                    }),
                    description: Joi.string().required()
                })
            )
        }),
        delivery: Joi.object().keys({
            estimateId: Joi.string().custom(objectId),      // Refer DeliveryEstimate, from Product.delivery.estimateId
            tracking: Joi.object().keys({
                code: Joi.string(),
                note: Joi.string()
            })
        }),
        cost: Joi.object().keys({
            options: Joi.array().items(
                Joi.object().keys({
                    name: Joi.string().required(),
                    mandatory: Joi.bool(),
                    type: Joi.string().valid(...costTypes).required(),
                    amount: Joi.number().required(),
                    description: Joi.string(),
                    quantity: Joi.number().required(),
                    selectedIdType: Joi.string().valid(...productOptionIdTypes),
                    selectedId: Joi.string().custom(objectId).required()
                })
            ),
            tax: Joi.number().required(),
            category: Joi.object().keys({
                fee: Joi.number().required(),
                tax: Joi.number().required()
            }),
            referralFee: Joi.number(),                      // from Locatin
            total: Joi.number().required()
        })
    }).min(4)
}

const getOrderDetails = {
    query: Joi.object().keys({
        orderId: Joi.string(),
        sortBy: Joi.string(),
        limit: Joi.number().integer(),
        page: Joi.number().integer(),
    })
}

const getOrderDetail = {
    params: Joi.object().keys({
        orderDetailId: Joi.string().custom(objectId),
    }),
}

const updateOrderDetail = {
    params: Joi.object().keys({
        orderDetailId: Joi.required().custom(objectId),
    }),
    body: Joi.object().keys({
        users: Joi.object().keys({
            customerId: Joi.string().custom(objectId),
            businessId: Joi.string().custom(objectId),
            referralId: Joi.string().custom(objectId)
        }).required(),
        // orderId: Joi.string().custom(objectId).required(),
        categoryId: Joi.string().custom(objectId).required(),
        productId: Joi.string().custom(objectId).required(),
        locationId: Joi.string().custom(objectId),
        address: Joi.array().items(Joi.object().keys({
            firstName: Joi.string().required(),
            lastName: Joi.string().required(),
            address_line1: Joi.string().required(),
            address_line2: Joi.string(),
            state: Joi.string(),
            postal_code: Joi.string().required(),
            country_code: Joi.string().required().min(2).custom(isCountryCode)
        })),
        service: Joi.object().keys({
            type: Joi.string().valid(...services),
            start: Joi.date(),
            end: Joi.date()
        }),
        tax: Joi.object().keys({
            customer: Joi.object().keys({
                taxNumber: Joi.string(),
                country_code: Joi.string().custom(isCountryCode).min(2)
            }),
            business: Joi.object().keys({
                taxNumber: Joi.string(),
                country_code: Joi.string().custom(isCountryCode).min(2)
            })
        }),
        refund: Joi.object().keys({
            balance: Joi.number(),
            transactions: Joi.array().items(
                Joi.object().keys({
                    balance: Joi.number().required(),
                    paymentIntents: Joi.object().keys({
                        stripeIntentId: Joi.string()
                    }),
                    description: Joi.string().required()
                })
            )
        }),
        delivery: Joi.object().keys({
            estimateId: Joi.string().custom(objectId),
            tracking: Joi.object().keys({
                code: Joi.string(),
                note: Joi.string()
            })
        }),
        cost: Joi.object().keys({
            options: Joi.array().items(
                Joi.object().keys({
                    name: Joi.string().required(),
                    mandatory: Joi.bool(),
                    type: Joi.string().valid(...costTypes).required(),
                    amount: Joi.number().required(),
                    description: Joi.string(),
                    quantity: Joi.number().required(),
                    selectedIdType: Joi.string().valid(...productOptionIdTypes),
                    selectedId: Joi.string().custom(objectId).required()
                })
            ),
            tax: Joi.number().required(),
            category: Joi.object().keys({
                fee: Joi.number().required(),
                tax: Joi.number().required()
            }),
            referralFee: Joi.number(),
            total: Joi.number().required()
        })
    }).min(4)
}

const deleteOrderDetail = {
    params: Joi.object().keys({
        orderDetailId: Joi.string().custom(objectId),
    }),
};

module.exports = {
    createOrderDetail,
    getOrderDetails,
    getOrderDetail,
    updateOrderDetail,
    deleteOrderDetail
}