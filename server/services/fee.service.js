const httpStatus = require('http-status');
const { Product, Location, Basket } = require('../models');
const ApiError = require('../utils/ApiError');
const { Fee } = require('../models');

const createFee = async (feeBody) => {
    const fee = await Fee.create(feeBody);
    return fee;
}

const queryFees = async (filter, options) => {
    const fee = await Fee.paginate(filter, options);
    return fee;
}

const getFeeById = async (id) => {
    return Fee.findById(id);
}

const getFees = async () => {
    return Fee.find();
}

const updateFeeById = async (feeId, updateBody) => {
    const fee = await getFeeById(feeId);
    if(!fee) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Fee not found');
    }
    Object.assign(fee, updateBody);
    await fee.save();
    return fee;
}

const deleteFeeById = async (feeId) => {
    const fee = await getFeeById(feeId);
    if(!fee) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Fee not found');
    }
    await fee.remove();
    return fee;
}

module.exports = {
    createFee,
    queryFees,
    getFeeById,
    getFees,
    updateFeeById,
    deleteFeeById
}