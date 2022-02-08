const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { addressService } = require('../services');

const createAddress = catchAsync(async (req, res) => {
    const userId = req.user._id;
    const reqBodyWithUserId = { userId, ...req.body };
    const address = await addressService.createAddress(reqBodyWithUserId);
    res.status(httpStatus.CREATED).send(address);
});

const getAddresses = catchAsync(async (req, res) => {
    const filter = pick(req.body, ['addressName']);
    const _filter = filter && filter.addressName ? { addressName: new RegExp("^" + filter.addressName, "i") } : {};
    const options = pick(req.query, ['sortBy', 'limit', 'page']);
    const result = await addressService.queryAddresses(_filter, options);
    res.send(result);
});

const getAddress = catchAsync(async (req, res) => {
    const address = await addressService.getAddressById(req.params.addressId);
    if(!address) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Address not found');
    }
    res.send(address);
});

const updateAddress = catchAsync(async (req, res) => {
    const userId = req.user._id;
    const reqBodyWithUserId = { userId, ...req.body };
    const address = await addressService.updateAddressById(req.params.addressId, reqBodyWithUserId);
    res.send(address);
});

const deleteAddress = catchAsync(async (req, res) => {
    await addressService.deleteAddressById(req.params.addressId);
    res.status(httpStatus.NOT_FOUND).send();
});

module.exports = {
    createAddress,
    getAddresses,
    getAddress,
    updateAddress,
    deleteAddress,
};  
