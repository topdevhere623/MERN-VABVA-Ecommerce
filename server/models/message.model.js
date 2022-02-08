
const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const { costTypes, services } = require('../config/services');
const { status } = require('../config/payment');


const customPaymentSchema = mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    },
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        default: null,
        ref: "Order"
    },
    cost: {
        type: {
            type: String,
            enum: costTypes
        },
        value: {
            type: Number
        }
    },
    service: {
        type: {
            type: String,
            enum: services
        },
        start: {
            type: mongoose.Schema.Types.Date
        },
        end: {
            type: mongoose.Schema.Types.Date
        }
    }

})
const messageSchema = mongoose.Schema(
    {
        // conversationId: {
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: "Message",
        // },
        isRead: {
            type: Boolean,
            default: false
        },
        users: {
            customerId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            },
            businessId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            }
        },
        message: {
            type: String,
            trim: true
        },
        files: [{
            type: String,
            trim: true
        }],
        customPayment: customPaymentSchema,
        lastEdited: {
            type: Date,
            default: null
        }
    },
    {
        timestamps: true
    }
);

// add plugin that converts mongoose to json
messageSchema.plugin(toJSON);
messageSchema.plugin(paginate);

/**
 * @typedef Message
 */
const Message = mongoose.model('Message', messageSchema);

module.exports = Message;


