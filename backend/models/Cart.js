import mongoose from 'mongoose';

const cartItemSchema = new mongoose.Schema({
  menuItem: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem' },
  name: String, // Storing name/price for easier access, though ref is better for strictness
  price: Number,
  quantity: { type: Number, default: 1 }
});

const cartSchema = new mongoose.Schema({
  sessionId: { type: String, required: true, unique: true },
  items: [cartItemSchema],
  updatedAt: { type: Date, default: Date.now }
});

export const Cart = mongoose.model('Cart', cartSchema);
