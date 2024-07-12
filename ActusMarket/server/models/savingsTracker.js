const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const SavingsTrackerSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    order: {
        type: Schema.Types.ObjectId,
        ref: 'Order',
        required: true
    },
    orderProducts: {
        type: [Schema.Types.ObjectId],
        ref: 'Product',
        required: true
    },
    totalSavings: {
        type: Number,
        required: true
    }
}, { timestamps: true });


const SavingsTracker = mongoose.model('SavingsTracker', SavingsTrackerSchema);

module.exports = SavingsTracker;