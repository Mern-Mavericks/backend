import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  orderNumber: {
    type: String,
    required: true,
    unique: true,
  },
  delivered: {
    type: Boolean,
    required: true,
    default: false,
  },
  address: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});


export default mongoose.model('Order', orderSchema);
