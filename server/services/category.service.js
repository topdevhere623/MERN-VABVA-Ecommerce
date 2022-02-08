const httpStatus = require('http-status');
const { Product, Location, Basket } = require('../models');
const ApiError = require('../utils/ApiError');
const { Category } = require('../models');

const createCategory = async (categoryBody) => {
    const category = await Category.create(categoryBody);
    return category;
}

const queryCategories = async (filter, options) => {
    const category = await Category.paginate(filter, options);
    return category;
}

const getCategoryById = async (id) => {
    return Category.findById(id);
}

const getCategories = async () => {
    return Category.find();
}

const updateCategoryById = async (categoryId, updateBody) => {
    const category = await getCategoryById(categoryId);
    if(!category) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Category not found');
    }
    Object.assign(category, updateBody);
    await category.save();
    return category;
}

const deleteCategoryById = async (categoryId) => {
    const category = await getCategoryById(categoryId);
    if(!category) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Category not found');
    }
    await category.remove();
    return category;
}

module.exports = {
    createCategory,
    queryCategories,
    getCategoryById,
    getCategories,
    updateCategoryById,
    deleteCategoryById
}