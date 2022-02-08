const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const categoryValidation = require('../../validations/category.validation');
const categoryController = require('../../controllers/category.controller');

const router = express.Router();

router
    .route('/')
    .get(auth('getCategories'), validate(categoryValidation.getCategories), categoryController.getCategories)
    .post(auth('manageCategories'), validate(categoryValidation.createCategory), categoryController.createCategory)

router.route('/:categoryId')
    .get(auth('getCategories'), validate(categoryValidation.getCategory), categoryController.getCategory)
    .patch(auth('manageCategories'), validate(categoryValidation.updateCategory), categoryController.updateCategory)
    .delete(auth('manageCategories'), validate(categoryValidation.deleteCategory), categoryController.deleteCategory);

module.exports = router;