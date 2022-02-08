const httpStatus = require('http-status');
const { Product, Location, Basket } = require('../models');
const ApiError = require('../utils/ApiError');
const { MessageDetail } = require('../models');

const createMessageDetail = async (messageDetailBody) => {
    if (await MessageDetail.isMessageDetailExists(messageDetailBody.userId)) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Basket already exists');
    }
    const messageDetail = await MessageDetail.create(messageDetailBody);
    return messageDetail;
}

const queryMessageDetails = async (filter, options) => {
    const messageDetail = await MessageDetail.paginate(filter, options);
    return messageDetail;
}

const getMessageDetailById = async (id) => {
    return MessageDetail.findById(id);
}

const getMessageDetails = async () => {
    return MessageDetail.find();
}

const updateMessageDetailById = async (messageDetailId, updateBody) => {
    const messageDetail = await getMessageDetailById(messageDetailId);
    if(!messageDetail) {
        throw new ApiError(httpStatus.NOT_FOUND, 'MessageDetail not found');
    }
    Object.assign(messageDetail, updateBody);
    await messageDetail.save();
    return messageDetail;
}

const deleteMessageDetailById = async (messageDetailId) => {
    const messageDetail = await getMessageDetailById(messageDetailId);
    if(!messageDetail) {
        throw new ApiError(httpStatus.NOT_FOUND, 'MessageDetail not found');
    }
    await messageDetail.remove();
    return messageDetail;
}

module.exports = {
    createMessageDetail,
    queryMessageDetails,
    getMessageDetailById,
    getMessageDetails,
    updateMessageDetailById,
    deleteMessageDetailById
}