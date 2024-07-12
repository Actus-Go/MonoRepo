const Order = require('../models/order');
const SavingsTracker = require('../models/savingsTracker');

const createTracker = async (order) => {

    const orderDoc = await Order.findById(order)
        .populate({
            path: 'cart',
            populate: {
                path: 'products',
                populate: {
                    path: 'product',
                    populate: {
                        path: 'productCoupon',
                    }
                }
            }
        });

    let totalSavings = 0;
    const products = orderDoc.cart.products.map(item => {
        const price = item.product.price;
        const discount = item.product.productCoupon.discount;
        totalSavings += ((price * (discount / 100)) * item.quantity);
        return item.product._id;
    });

    console.log(totalSavings, products, orderDoc.user);

    const savingsTracker = new SavingsTracker({
        order,
        user: orderDoc.user,
        orderProducts: products,
        totalSavings
    });
    await savingsTracker.save();

    return;
};


module.exports = createTracker;