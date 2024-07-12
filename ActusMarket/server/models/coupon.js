const mongoose = require('mongoose');
const { Schema } = mongoose;
const { BRAND_CATEGORY, USER_TYPES } = require('../constants/index');
const Brand = require('./brand');

const couponSchema = new Schema({
    code: {
        type: String,
        required: true,
        unique: true
    },
    ownerBrand: {
        type: Schema.Types.ObjectId,
        ref: 'Brand',
        required: true
    },
    discount: {
        type: Number,
        required: true,
        min: [0, 'Discount cannot be less than 0'],
        max: [100, 'Discount cannot be more than 100']
    },
    couponCategory: {
        type: String,
        enum: Object.values(BRAND_CATEGORY)
    },
    isLimited: {
        type: Boolean,
        default: false,
    },
    isOpen: {
        type: Boolean,
        default: false,
    },
    startTime: {
        type: Date,
        default: null,
    },
    endTime: {
        type: Date,
        default: null,
    },
    redemptionLimit: {
        type: Number,
        default: null
    },
    isForSpecificGroup: {
        type: Boolean,
        default: false,
    },
    group: {
        type: String,
        enum: [...Object.values(USER_TYPES), null],
        default: null
    },
    isActive: {
        type: Boolean,
        default: true,
    }
}, { timestamps: true });



function handleDurationCoupon(coupon, next) {
    if (!coupon.isLimited) {
        if (coupon.isOpen) {
            coupon.isLimited = false;
            coupon.startTime = null;
            coupon.endTime = null;
        }
        return;
    }
    handleLimitedDurationCoupon(coupon, next);
    coupon.isOpen = false;
}

function handleLimitedDurationCoupon(coupon, next) {
    if (coupon.startTime && coupon.endTime) {
        coupon.redemptionLimit = null;
        coupon.isForSpecificGroup = false;
        coupon.group = null;
        return;
    }
    if (coupon.redemptionLimit) {
        coupon.startTime = null;
        coupon.endTime = null;
        coupon.isForSpecificGroup = false;
        coupon.group = null;
        return;
    }
    if (coupon.isForSpecificGroup && !coupon.group) {
        return next(new Error('You must set the group of the coupon.'));
    }
    // If none above, it means settings are unclear or incomplete
    return next(new Error('You must take an option like a time, redemptionLimit, or specify if for the group'));
}

couponSchema.pre('save', async function (next) {

    handleDurationCoupon(this, next);
    if (this.discount > 0 && this.discount <= 15) {
        this.couponCategory = BRAND_CATEGORY.Wooden;
    }
    else if (this.discount > 15 && this.discount <= 30) {
        this.couponCategory = BRAND_CATEGORY.Silver;
    }
    else if (this.discount > 30 && this.discount <= 70) {
        this.couponCategory = BRAND_CATEGORY.Golden;
    }
    else if (this.discount > 70) {
        this.couponCategory = BRAND_CATEGORY.Champ;
    }
    else {
        next(new Error('The discount must be from 0 to 100.'));
    }

    const types = {
        Wooden: 15,
        Silver: 30,
        Golden: 70,
        Champ: 100
    };

    const brandDoc = await Brand.findById(this.ownerBrand);
    if (!brandDoc) {
        next(new Error('No brand with such ID.'));
    }
    if (types[brandDoc.brandCategory] < types[this.couponCategory]) {
        brandDoc.brandCategory = this.couponCategory;
        await brandDoc.save();
    }

    next();
});



const Coupon = mongoose.model('Coupon', couponSchema);

module.exports = Coupon;