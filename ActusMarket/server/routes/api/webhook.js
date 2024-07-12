const express = require('express');
const router = express.Router();
const Product = require('../../models/product');
const VerificationCode = require('../../models/verificationCode');
const support = require('../../socket/support');
const checkBigOrderPayment = require('../../utils/completSplit');
const { sendEmail } = require('../../services/mailgun');
const createTracker = require('../../utils/createTracker');
const Order = require('../../models/order');
const User = require('../../models/user');
require('dotenv').config();

const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

// This is Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret = "whsec_e9b3d572fe79e464378608eca525a755a5e2b9cd063a76fa4cf920608c75956d";

const notifyUsers = async (io, socketIds, code) => {
    const codeParts = code;
    socketIds.forEach((socketId, index) => {
        if (index < codeParts.length) {
            io.to(socketId).emit('paidOrder', { codePart: codeParts[index] });
        }
    });
    return;
};




router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
    const io = req.io;
    const sig = req.headers['stripe-signature'];
    let event;

    try {
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err) {
        res.status(400).send(`Webhook Error: ${err.message}`);
        return;
    }
    switch (event.type) {
        case 'payment_intent.succeeded':
            const paymentIntentSucceeded = event.data.object.metadata;
            break;

        case 'checkout.session.completed':
            try {
                if (event.data.object.metadata['orderId']) {
                    const orderId = event.data.object.metadata['orderId'];
                    const order = await Order.findById(orderId).populate('user', 'email');
                    if (!order) {
                        throw new Error('Order not found with the provided ID');
                    }
                    order['paid'] = true;
                    await order.save();
                    await createTracker(order);
                    console.log(order);
                    await sendEmail(order.user.email, 'paid-order', data = order);
                    if (order.isSplited) {
                        const allPaid = await checkBigOrderPayment(order._id);
                        console.log('This is all paid===========', allPaid);
                        if (allPaid) {
                            const splittedUsers = allPaid.splittedUsers.map(user => {
                                const socket = support.findUserById(user.toString())
                                return socket.socketId;
                            });
                            console.log(splittedUsers);
                            notifyUsers(io, splittedUsers, allPaid.distributedCodes);
                        }
                        res.send();
                        return;
                    } else if (order.isShared) {
                        const verificationCode = await VerificationCode.findOneAndUpdate({ order: order._id }, {
                            users: [order.user, order.sharedWith],
                            isActive: true
                        });
                        const userSharedProduct = support.findUserById((order.user._id).toString());

                        const userRequestedShare = support.findUserById(order.sharedWith.toString());
                        notifyUsers(io, [userSharedProduct.socketId, userRequestedShare.socketId], [verificationCode.code.substring(0, 3), verificationCode.code.substring(3, 7)]);
                        res.send();
                        return;
                    }
                } if (event.data.object.metadata['prodcutId']) {
                    const data = event.data.object.metadata;
                    const prodcutId = data['prodcutId'];
                    const quantity = parseInt(data['quantity']);
                    const order = new Order({
                        user: data.user,
                        total: data.total,
                        paid: true
                    });
                    await order.save();
                    console.log(prodcutId, quantity, order);
                    const user = await User.findById(data.user);
                    await sendEmail(user.email, 'paid-order', '', order);
                    await Product.findByIdAndUpdate(prodcutId, { $inc: { quantity: -quantity } });
                }
            } catch (err) {
                res.status(400).json({ 'Error': 'There an issue with your data' });
            };
            break;
        default:
            console.log(`Unhandled event type ${event.type}`);
    }

    res.send();
});





// const send = async () => {
//   const mail = await sendEmail('ahmedshrieframadan@gmail.com', 'merchant-application');
//   console.log(mail);
// };

// send();


// createTracker('664589a3f129cf2c9cdf218f');



module.exports = router;