import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { MenuItem } from './models/MenuItem.js';

dotenv.config();
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/Cluster0';

const menuItems = [
  // Main Dishes
  { name: "World Famous Fried Chicken", price: 12.50, description: "Crispy fried chicken seasoned to perfection", category: "Main Dishes" },
  { name: "Jerk Chicken", price: 12.50, description: "Spicy grilled chicken marinated in authentic Jamaican jerk seasoning", category: "Main Dishes" },
  { name: "Curry Goat", price: 14.00, description: "Tender goat meat slow-cooked in rich curry sauce", category: "Main Dishes" },
  { name: "Oxtail", price: 14.00, description: "Braised oxtail in butter bean gravy", category: "Main Dishes" },
  { name: "Brown Stew Snapper", price: 18.00, description: "Fresh snapper in savory brown stew sauce", category: "Main Dishes" },
  { name: "Ackee and Saltfish", price: 13.99, description: "Jamaica's national dish with salted cod and ackee fruit", category: "Main Dishes" },
  
  // Sides
  { name: "Rice & Peas", price: 4.99, description: "Coconut rice with kidney beans", category: "Sides" },
  { name: "Fried Plantains", price: 3.99, description: "Sweet caramelized plantains", category: "Sides" },
  { name: "Festival", price: 2.99, description: "Sweet fried dough", category: "Sides" },
  { name: "Steamed Vegetables", price: 3.99, description: "Fresh mixed vegetables", category: "Sides" },

  // Beverages
  { name: "Sorrel Drink", price: 3.49, description: "Hibiscus tea with ginger and spices", category: "Beverages" },
  { name: "Ginger Beer", price: 3.49, description: "Spicy homemade ginger beverage", category: "Beverages" },
  { name: "Coconut Water", price: 3.99, description: "Fresh coconut water", category: "Beverages" },
  { name: "Fruit Punch", price: 2.99, description: "Tropical fruit blend", category: "Beverages" }
];

mongoose.connect(MONGODB_URI)
  .then(async () => {
    console.log('Connected to MongoDB');
    
    // Clear existing items
    await MenuItem.deleteMany({});
    console.log('Cleared existing menu items');

    // Insert new items
    await MenuItem.insertMany(menuItems);
    console.log('Seeded menu items successfully');

    mongoose.connection.close();
  })
  .catch(err => {
    console.error(err);
    mongoose.connection.close();
  });
