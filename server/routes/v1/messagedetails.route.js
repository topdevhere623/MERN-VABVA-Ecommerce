const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const messageDetailValidation = require('../../validations/messagedetails.validation');
const messageDetailController = require('../../controllers/messagedetails.controller');

const router = express.Router();

router
    .route('/')
    .get(auth('getMessageDetails'), validate(messageDetailValidation.getMessageDetails), messageDetailController.getMessageDetails)
    .post(auth('manageMessageDetails'), validate(messageDetailValidation.createMessageDetail), messageDetailController.createMessageDetail)

router.route('/:messageDetailId')
    .get(auth('getMessageDetails'), validate(messageDetailValidation.getMessageDetail), messageDetailController.getMessageDetail)
    .patch(auth('manageMessageDetails'), validate(messageDetailValidation.updateMessageDetail), messageDetailController.updateMessageDetail)
    .delete(auth('manageMessageDetails'), validate(messageDetailValidation.deleteMessageDetail), messageDetailController.deleteMessageDetail);

module.exports = router;