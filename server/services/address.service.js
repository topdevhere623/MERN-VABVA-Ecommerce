const httpStatus = require('http-status');
const { Product, Location, Basket } = require('../models');
const ApiError = require('../utils/ApiError');
const { Address } = require('../models');

const createAddress = async (addressBody) => {
    if (await Address.isAddressExists(addressBody.userId)) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Basket already exists');
    }
    const address = await Address.create(addressBody);
    return address;
}

const queryAddresses = async (filter, options) => {
    const address = await Address.paginate(filter, options);
    return address;
}

const getAddressById = async (id) => {
    return Address.findById(id);
}

const getAddresses = async () => {
    return Address.find();
}

const updateAddressById = async (addressId, updateBody) => {
    const address = await getAddressById(addressId);
    if(!address) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Address not found');
    }
    Object.assign(address, updateBody);
    await address.save();
    return address;
}

const deleteAddressById = async (addressId) => {
    const address = await getAddressById(addressId);
    if(!address) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Address not found');
    }
    await address.remove();
    return address;
}

module.exports = {
    createAddress,
    queryAddresses,
    getAddressById,
    getAddresses,
    updateAddressById,
    deleteAddressById
}