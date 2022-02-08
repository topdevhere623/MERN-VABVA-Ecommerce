const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { messageService } = require('../services');

const createMessage = catchAsync(async (req, res) => {
    const message = await messageService.createMessage(req.body);
    res.status(httpStatus.CREATED).send(message);
});

const getMessages = catchAsync(async (req, res) => {
    const filter = pick(req.body, ['messageName']);
    const _filter = filter && filter.messageName ? { messageName: new RegExp("^" + filter.messageName, "i") } : {};
    const options = pick(req.query, ['sortBy', 'limit', 'page']);
    const result = await messageService.queryMessages(_filter, options);
    res.send(result);
});

const getMessage = catchAsync(async (req, res) => {
    const message = await messageService.getMessageById(req.params.messageId);
    if(!message) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Message not found');
    }
    res.send(message);
});

const updateMessage = catchAsync(async (req, res) => {
    const message = await messageService.updateMessageById(req.params.messageId, req.body);
    res.send(message);
});

const deleteMessage = catchAsync(async (req, res) => {
    await messageService.deleteMessageById(req.params.messageId);
    res.status(httpStatus.NOT_FOUND).send();
});

module.exports = {
    createMessage,
    getMessages,
    getMessage,
    updateMessage,
    deleteMessage,
};  
