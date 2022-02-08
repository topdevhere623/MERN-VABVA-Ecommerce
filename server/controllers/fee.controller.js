const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { feeService } = require('../services');

const createFee = catchAsync(async (req, res) => {
    const fee = await feeService.createFee(req.body);
    res.status(httpStatus.CREATED).send(fee);
});

const getFees = catchAsync(async (req, res) => {
    const filter = pick(req.body, ['feeType']);
    const _filter = filter && filter.feeType ? { feeType: new RegExp("^" + filter.feeType, "i") } : {};
    const options = pick(req.query, ['sortBy', 'limit', 'page']);
    const result = await feeService.queryFees(_filter, options);
    res.send(result);
});

const getFee = catchAsync(async (req, res) => {
    const fee = await feeService.getFeeById(req.params.feeId);
    if(!fee) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Fee not found');
    }
    res.send(fee);
});

const updateFee = catchAsync(async (req, res) => {
    const fee = await feeService.updateFeeById(req.params.feeId, req.body);
    res.send(fee);
});

const deleteFee = catchAsync(async (req, res) => {
    await feeService.deleteFeeById(req.params.feeId);
    res.status(httpStatus.NOT_FOUND).send();
});

module.exports = {
    createFee,
    getFees,
    getFee,
    updateFee,
    deleteFee,
};  
