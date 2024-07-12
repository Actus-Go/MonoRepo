const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const UserRequestsSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    sharedProduct: {
        type: Schema.Types.ObjectId,
        ref: 'SharedProduct',
        required: true
    },
    isAccepted: {
        type: Boolean,
        default: false
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });


const UserRequest = mongoose.model('UserRequest', UserRequestsSchema);

module.exports = UserRequest;