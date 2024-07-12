const express = require('express');
const router = express.Router();

const dotenv = require('dotenv');
// dotenv.config({path:'H:/ActusGo_Project/ActusMarket/server/.env'});
dotenv.config();
const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const Cart = require('../../models/cart');
const Product = require('../../models/product');
const auth = require('../../middleware/auth');
const Order = require('../../models/order');
const CheckoutUrl = require('../../models/checkoutUrl');

const domain = 'http://localhost:3000';

router.post('/create-checkout-session', auth, async (req, res) => {

    try {
        const order = req.body.order;
        const orderDoc = await Order.findById(order);
        console.log(orderDoc);
        const discount = orderDoc.discount;
        let sessionData = {
            line_items: [],
            mode: 'payment',
            metadata: { 'orderId': `${order}` },
            success_url: `${domain}/success.html`,
            cancel_url: `${domain}/cancel.html`,
        };

        if (!req.body.cart) {
            return res.status(400).json({ message: 'Cart ID is required' });
        }
        const cart = await Cart.findById(req.body.cart).populate('products');
        console.log(cart);
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        if (orderDoc.coupon) {
            const coupon = await stripe.coupons.create({
                percent_off: discount,
                duration: 'once',
            });
            sessionData['discounts'] = [
                {
                    coupon: coupon.id
                }
            ];
        }

        if (cart.isSplited) {
            sessionData = await payForSplittedProducts(sessionData, orderDoc, cart);

        } else {
            const products = cart['products'];
            const purchaseProducts = await Promise.all(
                products.map(async item => {
                    const product = await Product.findById(item.product);
                    return { name: product.name, price: product.price, quantity: item.quantity };
                })
            );
            if (!purchaseProducts.length > 0) {
                res.json({ 'Error': 'Your cart is empty.' })
                return;
            }

            purchaseProducts.map(product => {
                console.log(product);
                sessionData['line_items'].push({
                    price_data: {
                        unit_amount: (Math.ceil(product['price']) * 100),
                        currency: 'usd',
                        product_data: {
                            name: product['name'],
                        },
                        // tax_behavior: "exclusive",
                    },
                    quantity: product['quantity'],
                    tax_rates: ['txr_1PCTTRGtqHZaDXNXrirERi1F'],
                });
            });
        }

        console.log('This is session data =======', sessionData);
        const session = await stripe.checkout.sessions.create(sessionData);
        const checkoutUrl = new CheckoutUrl({
            url: session.url,
            order: orderDoc._id
        });
        await checkoutUrl.save();
        res.status(200).json({ url: session.url });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to process request' });
    }

});


router.post('/pay-for-product', auth, async (req, res) => {
    const productId = req.body.id;
    const quantity = req.body.quantity;
    try {
        if (!productId && !quantity) {
            return res.status(400).json({
                error: 'You must enter the product ID & quantity you want to buy.'
            });
        }

        const productDoc = await Product.findById(productId)
            .populate({
                path: 'productCoupon',
                populate: {
                    path: 'productCoupon',
                    model: 'Coupon'
                }
            });

        if (productDoc && productDoc.quantity < quantity) {
            return res.status(400).json({
                error: 'There is not enough quantity in the stock.'
            });
        }
        const total = (productDoc['price'] * 100);
        let sessionData = {
            line_items: [],
            mode: 'payment',
            metadata: { 'prodcutId': `${productId}`, 'quantity': quantity, 'user': `${req.user._id}`, 'total': total },
            success_url: `${domain}/success.html`,
            cancel_url: `${domain}/cancel.html`,
        };

        const coupon = await stripe.coupons.create({
            percent_off: productDoc.productCoupon.discount,
            duration: 'once',
        });
        sessionData['discounts'] = [
            {
                coupon: coupon.id
            }
        ];

        sessionData['line_items'].push({
            price_data: {
                unit_amount: total,
                currency: 'usd',
                product_data: {
                    name: productDoc['name'],
                },
                // tax_behavior: "exclusive",
            },
            quantity: quantity,
            tax_rates: ['txr_1PCTTRGtqHZaDXNXrirERi1F'],
        });
        const session = await stripe.checkout.sessions.create(sessionData);
        res.status(200).json({ url: session.url });
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({
            error: 'Your request could not be processed. Please try again.'
        });
    }
});


const payForSplittedProducts = async (sessionData, order, cart) => {
    console.log('this is order------------', order);
    const products = cart['products'];
    let purchaseProducts = [];
    const tasks = products.map(async item => {
        const product = await Product.findById(item['product']);
        purchaseProducts.push({ name: product['name'], price: order.total, quantity: item['quantity'] });
    });

    await Promise.all(tasks);
    if (!purchaseProducts.length > 0) {
        res.json({ 'Error': 'Your cart is empty.' })
        return;
    }
    console.log(purchaseProducts);

    purchaseProducts.map(product => {
        sessionData['line_items'].push({
            price_data: {
                unit_amount: Math.ceil(product.price) * 100,
                currency: 'usd',
                product_data: {
                    name: product['name'],
                }
            },
            quantity: product['quantity'],
        });
    });
    console.log('This is line itmes==========', sessionData.line_items[0].price_data);
    return sessionData;
};

module.exports = router;