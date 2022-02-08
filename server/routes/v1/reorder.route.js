const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const reorderValidation = require('../../validations/reorder.validation');
const reorderController = require('../../controllers/reoder.controller');

const router = express.Router();

router
    .route('/')
    .get(auth('getReorders'), validate(reorderValidation.getReorders), reorderController.getReorders)
    .post(auth('manageReorders'), validate(reorderValidation.createReorder), reorderController.createReorder)

router.route('/:reorderId')
    .get(auth('getReorders'), validate(reorderValidation.getReorder), reorderController.getReorder)
    .patch(auth('manageReorders'), validate(reorderValidation.updateReorder), reorderController.updateReorder)
    .delete(auth('manageReorders'), validate(reorderValidation.deleteReorder), reorderController.deleteReorder);

module.exports = router;