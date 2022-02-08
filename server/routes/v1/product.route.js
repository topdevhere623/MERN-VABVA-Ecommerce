const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const productValidation = require('../../validations/product.validation');
const productController = require('../../controllers/product.controller');

const router = express.Router();

router
    .route('/')
    .get(auth('getProducts'), validate(productValidation.getProducts), productController.getProducts)
    .post(auth('manageProducts'), validate(productValidation.createProduct), productController.createProduct)

router.route('/:productId')
    .get(auth('getProducts'), validate(productValidation.getProduct), productController.getProduct)
    .patch(auth('manageProducts'), validate(productValidation.updateProduct), productController.updateProduct)
    .delete(auth('manageProducts'), validate(productValidation.deleteProduct), productController.deleteProduct);

module.exports = router;