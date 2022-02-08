const httpStatus = require('http-status');
const { Product, Location } = require('../models');
const ApiError = require('../utils/ApiError');

const createProduct = async (productBody) => {
    // Autofill summary.geometry from the geometryId
    if (productBody.locationId) {
        const location = await Location.findById(productBody.locationId);
        if (!location) { throw new ApiError(httpStatus.NOT_FOUND, 'Location not found'); }
        productBody.summary.geometry = location.geometry;
    }

    const product = await Product.create(productBody);
    return product;
}

const queryProducts = async (filter, options) => {
    const product = await Product.paginate(filter, options);
    return product;
}

const getProductById = async (id) => {
    return Product.findById(id);
}

const getProducts = async () => {
    return Product.find();
}

const updateProductById = async (productId, updateBody) => {
    const product = await getProductById(productId);
    if (!product) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
    }

    // Autofill summary.geometry from the geometryId
    if (updateBody.locationId) {
        const location = await Location.findById(updateBody.locationId)
        if (!location) { throw new ApiError(httpStatus.NOT_FOUND, 'Location not found'); }
        updateBody.summary.geometry = location.geometry;
    }

    Object.assign(product, updateBody);
    await product.save();
    return product;
}

const deleteProductById = async (productId) => {
    const product = await getProductById(productId);
    if (!product) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
    }
    await product.remove();
    return product;
}

module.exports = {
    createProduct,
    queryProducts,
    getProductById,
    getProducts,
    updateProductById,
    deleteProductById
}