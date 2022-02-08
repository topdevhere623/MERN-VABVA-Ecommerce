const mongoose = require('mongoose');
const { status } = require('../config/payment');
const { toJSON, paginate } = require('./plugins');

const balanceSchema = mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true,
        },
        balance: {
            type: Number,
            default: 0,
        },
        transactions: [{
            balance: {
                type: Number,
                default: 0,
                required: true
            },
            type: {
                type: String,
                enum: ["withdraw", "credit"],
                required: true
            },
            status: {
                type: String,
                enum: status,
                default: "pending-unverified",
                required: true
            },
            paymentIntents: {
                stripeIntentId: {
                    type: String,
                    defualt: null
                }
            },
            orderId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Order"
            },
            orderDetailsId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "OrderDetails"
            },
            description: {
                type: String,
                trim: true,
                required: true
            }
        }]
    },
    {
        timestamps: true,
    }
);

// add plugin that converts mongoose to json
balanceSchema.plugin(toJSON);
balanceSchema.plugin(paginate);

balanceSchema.statics.isBalanceExists = async function (userId) {
    const balance = await this.findOne({ userId })
    return !!balance
};


/**
 * @typedef Balance
 */
const Balance = mongoose.model('Balance', balanceSchema);

module.exports = Balance;

