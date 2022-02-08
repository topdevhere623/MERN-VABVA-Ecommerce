const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const addressValidation = require('../../validations/address.validation');
const addressController = require('../../controllers/address.controller');

const router = express.Router();

router
    .route('/')
    .get(auth('getAddresses'), validate(addressValidation.getAddresses), addressController.getAddresses)
    .post(auth('manageAddresses'), validate(addressValidation.createAddress), addressController.createAddress)

router.route('/:addressId')
    .get(auth('getAddresses'), validate(addressValidation.getAddress), addressController.getAddress)
    .patch(auth('manageAddresses'), validate(addressValidation.updateAddress), addressController.updateAddress)
    .delete(auth('manageAddresses'), validate(addressValidation.deleteAddress), addressController.deleteAddress);

module.exports = router;