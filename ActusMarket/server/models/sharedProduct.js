const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const SharedProductSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    isSplited: {
        type: Boolean,
        default: false
    },
    splittedUsers: {
        type: [Schema.Types.ObjectId],
        ref: 'User',
        default: null
    },
    numberOfUsersSplit: {
        type: Number,
        default: 0
    },
    pricePerPerson: {
        type: Number,
        default: 0
    },
    isActive: {
        type: Boolean,
        default: true
    }

}, { timestamps: true });


const SharedProduct = mongoose.model('SharedProduct', SharedProductSchema);

module.exports = SharedProduct;