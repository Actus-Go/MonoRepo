const router = require('express').Router();

const authRoutes = require('./auth');
const userRoutes = require('./user');
const addressRoutes = require('./address');
const newsletterRoutes = require('./newsletter');
const productRoutes = require('./product');
const categoryRoutes = require('./category');
const brandRoutes = require('./brand');
const contactRoutes = require('./contact');
const merchantRoutes = require('./merchant');
const cartRoutes = require('./cart');
const orderRoutes = require('./order');
const reviewRoutes = require('./review');
const wishlistRoutes = require('./wishlist');
const paymentRoutes = require('./payment');
const sectorRoutes = require('./sector');
const couponRoutes = require('./coupon');
const userGuideRouters = require('./userGuide');
const savingsTrackerRoutes = require('./savingsTracker');

// user guide routers
router.use('/guide', userGuideRouters);

// auth routes
router.use('/auth', authRoutes);

// user routes
router.use('/user', userRoutes);

// payment routes
router.use('/payment', paymentRoutes);

// address routes
router.use('/address', addressRoutes);

// newsletter routes
router.use('/newsletter', newsletterRoutes);

// product routes
router.use('/product', productRoutes);

// category routes
router.use('/category', categoryRoutes);

// brand routes
router.use('/brand', brandRoutes);

// sector routes
router.use('/sector', sectorRoutes);

// savings routes
router.use('/tracker', savingsTrackerRoutes);

// coupon routes
router.use('/coupon', couponRoutes);

// contact routes
router.use('/contact', contactRoutes);

// merchant routes
router.use('/merchant', merchantRoutes);

// cart routes
router.use('/cart', cartRoutes);

// order routes
router.use('/order', orderRoutes);

// Review routes
router.use('/review', reviewRoutes);

// Wishlist routes
router.use('/wishlist', wishlistRoutes);

module.exports = router;
