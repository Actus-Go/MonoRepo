const express = require('express');
const router = express.Router();

const role = require('../../middleware/role');
const auth = require('../../middleware/auth');
const Coupon = require('../../models/coupon');
const { ROLES } = require('../../constants');
const generateCode = require('../../utils/genrateCode');



router.post('/add', auth, role.check(ROLES.Admin, ROLES.Merchant), async (req, res) => {
    try {
        const { ownerBrand, discount } = req.body;
        const { isLimited, isOpen, startTime, endTime, redemptionLimit, isForSpecificGroup, group } = req.body;

        const hasEssentialInfo = ownerBrand && discount;
        const hasValidTime = startTime && endTime;
        const hasValidGroup = isForSpecificGroup && group;
        if (!hasEssentialInfo && (!hasValidTime || !hasValidGroup) || redemptionLimit) {
            res.status(400).json({ 'Error': 'Unvalid data.' });
        }

        // Function to check if the provided date is valid
        const isValidDate = (dateString) => {
            const date = new Date(dateString);
            return date instanceof Date && !isNaN(date);
        };

        if (!isValidDate(startTime) || !isValidDate(endTime)) {
            return res.status(400).json({ "Error": "Invalid startTime or endTime provided." });
        }

        const code = generateCode(20);
        const coupon = new Coupon({
            code,
            ownerBrand,
            discount,
            isLimited,
            isOpen,
            startTime: new Date(startTime),
            endTime: new Date(endTime),
            redemptionLimit,
            isForSpecificGroup,
            group
        });

        const couponDoc = await coupon.save();
        res.status(200).json({
            success: true,
            message: `Coupon has been added successfully!`,
            coupon: couponDoc
        });
    } catch (err) {
        console.log(err);
        res.status(400).json({
            error: 'Your request could not be processed. Please try again.'
        });
    }

});


// function generateCouponCode(length) {
//     let result = '';
//     const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//     const charactersLength = characters.length;
//     for (let i = 0; i < length; i++) {
//         result += characters.charAt(Math.floor(Math.random() * charactersLength));
//     }
//     return result;
// }


module.exports = router;