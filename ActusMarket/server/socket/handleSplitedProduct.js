const Product = require('../models/product');
const UserRequest = require('../models/userRequest');
const BigOrder = require('../models/bigOrder');
const SharedProduct = require('../models/sharedProduct');
const Order = require('../models/order');
const Cart = require('../models/cart');

const support = require('./support');
const createCheckoutSession = require('../utils/createCheckoutSession');

const handleSplitedProduct = (io, socket) => {

    socket.on('split', async (data) => {
        try {
            const product = await Product.findById(data.id)
                .populate('productCoupon');
            const numOfSplit = data.numOfSplit ? data.numOfSplit : 1;
            if (!product && !numOfSplit) {
                socket.emit('error', {
                    message: 'Theres no product with that ID.'
                });
                return;
            }
            let total = (product.price - (product.price * product.productCoupon.discount / 100));
            total = (total + (total * 0.14)).toFixed(2);
            const pricePerPerson = total / numOfSplit;

            const sharedProduct = new SharedProduct(
                {
                    user: socket.user,
                    product: product._id,
                    isSplited: true,
                    numberOfUsersSplit: parseInt(numOfSplit),
                    pricePerPerson
                }
            );
            await sharedProduct.save();
            const user = support.findUserById(socket.user);
            io.emit('share', {
                message: `${user.name} wants to split ${product.name} with ${numOfSplit} each person will pay ${pricePerPerson}`,
                sharedProduct: sharedProduct._id
            });

        }
        catch (error) {
            console.error('Error', error);
            socket.emit('error', { message: 'An error has occured' });
        }

    });


    socket.on('acceptToSplit', async (data) => {
        try {
            const userRequestId = data.id;
            const userRequest = await UserRequest.findOne({ _id: userRequestId, isActive: true, isAccepted: false });

            if (!userRequest) {
                socket.emit('error', {
                    message: 'No request with that ID.'
                });
                return;
            }
            userRequest.isAccepted = true;
            await userRequest.save();

            const user = support.findUserById((userRequest.user).toString());

            const sharedProduct = await SharedProduct.findOne({ _id: userRequest.sharedProduct, isActive: true, isSplited: true });

            if (!sharedProduct) {
                io.to(user.socketId).emit('error', {
                    message: 'Sorry this sharing has been end.'
                });
                return;
            }
            if (sharedProduct.numberOfUsersSplit > sharedProduct.splittedUsers.length) {
                sharedProduct.splittedUsers.push(userRequest.user);
                await sharedProduct.save();
                
                io.to(user.socketId).emit('acceptToSplit', {
                    message: 'Your request to split has been Accepted'
                });
            }

            setTimeout(async () => {
                if (sharedProduct.numberOfUsersSplit == sharedProduct.splittedUsers.length) {
                    const product = await Product.findById((sharedProduct.product).toString());
                    const cart = new Cart({
                        isSplited: true,
                        products: { product, quantity: 1 },
                        splittedUsers: [...sharedProduct.splittedUsers, sharedProduct.user]
                    });
                    await cart.save();

                    const orders = await Promise.all(cart.splittedUsers.map(async user => {
                        const order = new Order({
                            cart: cart._id,
                            user: user,
                            total: sharedProduct.pricePerPerson,
                            isSplited: true,
                        });
                        await order.save();
                        return order._id;
                    }));

                    const bigOrder = new BigOrder({
                        orders: [...orders],
                        sharedProduct: sharedProduct._id
                    });
                    await bigOrder.save();

                    const checkoutUrls = await Promise.all(orders.map(async order => {
                        const checkoutUrl = await createCheckoutSession(order, cart, socket.token);
                        const orderDoc = await Order.findById(order);
                        return { user: orderDoc.user, checkoutUrl };
                    }));

                    await Promise.all(checkoutUrls.map(checkoutUrl => {
                        const user = support.findUserById((checkoutUrl.user).toString());
                        io.to(user.socketId).emit('payForSplitedOrder', {
                            checkoutUrl: checkoutUrl.checkoutUrl
                        });
                    }));
                }
            },
                1000);



        }
        catch (error) {
            console.error('Error', error);
            socket.emit('error', { message: 'An error has occured' });
        }

    });


};


module.exports = handleSplitedProduct;