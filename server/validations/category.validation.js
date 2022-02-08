const Joi = require('joi');
const { objectId, isMobile, isCountryCode } = require('./custom.validation');

const createCategory = {
    body: Joi.object().keys({
        path: Joi.array().items(Joi.string().trim().lowercase()),
        isEnabled: Joi.boolean(),
        details: Joi.object().keys({
            name: Joi.string().required(),
            description: Joi.string().required(),
            images: Joi.object().keys({
                banner: Joi.array().items(
                    Joi.object().keys({
                        image: Joi.string().required()
                    })
                ),
                square: Joi.array().items(
                    Joi.object().keys({
                        image: Joi.string().required()
                    })
                )
            })
        }).required(),
        fee: Joi.object().keys({
            categoryId: Joi.string().custom(objectId),
            referralId: Joi.string().custom(objectId)
        })
    })
        .min(2)
}

const getCategories = {
    query: Joi.object().keys({
        displayName: Joi.string(),
        sortBy: Joi.string(),
        limit: Joi.number().integer(),
        page: Joi.number().integer(),
    })
}

const getCategory = {
    params: Joi.object().keys({
        categoryId: Joi.string().custom(objectId),
    }),
}

const updateCategory = {
    params: Joi.object().keys({
        categoryId: Joi.required().custom(objectId),
    }),
    body: Joi.object().keys({
        path: Joi.array().items(Joi.string().trim().lowercase()),
        isEnabled: Joi.boolean(),
        details: Joi.object().keys({
            name: Joi.string().required(),
            description: Joi.string().required(),
            images: Joi.object().keys({
                banner: Joi.array().items(
                    Joi.object().keys({
                        image: Joi.string().required()
                    })
                ),
                square: Joi.array().items(
                    Joi.object().keys({
                        image: Joi.string().required()
                    })
                )
            })
        }).required(),
        fee: Joi.object().keys({
            category: Joi.string().required(),
            referral: Joi.string().required()
        })
    })
        .min(2)
}

const deleteCategory = {
    params: Joi.object().keys({
        categoryId: Joi.string().custom(objectId),
    }),
};

module.exports = {
    createCategory,
    getCategories,
    getCategory,
    updateCategory,
    deleteCategory
}