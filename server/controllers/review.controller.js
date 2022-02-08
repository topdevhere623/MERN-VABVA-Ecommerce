const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { reviewService } = require('../services');

const createReview = catchAsync(async (req, res) => {
    const userId = req.user._id;
    const reqBodyWithUserId = { userId, ...req.body };
    const review = await reviewService.createReview(reqBodyWithUserId);
    res.status(httpStatus.CREATED).send(review);
});

const getReviews = catchAsync(async (req, res) => {
    const filter = pick(req.body, ['reviewName']);
    const _filter = filter && filter.reviewName ? { reviewName: new RegExp("^" + filter.reviewName, "i") } : {};
    const options = pick(req.query, ['sortBy', 'limit', 'page']);
    const result = await reviewService.queryReviews(_filter, options);
    res.send(result);
});

const getReview = catchAsync(async (req, res) => {
    const review = await reviewService.getReviewById(req.params.reviewId);
    if(!review) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Review not found');
    }
    res.send(review);
});

const updateReview = catchAsync(async (req, res) => {
    const userId = req.user._id;
    const reqBodyWithUserId = { userId, ...req.body };
    const review = await reviewService.updateReviewById(req.params.reviewId, reqBodyWithUserId);
    res.send(review);
});

const deleteReview = catchAsync(async (req, res) => {
    await reviewService.deleteReviewById(req.params.reviewId);
    res.status(httpStatus.NOT_FOUND).send();
});

module.exports = {
    createReview,
    getReviews,
    getReview,
    updateReview,
    deleteReview,
};  
