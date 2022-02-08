const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const countrySchema = mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true
        },
        iso3: {
            type: String,
            trim: true,
            required: true
        },
        iso2: {
            type: String,
            trim: true,
            required: true
        },
        numeric_code: {
            type: String,
            trim: true,
            required: true
        },
        phone_code: {
            type: String,
            trim: true,
            required: true
        },
        capital: {
            type: String,
            trim: true,
            required: true
        },
        currency: {
            type: String,
            trim: true,
            required: true
        },
        currency_symbol: {
            type: String,
            trim: true,
            required: true
        },
        tld: {
            type: String,
            trim: true,
            required: true
        },
        native: {
            type: String,
            trim: true,
            required: true
        },
        region: {
            type: String,
            trim: true,
            required: true
        },
        subregion: {
            type: String,
            trim: true,
            required: true
        },
        timezones: [
            {
                zoneName: {
                    type: String,
                    trim: true,
                    required: true
                },
                gmtOffset : {
                    type: Number,
                    required: true
                }, 
                gmtOffsetName : {
                    type: String,
                    trim: true,
                    required: true
                }, 
                abbreviation : {
                    type: String,
                    trim: true,
                    required: true
                }, 
                tzName : {
                    type: String,
                    trim: true,
                    required: true
                }
            }
        ],
        translations: {
                kr: {
                    type: String,
                    trim: true,
                    required: true
                },
                br : {
                    type: String,
                    trim: true,
                    required: true
                }, 
                pt : {
                    type: String,
                    trim: true,
                    required: true
                }, 
                nl : {
                    type: String,
                    trim: true,
                    required: true
                },
                hr : {
                    type: String,
                    trim: true,
                    required: true
                }, 
                fa : {
                    type: String,
                    trim: true,
                    required: true
                }, 
                de : {
                    type: String,
                    trim: true,
                    required: true
                }, 
                es : {
                    type: String,
                    trim: true,
                    required: true
                }, 
                fr : {
                    type: String,
                    trim: true,
                    required: true
                }, 
                ja : {
                    type: String,
                    trim: true,
                    required: true
                }, 
                it : {
                    type: String,
                    trim: true,
                    required: true
                }, 
                cn : {
                    type: String,
                    trim: true,
                    required: true
                }, 
        },
        latitude: {
            type: String,
            trim: true,
            required: true
        },
        longitude: {
            type: String,
            trim: true,
            required: true
        },
        emoji: {
            type: String,
            trim: true,
            required: true
        },
        emojiU: {
            type: String,
            trim: true,
            required: true
        },
    }
);

// add plugin that converts mongoose to json
// countrySchema.plugin(toJSON);
// countrySchema.plugin(paginate);

/**
 * @typedef Country
 */
const Country = mongoose.model('Country', countrySchema);

module.exports = Country;


