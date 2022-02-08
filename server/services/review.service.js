const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const { Review } = require('../models');

const createReview = async (reviewBody) => {
    if (await Review.isReviewExists(reviewBody.userId)) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Basket already exists');
    }
    const review = await Review.create(reviewBody);
    return review;
}

const queryReviews = async (filter, options) => {
    const review = await Review.paginate(filter, options);
    return review;
}

const getReviewById = async (id) => {
    return Review.findById(id);
}

const getReviews = async () => {
    return Review.find();
}

const updateReviewById = async (reviewId, updateBody) => {
    const review = await getReviewById(reviewId);
    if(!review) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Review not found');
    }
    Object.assign(review, updateBody);
    await review.save();
    return review;
}

const deleteReviewById = async (reviewId) => {
    const review = await getReviewById(reviewId);
    if(!review) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Review not found');
    }
    await review.remove();
    return review;
}

module.exports = {
    createReview,
    queryReviews,
    getReviewById,
    getReviews,
    updateReviewById,
    deleteReviewById
}