
const mongoose = require('mongoose');
const validator = require('validator');
const { toJSON, paginate } = require('./plugins');
const {costTypes} = require('../config/services')

const costSchema = mongoose.Schema({
    type: {
        type: String,
        enum: costTypes
    },
    value: {
        type: Number
    }
});

const taxIdSchema = mongoose.Schema(
    {
        country_code: {
            type: String,
            required: true,
            validate(value) {
                if (!validator.isISO31661Alpha2(value)) {
                    throw new Error('Invalid ISO 3166 country code');
                }
            }
        },
        cost: {
            type: costSchema
        },
        localName: {
            type: String,
            trim: true
        }

    },
    {
        timestamps: true,
    }
);

// add plugin that converts mongoose to json
taxIdSchema.plugin(toJSON);
taxIdSchema.plugin(paginate);

taxIdSchema.statics.isTaxIdExists = async function (taxIdId) {
    const taxId = await this.findOne({ taxIdId })
    return !!taxId
};


/**
 * @typedef TaxId
 */
const TaxId = mongoose.model('TaxId', taxIdSchema);

module.exports = TaxId;


