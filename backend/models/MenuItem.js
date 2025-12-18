import mongoose from 'mongoose';

const menuItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: String,
  category: { 
    type: String, 
    required: true,
    enum: ['Main Dishes', 'Sides', 'Beverages'] 
  },
  imageUrl: String
});

export const MenuItem = mongoose.model('MenuItem', menuItemSchema);
