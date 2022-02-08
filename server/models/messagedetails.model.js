
const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const messageDetailSchema = mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        conversationId: [{
            type: mongoose.Schema.Types.ObjectId,
            default: null,
            ref: "Message"
        }],
        type: {
            type: String,
            enum: ["tag", "note"],
            required: true
        },
        note: {
            type: String,
            trim: true
        },
        tagName: {
            type: String,
            trim: true
        },
        colour: {
            type: String,
            default: "#5BD1D7"
        }
    },
    {
        timestamps: true,
    }
);

// add plugin that converts mongoose to json
messageDetailSchema.plugin(toJSON);
messageDetailSchema.plugin(paginate);

messageDetailSchema.statics.isMessageDetailExists = async function (conversationId) {
    const messageDetail = await this.findOne({ conversationId })
    return !!messageDetail
};


/**
 * @typedef Message
 */
const MessageDetails = mongoose.model('MessageDetails', messageDetailSchema);

module.exports = MessageDetails;


