const Joi = require('joi');
const { objectId, isMobile, isCountryCode, isPolygonCoordsClosedLineStrings } = require('./custom.validation');
const { costTypes, services, gemetryTypes } = require('../config/services');

const createProduct = {
    body: Joi.object().keys({
        productName: Joi.string(),
        isPublic: Joi.bool(),
        service: Joi.string(),
        userId: Joi.string().custom(objectId),
        categoryId: Joi.string().custom(objectId),
        reviewId: Joi.string().custom(objectId),
        delivery: Joi.object().keys({
            estimateId: Joi.string().custom(objectId)
        }),
        description: Joi.object().keys({
            text: Joi.string(),
            facts: Joi.array().items(Joi.string()),
            images: Joi.array().items(Joi.string())
        }),
        cost: Joi.object().keys({
            type: Joi.string(),
            amount: Joi.number(),
            minimum: Joi.object().keys({
                days: Joi.number(),
                hours: Joi.number()
            }),
            discount: Joi.object().keys({
                type: Joi.string().valid(...costTypes),
                amount: Joi.number()
            }),
            additional: Joi.array().items(
                Joi.object().keys({
                    name: Joi.string(),
                    description: Joi.string(),
                    type: Joi.string().valid(...costTypes),
                    amount: Joi.number(),
                    mandatory: Joi.bool()
                })
            ),
            sample: Joi.number()
        }),
        variation: Joi.array().items(
            Joi.object().keys({
                name: Joi.string(),
                items: Joi.array().items({
                    colour: Joi.string(),
                    quantity: Joi.number(),
                    cost: Joi.number(),
                    images: Joi.object().keys({
                        type: Joi.array().items(Joi.string())
                    })
                })
            })
        ),
        stock: Joi.object().keys({
            quantity: Joi.number()
        }),
        questions: Joi.array().items(Joi.object().keys({
            question: Joi.string(),
            answer: Joi.string(),
            statistics: Joi.object().keys({
                likes: Joi.object().keys({
                    total: Joi.number(),
                    userId: Joi.string().custom(objectId)
                })
            })
        })),
        summary: Joi.object().keys({
            price: Joi.number(),
            priceAdditions: Joi.number(),
            purchaseCount: Joi.number(),
            totalReviewRating: Joi.number(),
            geometry: Joi.object().keys({
                type: Joi.string().valid(...gemetryTypes).required(),
                coordinates: Joi.array().custom(isPolygonCoordsClosedLineStrings).required()
            })
        }),
        locationId: Joi.string().custom(objectId),

    }).min(5)
}


const getProducts = {
    query: Joi.object().keys({
        displayName: Joi.string(),
        sortBy: Joi.string(),
        limit: Joi.number().integer(),
        page: Joi.number().integer(),
    })
}

const getProduct = {
    params: Joi.object().keys({
        productId: Joi.string().custom(objectId),
    }),
}

const updateProduct = {
    params: Joi.object().keys({
        productId: Joi.required().custom(objectId),
    }),
    body: Joi.object().keys({
        productName: Joi.string(),
        isPublic: Joi.bool(),
        service: Joi.string(),
        userId: Joi.string().custom(objectId),
        locationId: Joi.string().custom(objectId),
        categoryId: Joi.string().custom(objectId),
        reviewId: Joi.string().custom(objectId),
        delivery: Joi.object().keys({
            estimateId: Joi.string().custom(objectId)
        }),
        description: Joi.object().keys({
            text: Joi.string(),
            facts: Joi.array().items(Joi.string()),
            images: Joi.array().items(Joi.string())
        }),
        cost: Joi.object().keys({
            type: Joi.string(),
            amount: Joi.number(),
            minimum: Joi.object().keys({
                days: Joi.number(),
                hours: Joi.number()
            }),
            discount: Joi.object().keys({
                type: Joi.string().valid(...costTypes),
                amount: Joi.number()
            }),
            additional: Joi.array().items(
                Joi.object().keys({
                    name: Joi.string(),
                    description: Joi.string(),
                    type: Joi.string().valid(...costTypes),
                    amount: Joi.number(),
                    mandatory: Joi.bool()
                })
            ),
            sample: Joi.number()
        }),
        variation: Joi.array().items(
            Joi.object().keys({
                name: Joi.string(),
                items: Joi.array().items({
                    colour: Joi.string(),
                    quantity: Joi.number(),
                    cost: Joi.number(),
                    images: Joi.object().keys({
                        type: Joi.array().items(Joi.string())
                    })
                })
            })
        ),
        stock: Joi.object().keys({
            quantity: Joi.number()
        }),
        questions: Joi.array().items(Joi.object().keys({
            question: Joi.string(),
            answer: Joi.string(),
            statistics: Joi.object().keys({
                likes: Joi.object().keys({
                    total: Joi.number(),
                    userId: Joi.string().custom(objectId)
                })
            })
        })),
        summary: Joi.object().keys({
            price: Joi.number(),
            priceAdditions: Joi.number(),
            purchaseCount: Joi.number(),
            totalReviewRating: Joi.number(),
            geometry: Joi.object().keys({
                type: Joi.string().valid(...gemetryTypes).required(),
                coordinates: Joi.array().custom(isPolygonCoordsClosedLineStrings).required()
            })
        })
    }).min(1)
}

const deleteProduct = {
    params: Joi.object().keys({
        productId: Joi.string().custom(objectId),
    }),
};

module.exports = {
    createProduct,
    getProducts,
    getProduct,
    updateProduct,
    deleteProduct
}