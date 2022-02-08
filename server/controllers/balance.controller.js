const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { balanceService } = require('../services');

const createBalance = catchAsync(async (req, res) => {
    const userId = req.user._id;
    const reqBodyWithUserId = { userId, ...req.body };
    const balance = await balanceService.createBalance(reqBodyWithUserId);
    res.status(httpStatus.CREATED).send(balance);
});

const getBalances = catchAsync(async (req, res) => {
    const filter = pick(req.body, ['userId']);
    const _filter = filter && filter.userId ? { userId: new RegExp("^" + filter.userId, "i") } : {};
    const options = pick(req.query, ['sortBy', 'limit', 'page']);
    const result = await balanceService.queryBalances(_filter, options);
    res.send(result);
});

const getBalance = catchAsync(async (req, res) => {
    const balance = await balanceService.getBalanceById(req.params.balanceId);
    if(!balance) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Balance not found');
    }
    res.send(balance);
});

const updateBalance = catchAsync(async (req, res) => {
    const userId = req.user._id;
    const reqBodyWithUserId = { userId, ...req.body };
    const balance = await balanceService.updateBalanceById(req.params.balanceId, reqBodyWithUserId);
    res.send(balance);
});

module.exports = {
    createBalance,
    getBalances,
    getBalance,
    updateBalance,
};  
