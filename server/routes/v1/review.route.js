const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const reviewValidation = require('../../validations/review.validation');
const reviewController = require('../../controllers/review.controller');

const router = express.Router();

router
    .route('/')
    .get(auth('getReviews'), validate(reviewValidation.getReviews), reviewController.getReviews)
    .post(auth('manageReviews'), validate(reviewValidation.createReview), reviewController.createReview)

router.route('/:reviewId')
    .get(auth('getReviews'), validate(reviewValidation.getReview), reviewController.getReview)
    .patch(auth('manageReviews'), validate(reviewValidation.updateReview), reviewController.updateReview)
    .delete(auth('manageReviews'), validate(reviewValidation.deleteReview), reviewController.deleteReview);

module.exports = router;