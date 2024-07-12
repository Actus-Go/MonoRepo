const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const bigOrderSchema = new Schema({
    orders: {
        type: [Schema.Types.ObjectId],
        ref: 'Order',
        required: true
    },
    sharedProduct: {
        type: Schema.Types.ObjectId,
        ref: 'SharedProduct',
        required: true
    }
}, { timestamps: true });


const BigOrder = mongoose.model('BigOrder', bigOrderSchema);

module.exports = BigOrder;

