const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { taxIdService } = require('../services');

const createTaxId = catchAsync(async (req, res) => {
    const taxId = await taxIdService.createTaxId(req.body);
    res.status(httpStatus.CREATED).send(taxId);
});

const getTaxIds = catchAsync(async (req, res) => {
    const filter = pick(req.body, ['country_code']);
    const _filter = filter && filter.country_code ? { country_code: new RegExp("^" + filter.country_code, "i") } : {};
    const options = pick(req.query, ['sortBy', 'limit', 'page']);
    const result = await taxIdService.queryTaxIds(_filter, options);
    res.send(result);
});

const getTaxId = catchAsync(async (req, res) => {
    const taxId = await taxIdService.getTaxIdById(req.params.taxIdId);
    if(!taxId) {
        throw new ApiError(httpStatus.NOT_FOUND, 'TaxId not found');
    }
    res.send(taxId);
});

const updateTaxId = catchAsync(async (req, res) => {
    const taxId = await taxIdService.updateTaxIdById(req.params.taxIdId, req.body);
    res.send(taxId);
});

const deleteTaxId = catchAsync(async (req, res) => {
    await taxIdService.deleteTaxIdById(req.params.taxIdId);
    res.status(httpStatus.NOT_FOUND).send();
});

module.exports = {
    createTaxId,
    getTaxIds,
    getTaxId,
    updateTaxId,
    deleteTaxId,
};  
