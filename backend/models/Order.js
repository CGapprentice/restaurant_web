import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  customerInfo: {
    name: String,
    email: String,
    address: String
  },
  items: [{
    name: String,
    quantity: Number,
    price: Number
  }],
  total: Number,
  status: { type: String, default: 'Pending' },
  createdAt: { type: Date, default: Date.now }
});

export const Order = mongoose.model('Order', orderSchema);
