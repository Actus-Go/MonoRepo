const axios = require('axios');


const createCheckoutSession = async (order, cart, token) => {
    url = 'http://localhost:3000/api/payment/create-checkout-session';
    let body = {
        cart,
        order
    };
    let headers = {
        'Content-Type': 'application/json',
        'Authorization': token
    };

    let checkoutUrl = '';
    await axios.post(url, body, { headers })
        .then(res => {
            checkoutUrl = res.data;
        })
        .catch(err => { return; });

    return checkoutUrl;
};


module.exports = createCheckoutSession;