const express = require('express');
const validate = require('../../middlewares/validate');
const availabilityValidation = require('../../validations/availability.validation');
const availabilityController = require('../../controllers/availability.controller');

const router = express.Router();

router.route('/').post(validate(availabilityValidation.productsAvailability), availabilityController.productsAvailability);

module.exports = router;
