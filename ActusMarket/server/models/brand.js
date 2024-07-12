const Mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const { Schema } = Mongoose;
const {BRAND_CATEGORY} = require('../constants/index');

const options = {
  separator: '-',
  lang: 'en',
  truncate: 120
};

Mongoose.plugin(slug, options);

// Brand Schema
const BrandSchema = new Schema({
  name: {
    type: String,
    trim: true
  },
  slug: {
    type: String,
    slug: 'name',
    unique: true
  },
  image: {
    data: Buffer,
    contentType: String
  },
  description: {
    type: String,
    trim: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  merchant: {
    type: Schema.Types.ObjectId,
    ref: 'Merchant',
    default: null
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  sector: {
    type: Schema.Types.ObjectId,
    ref: 'Sector',
    required: true
  },
  brandCategory: {
    type: String,
    default: BRAND_CATEGORY.Wooden,
    enum: [BRAND_CATEGORY.Wooden, BRAND_CATEGORY.Silver, BRAND_CATEGORY.Golden, BRAND_CATEGORY.Champ]
  },
  updated: Date,
  created: {
    type: Date,
    default: Date.now
  }
});

// Create a geospatial index
BrandSchema.index({ location: '2dsphere' });

module.exports = Mongoose.model('Brand', BrandSchema);
