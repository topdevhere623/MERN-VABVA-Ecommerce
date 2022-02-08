const httpStatus = require('http-status');
const { Product, Location, Basket } = require('../models');
const ApiError = require('../utils/ApiError');
const { Message } = require('../models');

const createMessage = async (messageBody) => {
    const message = await Message.create(messageBody);
    return message;
}

const queryMessages = async (filter, options) => {
    const message = await Message.paginate(filter, options);
    return message;
}

const getMessageById = async (id) => {
    return Message.findById(id);
}

const getMessages = async () => {
    return Message.find();
}

const updateMessageById = async (messageId, updateBody) => {
    const message = await getMessageById(messageId);
    if(!message) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Message not found');
    }
    Object.assign(message, updateBody);
    await message.save();
    return message;
}

const deleteMessageById = async (messageId) => {
    const message = await getMessageById(messageId);
    if(!message) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Message not found');
    }
    await message.remove();
    return message;
}

module.exports = {
    createMessage,
    queryMessages,
    getMessageById,
    getMessages,
    updateMessageById,
    deleteMessageById
}