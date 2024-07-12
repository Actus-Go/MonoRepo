const express = require('express');
const router = express.Router();

const Brand = require('../../models/brand');
const Product = require('../../models/product');



router.post('/near-brands', async (req, res) => {
    const userLocation = req.body.location;
    const distance = req.body.distance;
    try {
        if (!userLocation.length == 2 && !parseInt(distance)) {
            return res.status(400).json({
                error: 'Your have to enter valid data.'
            });
        }
        const nearBrands = await Brand.find({
            location: {
                $near: {
                    $geometry: {
                        type: "Point",
                        coordinates: userLocation
                    },
                    $maxDistance: distance
                }
            }
        });
        if (!nearBrands) {
            return res.status(400).json({
                error: 'Theres no products for that brand.'
            });
        }
        return res.status(200).json({
            nearBrands
        });
    }
    catch (err) {
        return res.status(400).json({
            error: 'Your request could not be processed. Please try again.'
        });
    }
});


router.get('/:id/products', async (req, res) => {
    const BrandId = req.params.id;
    try {
        const products = await Product.find({ brand: BrandId })
            .populate({
                path: 'productCoupon',
                populate: {
                    path: 'productCoupon',
                    model: 'Coupon'
                }
            })
            .lean();
        if (!products) {
            return res.status(400).json({
                error: 'Theres no products for that brand.'
            });
        }
        const productDocs = products.map(product => {
            const priceAfterCoupon = (product['price'] - (product['price'] * (product['productCoupon']['discount'] / 100))).toFixed(2);
            return {
                id: product._id,
                name: product.name,
                quantity: product.quantity,
                discount: product.productCoupon.discount,
                price: product.price,
                priceAfterCoupon
            };
        });
        return res.status(200).json({
            products: productDocs
        });
    }
    catch (err) {
        return res.status(400).json({
            error: 'Your request could not be processed. Please try again.'
        });
    }
});



router.get('/product/:id', async (req, res) => {
    const productId = req.params.id;
    try {
        const product = await Product.findById(productId)
            .populate({
                path: 'brand',
                populate: {
                    path: 'merchant',
                    model: 'Merchant'
                }
            }).populate({
                path: 'productCoupon',
                populate: {
                    path: 'productCoupon',
                    model: 'Coupon'
                }
            });
        if (!product) {
            return res.status(400).json({
                error: 'Theres no product with that ID.'
            });
        }
        return res.status(200).json({
            product
        });
    }
    catch (err) {
        return res.status(400).json({
            error: 'Your request could not be processed. Please try again.'
        });
    }
});


module.exports = router;