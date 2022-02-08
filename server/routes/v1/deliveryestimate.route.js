const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const deliveryEstimateValidation = require('../../validations/deliveryestimate.validation');
const deliveryEstimateController = require('../../controllers/deliveryestimate.controller');

const router = express.Router();

router
  .route('/')
  .get(
    auth('getDeliveryEstimates'),
    validate(deliveryEstimateValidation.getDeliveryEstimates),
    deliveryEstimateController.getDeliveryEstimates
  )
  .post(
    auth('manageDeliveryEstimates'),
    validate(deliveryEstimateValidation.createDeliveryEstimate),
    deliveryEstimateController.createDeliveryEstimate
  );

router
  .route('/:deliveryEstimateId')
  .get(
    auth('getDeliveryEstimates'),
    validate(deliveryEstimateValidation.getDeliveryEstimate),
    deliveryEstimateController.getDeliveryEstimate
  )
  .patch(
    auth('manageDeliveryEstimates'),
    validate(deliveryEstimateValidation.updateDeliveryEstimate),
    deliveryEstimateController.updateDeliveryEstimate
  )
  .delete(
    auth('manageDeliveryEstimates'),
    validate(deliveryEstimateValidation.deleteDeliveryEstimate),
    deliveryEstimateController.deleteDeliveryEstimate
  );

module.exports = router;
