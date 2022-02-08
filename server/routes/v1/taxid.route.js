const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const taxIdValidation = require('../../validations/taxid.validation');
const taxIdController = require('../../controllers/taxid.controller');

const router = express.Router();

router
  .route('/')
  .get(auth('getTaxIds'), validate(taxIdValidation.getTaxIds), taxIdController.getTaxIds)
  .post(auth('manageTaxIds'), validate(taxIdValidation.createTaxId), taxIdController.createTaxId);

router
  .route('/:taxIdId')
  .get(auth('getTaxIds'), validate(taxIdValidation.getTaxId), taxIdController.getTaxId)
  .patch(auth('manageTaxIds'), validate(taxIdValidation.updateTaxId), taxIdController.updateTaxId)
  .delete(auth('manageTaxIds'), validate(taxIdValidation.deleteTaxId), taxIdController.deleteTaxId);

module.exports = router;
