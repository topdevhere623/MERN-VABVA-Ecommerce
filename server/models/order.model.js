
const mongoose = require('mongoose');
const validator = require('validator');
const { toJSON, paginate } = require('./plugins');

const taxSchema = mongoose.Schema(
    {
        tax: { type: Number },
        country_code: {
            type: String,
            trim: true,
            required: true,
            minlength: 2,
            validate(value) {
                if (!validator.isISO31661Alpha2(value)) {
                    throw new Error('Invalid ISO 3166 country code');
                }
            }
        },
    }
)

const orderSchema = mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        locationName: {
            primary: {
                type: String,
                trim: true
            },
            secondary: {
                type: String,
                trim: true
            }
        },
        location: {
            type: {
                type: String,
                enum: ['Point'],
                defualt: "Point",
                required: true
            },
            coordinates: {
                type: [Number],
                required: true
            }
        },
        tax: {
            customer: { type: taxSchema },
            business: { type: taxSchema }
        },
        paymentIntents: {
            stripeIntentId: {
                type: String
            }
        },
        orderDetails: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "OrderDetails"
        }],
        cost: {
            type: Number,
            default: 0
        }
    },
    {
        timestamps: true,
    }
);

// add plugin that converts mongoose to json
orderSchema.plugin(toJSON);
orderSchema.plugin(paginate);

orderSchema.statics.isOrderExists = async function (orderId) {
    const order = await this.findOne({ orderId })
    return !!order
};


/**
 * @typedef Order
 */
const Order = mongoose.model('Orderr', orderSchema);

module.exports = Order;