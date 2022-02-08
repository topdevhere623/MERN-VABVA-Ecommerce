const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const { Reorder } = require('../models');

const createReorder = async (reorderBody) => {
    if (await Reorder.isReorderExists(reorderBody.userId)) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Basket already exists');
    }
    const reorder = await Reorder.create(reorderBody);
    return reorder;
}

const queryReorders = async (filter, options) => {
    const reorder = await Reorder.paginate(filter, options);
    return reorder;
}

const getReorderById = async (id) => {
    return Reorder.findById(id);
}

const getReorders = async () => {
    return Reorder.find();
}

const updateReorderById = async (reorderId, updateBody) => {
    const reorder = await getReorderById(reorderId);
    if(!reorder) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Reorder not found');
    }
    Object.assign(reorder, updateBody);
    await reorder.save();
    return reorder;
}

const deleteReorderById = async (reorderId) => {
    const reorder = await getReorderById(reorderId);
    if(!reorder) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Reorder not found');
    }
    await reorder.remove();
    return reorder;
}

module.exports = {
    createReorder,
    queryReorders,
    getReorderById,
    getReorders,
    updateReorderById,
    deleteReorderById
}