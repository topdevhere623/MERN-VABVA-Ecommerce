const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const balanceValidation = require('../../validations/balance.validation');
const balanceController = require('../../controllers/balance.controller');

const router = express.Router();

router
    .route('/')
    .get(auth('getBalances'), validate(balanceValidation.getBalances), balanceController.getBalances)
    .post(auth('manageBalances'), validate(balanceValidation.createBalance), balanceController.createBalance)

router.route('/:balanceId')
    .get(auth('getBalances'), validate(balanceValidation.getBalance), balanceController.getBalance)
    .patch(auth('manageBalances'), validate(balanceValidation.updateBalance), balanceController.updateBalance)
    
module.exports = router;