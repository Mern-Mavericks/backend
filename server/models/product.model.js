// models/product.model.js
import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  category: String,
  featured: { type: Boolean, default: false },
  created: { type: Date, default: Date.now },
  updated: Date,
});

export default mongoose.model('Product', ProductSchema);
