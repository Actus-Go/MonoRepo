const Product = require('../models/product');
const SharedProduct = require('../models/sharedProduct');
const User = require('../models/user');
const UserRequest = require('../models/userRequest');
const Order = require('../models/order');
const Cart = require('../models/cart');
const VerificationCode = require('../models/verificationCode');

const support = require('./support');
const generateCode = require('../utils/genrateCode');
const createCheckoutSession = require('../utils/createCheckoutSession');



const handleSharedProducts = (io, socket) => {
    socket.on('share', async (productId) => {
        const productDoc = await Product.findById(productId.id)
            .populate({
                path: 'productCoupon',
                populate: {
                    path: 'productCoupon',
                    model: 'Coupon'
                }
            });
        const user = await User.findById(socket.user);
        if (!productDoc) {
            socket.emit('error', { message: 'No product with that ID.' });
            return;
        }

        const isSharedProductExists = await SharedProduct.exists({ user: user._id, product: productDoc._id, isActive: true });

        if (isSharedProductExists) {
            io.to(socket.id).emit('error', {
                message: 'You have already shared this product'
            });
            return;
        }


        const sharedProduct = new SharedProduct({
            user: user._id,
            product: productDoc._id
        });

        await sharedProduct.save();

        // function to change the status of the shared product after 5min
        setTimeout(async () => {
            try {
                const updateSharedProduct = await SharedProduct.findByIdAndUpdate(
                    sharedProduct._id,
                    { isActive: false }
                ).populate('product', 'name');
                const user = await User.findById(socket.user);
                if (!user) {
                    return;
                }
                io.to(user.socketId).emit({
                    message: `Your shared product ${updateSharedProduct.product.name} has been expired`
                });
            } catch (error) {
                console.error('Failed to fetch shared product:', error);
                socket.emit('error', { message: 'Failed to deactivate the shared product.' });
            }
        }, 300000);

        io.sockets.emit('share', {
            message: `A product has been shared from ${user.firstName} ${user.lastName}`,
            product: productDoc,
            user: {
                firstName: user.firstName,
                lastName: user.lastName
            },
            sharedProduct: sharedProduct._id
        });
    });


    socket.on('allSharedProducts', async () => {
        try {
            const sharedProducts = await SharedProduct.find({ isActive: true })
                .populate('user', 'firstName lastName _id lastLocation')
                .populate({
                    path: 'product',
                    populate: {
                        path: 'productCoupon',
                        model: 'Coupon',
                        select: 'discount'
                    }
                });

            if (!sharedProducts.length) {
                socket.emit('allSharedProducts', {
                    message: 'There is no shared products right now.'
                });
                return;
            }

            socket.emit('allSharedProducts', sharedProducts);
        } catch (error) {
            console.error('Failed to fetch shared products:', error);
            socket.emit('error', { message: 'Failed to retrieve shared products' });
        }
    });


    socket.on('requestToShare', async (data) => {
        try {
            const sharedProductId = data.id;
            const sharedProductDoc = await SharedProduct.findById(sharedProductId);
            const isRequestExists = await UserRequest.exists({ user: socket.user, sharedProduct: sharedProductDoc._id });
            // The user that sent the request
            const currentUser = support.findUserById(socket.user);

            if (isRequestExists) {
                io.to(currentUser.socketId).emit('error', {
                    message: 'You have already sent the share request'
                });
                return;
            }

            const userRequest = new UserRequest({
                user: socket.user,
                sharedProduct: sharedProductDoc._id
            });
            await userRequest.save();
            // The owner of the shared product
            const user = support.findUserById((sharedProductDoc.user).toString());


            if (!user) {
                io.to(currentUser.socketId).emit('requestToShare', {
                    message: "The owner of the shared product is not active"
                });
                return;
            }
            io.to(user.socketId).emit('requestToShare', {
                message: `${currentUser.name} send you a request to share`,
                user: currentUser.name,
                userRequest: userRequest._id
            });
        }
        catch (error) {
            console.error('Failed to fetch shared products:', error);
            socket.emit('error', { message: 'Failed to send the request' });
        }
    });


    socket.on('accept', async (data) => {
        try {
            const requestId = data.id;
            const userRequest = await UserRequest.findOne({
                _id: requestId,
                isActive: true
            }).populate('sharedProduct');
            console.log(userRequest);

            userRequest.isAccepted = true;
            await userRequest.save();

            if (!userRequest && !userRequest.sharedProduct.isActive && userRequest.sharedProduct.isSplited) {
                socket.emit('error', { message: 'This request is not found' });
                return;
            }
            const product = await Product.findById(userRequest.sharedProduct.product)
                .populate('productCoupon');
            console.log(product);
            const total = (product.price - (product.price * product.productCoupon.discount / 100));
            const cart = new Cart({
                user: userRequest.sharedProduct.user,
                products: { product, quantity: 1 }
            });
            await cart.save();

            const order = new Order({
                cart: cart._id,
                user: userRequest.sharedProduct.user,
                total: (total + (total * 0.14)).toFixed(2),
                coupon: product.productCoupon._id,
                discount: product.productCoupon.discount,
                isShared: true,
                sharedWith: userRequest.user
            });
            await order.save();

            const code = generateCode(6);
            const verificationCode = new VerificationCode({
                order: order._id,
                code: code
            });
            await verificationCode.save();

            const checkoutUrl = await createCheckoutSession(order._id, cart._id, socket.token);
            if (checkoutUrl.length <= 0) {
                socket.emit('error', { error: 'An error has occured.' });
                return;
            }
            socket.emit('accept', {
                checkoutUrl
            });

            const requestedUserSocket = support.findUserById((userRequest.user).toString());
            io.to(requestedUserSocket.socketId).emit('requestToShare', {
                message: 'Your request has been accepted'
            });
        } catch (error) {
            console.error('Failed to fetch user request:', error);
            socket.emit('error', { message: 'This request is not found' });
        }

    });


    socket.on('reject', async (data) => {
        try {
            const userRequest = await UserRequest.findOneAndUpdate(
                { _id: data.id, isAccepted: false, isActive: true },
                { isActive: false },
                { new: true }
            );
            const sendRejectSocket = support.findUserById((userRequest.user).toString());
            io.to(sendRejectSocket.socketId).emit('requestToShare', {
                message: 'Your request has been rejected'
            });
        }
        catch (error) {
            console.error('Error', error);
            socket.emit('error', { message: 'An error has occured.' });
        }
    });

};


// const createCheckoutSession = async (order, cart, token) => {
//     url = 'http://localhost:3000/api/payment/create-checkout-session';
//     let body = {
//         cart,
//         order
//     };
//     let headers = {
//         'Content-Type': 'application/json',
//         'Authorization': token
//     };

//     let checkoutUrl = '';
//     await axios.post(url, body, { headers })
//         .then(res => {
//             checkoutUrl = res.data;
//         })
//         .catch(err => { return; });

//     return checkoutUrl;
// };



module.exports = handleSharedProducts;