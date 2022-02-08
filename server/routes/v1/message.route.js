const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const messageValidation = require('../../validations/message.validation');
const messageController = require('../../controllers/message.controller');

const router = express.Router();

router
    .route('/')
    .get(auth('getMessages'), validate(messageValidation.getMessages), messageController.getMessages)
    .post(auth('manageMessages'), validate(messageValidation.createMessage), messageController.createMessage)

router.route('/:messageId')
    .get(auth('getMessages'), validate(messageValidation.getMessage), messageController.getMessage)
    .patch(auth('manageMessages'), validate(messageValidation.updateMessage), messageController.updateMessage)
    .delete(auth('manageMessages'), validate(messageValidation.deleteMessage), messageController.deleteMessage);

module.exports = router;