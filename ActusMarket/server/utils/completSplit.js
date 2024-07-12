const BigOrder = require('../models/bigOrder');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const generateCode = require('../utils/genrateCode');
const Order = require('../models/order');
const VerificationCode = require('../models/verificationCode');
const SharedProduct = require('../models/sharedProduct');

const checkBigOrderPayment = async (order) => {
    try {
        const objectId = ObjectId(order);
        const bigOrder = await BigOrder.findOne({ orders: objectId });
        if (!bigOrder) {
            throw Error('There is no Big Order');
        }
        console.log(bigOrder);
        const orders = await Promise.all(bigOrder.orders.map(async order => {
            return await Order.findById(order);
        }));
        console.log('-------------Orders-----------', orders);
        let allPaid = orders.every(order => order.paid);
        console.log(allPaid);
        if (allPaid) {
            const sharedProduct = await SharedProduct.findById(bigOrder.sharedProduct);
            const code = generateCode(20);
            const splittedUsers = [...sharedProduct.splittedUsers, sharedProduct.user]
            const verificationCode = new VerificationCode(
                {
                    users: [...splittedUsers],
                    isBigOrder: true,
                    bigOrder: bigOrder._id,
                    code
                }
            );
            await verificationCode.save();
            const numberOfUsersSplit = sharedProduct.numberOfUsersSplit + 1;
            const partlen = Math.floor(20 / numberOfUsersSplit);
            const remainder = 20 % numberOfUsersSplit;
            let distributedCodes = [];

            for (let i = 0, offset = 0; i < numberOfUsersSplit; i++) {
                // Calculate part length: if there's a remainder, distribute it among the first few users
                const length = partlen + (i < remainder ? 1 : 0);
                distributedCodes.push(code.substring(offset, offset + length));
                offset += length;
            }

            return {
                distributedCodes,
                splittedUsers
            };
        }
        return 0;
    }
    catch (error) {
        console.error('Error searching for BigOrder:', error);
        throw error;
    }
};


module.exports = checkBigOrderPayment;