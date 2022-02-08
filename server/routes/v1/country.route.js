const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');

const countryValidation = require('../../validations/country.validation');
const countryController = require('../../controllers/country.controller');

const router = express.Router();

router
    .route('/')
    .get(countryController.getCountries)

router.route('/:countryId')
    .get(auth('getCountry'), validate(countryValidation.getCountry), countryController.getCountry)

//should have products added to location...
module.exports = router;
