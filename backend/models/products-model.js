const mongoose = require('mongoose');

const reviews = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    name: { type: String },
    rating: { type: Number },
    comment: { type: String },
  },
  { timestamps: true }
);

const productSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    name: { type: String, required: true, minlenght: 10 },
    image: { type: String, required: true },
    description: { type: String },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true, default: 0 },
    countInStock: {
      type: Number,
      required: true,
      // set: (number) => Math.round(age),
      // get: (number) => Math.round(number),
    },
    rating: { type: Number, required: true, default: 0 },
    numReviews: { type: String, required: true, default: 0 },
    reviews: [reviews],
  },
  { timestamps: true }
);

const Products = mongoose.model('Product', productSchema);

module.exports = Products;
