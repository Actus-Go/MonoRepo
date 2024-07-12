const express = require('express');
const router = express.Router();
const User = require('../../models/user');

router.post('/register-hook', async (req, res) => {
    try {
        const user = req.body.user;
        const userDoc = new User({
            _id: user._id,
            firstName: user.first_name,
            lastName: user.last_name,
            email: user.email,
            password: user.password
        });

        await userDoc.save();
        res.status(200).send('Success');
    }
    catch (err) {
        res.status(400).send('Failed');
    }

});


module.exports = router;