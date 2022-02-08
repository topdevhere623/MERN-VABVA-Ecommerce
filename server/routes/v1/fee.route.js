const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const feeValidation = require('../../validations/fee.validation');
const feeController = require('../../controllers/fee.controller');

const router = express.Router();

router
    .route('/')
    .get(auth('getFees'), validate(feeValidation.getFees), feeController.getFees)
    .post(auth('manageFees'), validate(feeValidation.createFee), feeController.createFee)

router.route('/:feeId')
    .get(auth('getFees'), validate(feeValidation.getFee), feeController.getFee)
    .patch(auth('manageFees'), validate(feeValidation.updateFee), feeController.updateFee)
    .delete(auth('manageFees'), validate(feeValidation.deleteFee), feeController.deleteFee);

module.exports = router;