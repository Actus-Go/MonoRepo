const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const verificationCodeSchema = new Schema({
    order: {
        type: Schema.Types.ObjectId,
        ref: 'Order',
        default: null
    },
    isBigOrder: {
        type: Boolean,
        default: false
    },
    bigOrder: {
        type: Schema.Types.ObjectId,
        ref: 'BigOrder',
        default: null
    },
    users: {
        type: [Schema.Types.ObjectId],
        ref: 'User',
        default: null
    },
    code: {
        type: String,
        required: true
    },
    isActive: {
        type: String,
        default: false
    }
}, { timestamps: true });


const VerificationCode = mongoose.model('VerificationCode', verificationCodeSchema);

module.exports = VerificationCode;