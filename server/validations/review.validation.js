const Joi = require('joi');
const { objectId, isMobile, isCountryCode } = require('./custom.validation');

const createReview = {
    body: Joi.object().keys({
        productId: Joi.string().custom(objectId).required(),
        rating: Joi.number().required(),
        title: Joi.string().required(),
        comment: Joi.string().required(),
        images: Joi.array().items(
            Joi.object().keys({
                image: Joi.string()
            })
        ),
        reply: Joi.array().items(
            Joi.object().keys({
                comment: Joi.string(),
                userId: Joi.string().custom(objectId)
            })
        ),
        statistics: Joi.object().keys({
            likes: Joi.object().keys({
                total: Joi.number(),
                userId: Joi.array().items(
                    Joi.string().custom(objectId)
                )
            }),
            reports: Joi.object().keys({
                total: Joi.number(),
                userId: Joi.string().custom(objectId)
            })
        })
    }).min(4)
}

const getReviews = {
    query: Joi.object().keys({
        title: Joi.string(),
        sortBy: Joi.string(),
        limit: Joi.number().integer(),
        page: Joi.number().integer(),
    })
}

const getReview = {
    params: Joi.object().keys({
        reviewId: Joi.string().custom(objectId),
    }),
}

const updateReview = {
    params: Joi.object().keys({
        reviewId: Joi.required().custom(objectId),
    }),
    body: Joi.object().keys({
        productId: Joi.string().custom(objectId).required(),
        rating: Joi.number().required(),
        title: Joi.string().required(),
        comment: Joi.string().required(),
        images: Joi.array().items(
            Joi.object().keys({
                image: Joi.string()
            })
        ),
        reply: Joi.array().items(
            Joi.object().keys({
                comment: Joi.string(),
                userId: Joi.string().custom(objectId)
            })
        ),
        statistics: Joi.object().keys({
            likes: Joi.object().keys({
                total: Joi.number(),
                userId: Joi.array().items(
                    Joi.string().custom(objectId)
                )
            }),
            reports: Joi.object().keys({
                total: Joi.number(),
                userId: Joi.string().custom(objectId)
            })
        })
    }).min(4)
}

const deleteReview = {
    params: Joi.object().keys({
        reviewId: Joi.string().custom(objectId),
    }),
};

module.exports = {
    createReview,
    getReviews,
    getReview,
    updateReview,
    deleteReview
}