const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const checkoutUrlSchema = new Schema(
    {
        url: {
            type: String,
            required: true
        },
        order: {
            type: Schema.Types.ObjectId,
            ref: 'Order',
            required: true
        }
    },
    { timestamps: true }
);


const CheckoutUrl = mongoose.model('CheckoutUrl', checkoutUrlSchema);

module.exports = CheckoutUrl;