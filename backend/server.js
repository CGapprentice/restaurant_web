import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { MenuItem } from './models/MenuItem.js';
import { Cart } from './models/Cart.js';
import { Order } from './models/Order.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/Cluster0';

app.use(cors({
  origin: '*', // Allow all origins for now to fix the NetworkError
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Connect to MongoDB
mongoose.connect(MONGODB_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// --- API ROUTES ---

// 1. Get Menu (Grouped by Category)
app.get('/api/menu', async (req, res) => {
  try {
    const items = await MenuItem.find();
    // Group items by category for the frontend
    const groupedMenu = items.reduce((acc, item) => {
      if (!acc[item.category]) acc[item.category] = [];
      acc[item.category].push(item);
      return acc;
    }, {});
    res.json(groupedMenu);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 2. Get Cart
app.get('/api/cart/:sessionId', async (req, res) => {
  try {
    const cart = await Cart.findOne({ sessionId: req.params.sessionId });
    res.json(cart ? cart.items : []);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 3. Sync/Update Cart
app.post('/api/cart', async (req, res) => {
  const { sessionId, items } = req.body;
  try {
    let cart = await Cart.findOne({ sessionId });
    if (cart) {
      cart.items = items;
      cart.updatedAt = Date.now();
    } else {
      cart = new Cart({ sessionId, items });
    }
    await cart.save();
    res.json(cart.items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 4. Create Order
app.post('/api/orders', async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    const savedOrder = await newOrder.save();
    
    // Optional: Clear cart after order
    if (req.body.sessionId) {
      await Cart.findOneAndDelete({ sessionId: req.body.sessionId });
    }
    
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
