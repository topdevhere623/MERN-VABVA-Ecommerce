const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { reorderService } = require('../services');

const createReorder = catchAsync(async (req, res) => {
    const userId = req.user._id;
    const reqBodyWithUserId = { userId, ...req.body };
    const reorder = await reorderService.createReorder(reqBodyWithUserId);
    res.status(httpStatus.CREATED).send(reorder);
});

const getReorders = catchAsync(async (req, res) => {
    const filter = pick(req.body, ['reorderName']);
    const _filter = filter && filter.reorderName ? { reorderName: new RegExp("^" + filter.reorderName, "i") } : {};
    const options = pick(req.query, ['sortBy', 'limit', 'page']);
    const result = await reorderService.queryReorders(_filter, options);
    res.send(result);
});

const getReorder = catchAsync(async (req, res) => {
    const reorder = await reorderService.getReorderById(req.params.reorderId);
    if(!reorder) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Reorder not found');
    }
    res.send(reorder);
});

const updateReorder = catchAsync(async (req, res) => {
    const userId = req.user._id;
    const reqBodyWithUserId = { userId, ...req.body };
    const reorder = await reorderService.updateReorderById(req.params.reorderId, reqBodyWithUserId);
    res.send(reorder);
});

const deleteReorder = catchAsync(async (req, res) => {
    await reorderService.deleteReorderById(req.params.reorderId);
    res.status(httpStatus.NOT_FOUND).send();
});

module.exports = {
    createReorder,
    getReorders,
    getReorder,
    updateReorder,
    deleteReorder,
};  
