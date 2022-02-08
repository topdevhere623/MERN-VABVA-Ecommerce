const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { basketService } = require('../services');

const createBasket = catchAsync(async (req, res) => {
    const userId = req.user._id;
    const reqBodyWithUserId = { userId, ...req.body };
    const basket = await basketService.createBasket(reqBodyWithUserId);
    res.status(httpStatus.CREATED).send(basket);
});

const getBaskets = catchAsync(async (req, res) => {
    const filter = pick(req.body, ['userId']);
    const _filter = filter && filter.userId ? { userId: new RegExp("^" + filter.userId, "i") } : {};
    const options = pick(req.query, ['sortBy', 'limit', 'page']);
    const result = await basketService.queryBaskets(_filter, options);
    res.send(result);
});

const getBasket = catchAsync(async (req, res) => {
    const basket = await basketService.getBasketById(req.params.basketId);
    if(!basket) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Basket not found');
    }
    res.send(basket);
});

const updateBasket = catchAsync(async (req, res) => {
    const userId = req.user._id;
    const reqBodyWithUserId = { userId, ...req.body };
    const basket = await basketService.updateBasketById(req.params.basketId, reqBodyWithUserId);
    res.send(basket);
});

const deleteBasket = catchAsync(async (req, res) => {
    await basketService.deleteBasketById(req.params.basketId);
    res.status(httpStatus.NOT_FOUND).send();
});

module.exports = {
    createBasket,
    getBaskets,
    getBasket,
    updateBasket,
    deleteBasket,
};  
