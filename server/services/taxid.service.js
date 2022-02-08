const httpStatus = require('http-status');
const { Product, Location, Basket } = require('../models');
const ApiError = require('../utils/ApiError');
const { TaxId } = require('../models');

const createTaxId = async (taxIdBody) => {
    if (await TaxId.isTaxIdExists(taxIdBody.userId)) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Basket already exists');
    }
    const taxId = await TaxId.create(taxIdBody);
    return taxId;
}

const queryTaxIds = async (filter, options) => {
    const taxId = await TaxId.paginate(filter, options);
    return taxId;
}

const getTaxIdById = async (id) => {
    return TaxId.findById(id);
}

const getTaxIds = async () => {
    return TaxId.find();
}

const updateTaxIdById = async (taxIdId, updateBody) => {
    const taxId = await getTaxIdById(taxIdId);
    if(!taxId) {
        throw new ApiError(httpStatus.NOT_FOUND, 'TaxId not found');
    }
    Object.assign(taxId, updateBody);
    await taxId.save();
    return taxId;
}

const deleteTaxIdById = async (taxIdId) => {
    const taxId = await getTaxIdById(taxIdId);
    if(!taxId) {
        throw new ApiError(httpStatus.NOT_FOUND, 'TaxId not found');
    }
    await taxId.remove();
    return taxId;
}

module.exports = {
    createTaxId,
    queryTaxIds,
    getTaxIdById,
    getTaxIds,
    updateTaxIdById,
    deleteTaxIdById
}