const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { messageDetailService } = require('../services');

const createMessageDetail = catchAsync(async (req, res) => {
    const userId = req.user._id;
    const reqBodyWithUserId = { userId, ...req.body };
    const messageDetail = await messageDetailService.createMessageDetail(reqBodyWithUserId);
    res.status(httpStatus.CREATED).send(messageDetail);
});

const getMessageDetails = catchAsync(async (req, res) => {
    const filter = pick(req.body, ['messageDetailName']);
    const _filter = filter && filter.messageDetailName ? { messageDetailName: new RegExp("^" + filter.messageDetailName, "i") } : {};
    const options = pick(req.query, ['sortBy', 'limit', 'page']);
    const result = await messageDetailService.queryMessageDetails(_filter, options);
    res.send(result);
});

const getMessageDetail = catchAsync(async (req, res) => {
    const messageDetail = await messageDetailService.getMessageDetailById(req.params.messageDetailId);
    if(!messageDetail) {
        throw new ApiError(httpStatus.NOT_FOUND, 'MessageDetail not found');
    }
    res.send(messageDetail);
});

const updateMessageDetail = catchAsync(async (req, res) => {
    const userId = req.user._id;
    const reqBodyWithUserId = { userId, ...req.body };
    const messageDetail = await messageDetailService.updateMessageDetailById(req.params.messageDetailId, reqBodyWithUserId);
    res.send(messageDetail);
});

const deleteMessageDetail = catchAsync(async (req, res) => {
    await messageDetailService.deleteMessageDetailById(req.params.messageDetailId);
    res.status(httpStatus.NOT_FOUND).send();
});

module.exports = {
    createMessageDetail,
    getMessageDetails,
    getMessageDetail,
    updateMessageDetail,
    deleteMessageDetail,
};  
