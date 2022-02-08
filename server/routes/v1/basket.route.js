const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const basketValidation = require('../../validations/basket.validation');
const basketController = require('../../controllers/basket.controller');

const router = express.Router();

router
    .route('/')
    .get(auth('getBaskets'), validate(basketValidation.getBaskets), basketController.getBaskets)
    .post(auth('manageBaskets'), validate(basketValidation.createBasket), basketController.createBasket)

router.route('/:basketId')
    .get(auth('getBaskets'), validate(basketValidation.getBasket), basketController.getBasket)
    .patch(auth('manageBaskets'), validate(basketValidation.updateBasket), basketController.updateBasket)
    .delete(auth('manageBaskets'), validate(basketValidation.deleteBasket), basketController.deleteBasket);

module.exports = router;