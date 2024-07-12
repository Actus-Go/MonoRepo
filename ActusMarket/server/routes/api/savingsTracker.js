const express = require('express');
const router = express.Router();
const SavingsTracker = require('../../models/savingsTracker');
const auth = require('../../middleware/auth');

router.post('/savings', auth, async (req, res) => {
    const days = req.body.days;
    console.log(days);
    if (typeof (days) !== 'number') {
        res.status(400).json({
            error: 'You entered unvalid Data'
        });
    }
    try {
        const since = new Date();
        since.setDate(since.getDate() - days);
        const savings = await SavingsTracker.find({
            createdAt: { $gte: since }
        }).populate({ path: 'orderProducts', model: 'Product' }).exec();

        res.status(200).json(savings);
    } catch (err) {
        console.log(err);
        res.status(400).json({
            error: 'Your request could not be processed. Please try again.'
        });
    }
});


module.exports = router;