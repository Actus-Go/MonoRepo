const express = require('express');
const router = express.Router();
const axios = require('axios');

// Bring in Models & Utils
const Cart = require('../../models/cart');
const Product = require('../../models/product');
const auth = require('../../middleware/auth');
const store = require('../../utils/store');
const Coupon = require('../../models/coupon');


router.post('/add', auth, async (req, res) => {
  try {
    const user = req.user._id;
    const items = req.body.products;
    let coupon = null;
    if (req.body.coupon) {
      coupon = req.body.coupon;
      console.log('cououn is', coupon);
    }
    const results = await CheckQuantity(items);
    console.log(results);
    if (results['filteredResults'].length > 0) {
      res.status(400).json({ 'These products are out of the stock': results['filteredResults'] });
      return;
    }

    // const products = store.caculateItemsSalesTax(items);
    console.log(items);
    const cart = new Cart({
      user,
      products: items
    });

    const cartDoc = await cart.save();
    console.log(cartDoc);


    const authHeader = req.headers['authorization'];
    const order = await createOrder(cartDoc['_id'], authHeader, results['prices'], coupon);

    decreaseQuantity(items);

    res.status(200).json({
      success: true,
      cartId: cartDoc.id,
      order
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});

router.delete('/delete/:cartId', auth, async (req, res) => {
  try {
    await Cart.deleteOne({ _id: req.params.cartId });

    res.status(200).json({
      success: true
    });
  } catch (error) {
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});

router.post('/add/:cartId', auth, async (req, res) => {
  try {
    const product = req.body.product;
    const query = { _id: req.params.cartId };

    await Cart.updateOne(query, { $push: { products: product } }).exec();

    res.status(200).json({
      success: true
    });
  } catch (error) {
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});

router.delete('/delete/:cartId/:productId', auth, async (req, res) => {
  try {
    const product = { product: req.params.productId };
    const query = { _id: req.params.cartId };

    await Cart.updateOne(query, { $pull: { products: product } }).exec();

    res.status(200).json({
      success: true
    });
  } catch (error) {
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});

const decreaseQuantity = async products => {
  let bulkOptions = products.map(item => {
    return {
      updateOne: {
        filter: { _id: item.product },
        update: { $inc: { quantity: -item.quantity } }
      }
    };
  });

  await Product.bulkWrite(bulkOptions);
};


const CheckQuantity = async products => {

  let prices = 0;

  // tasks will be an array of Promises
  const tasks = products.map(async item => {
    const product = await Product.findById(item['product']);
    console.log(product['price'], item['quantity']);
    prices += product['price'] * item['quantity'];
    item['maxQuantity'] = product.quantity;
    return product && product.quantity < item.quantity ? item : null;
  });

  const results = await Promise.allSettled(tasks);
  console.log('prices are =======>', prices);
  const filteredResults = results.reduce((acc, result) => {
    if (result.status === 'fulfilled' && result.value) {
      acc.push(result.value);
    }
    return acc;
  }, []);
  console.log(filteredResults);
  return { filteredResults, prices };
};

const createOrder = async (cartId, authHeader, total, coupon) => {
  const url = 'http://localhost:3000/api/order/add';
  let body = {
    cartId,
    total: total + (total * 0.14)
  };
  if (coupon) {
    body['coupon'] = coupon;
  }
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': authHeader
  };
  let message = '';
  await axios.post(url, body, { headers })
    .then(res => {
      message = res.data;
    })
    .catch(err => { return; });

  return message;
};

module.exports = router;
