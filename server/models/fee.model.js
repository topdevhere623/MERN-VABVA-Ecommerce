
const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');


const feeSchema = mongoose.Schema(
    {
        type: {
            type: String,
            enum: ["fixed", "percentage"]
        },
        value: {
            type: Number
        }
    },
    {
        timestamps: true,
    }
);

// add plugin that converts mongoose to json
feeSchema.plugin(toJSON);
feeSchema.plugin(paginate);

/**
 * @typedef Fee
 */
const Fee = mongoose.model('Fee', feeSchema);

module.exports = Fee;


