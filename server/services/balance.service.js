const httpStatus = require('http-status');
const { Product, Location, Basket } = require('../models');
const ApiError = require('../utils/ApiError');
const { Balance } = require('../models');

const createBalance = async (balanceBody) => {
    if (await Balance.isBalanceExists(balanceBody.userId)) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Basket already exists');
    }
    const balance = await Balance.create(balanceBody);
    return balance;
}

const queryBalances = async (filter, options) => {
    const balance = await Balance.paginate(filter, options);
    return balance;
}

const getBalanceById = async (id) => {
    return Balance.findById(id);
}

const getBalances = async () => {
    return Balance.find();
}

const updateBalanceById = async (balanceId, updateBody) => {
    const balance = await getBalanceById(balanceId);
    if(!balance) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Balance not found');
    }
    Object.assign(balance, updateBody);
    await balance.save();
    return balance;
}

module.exports = {
    createBalance,
    queryBalances,
    getBalanceById,
    getBalances,
    updateBalanceById,
}