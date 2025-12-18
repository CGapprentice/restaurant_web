import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

// Helper to get or create a session ID
const getSessionId = () => {
  let sessionId = localStorage.getItem('sessionId');
  if (!sessionId) {
    sessionId = 'sess_' + Math.random().toString(36).substr(2, 9);
    localStorage.setItem('sessionId', sessionId);
  }
  return sessionId;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const sessionId = getSessionId();
  const isInitialMount = useRef(true);

  // Load cart from backend on mount
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        const response = await fetch(`${apiUrl}/api/cart/${sessionId}`);
        if (response.ok) {
          const data = await response.json();
          setCart(data);
        }
      } catch (error) {
        console.error('Failed to fetch cart:', error);
        // Fallback to localStorage if backend fails
        const savedCart = localStorage.getItem('cart');
        if (savedCart) setCart(JSON.parse(savedCart));
      }
    };
    fetchCart();
  }, [sessionId]);

  // Sync cart to backend when it changes
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    const syncCart = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        await fetch(`${apiUrl}/api/cart`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sessionId, items: cart })
        });
      } catch (error) {
        console.error('Failed to sync cart:', error);
      }
      // Keep localStorage as backup
      localStorage.setItem('cart', JSON.stringify(cart));
    };

    // Debounce slightly to avoid too many requests
    const timeoutId = setTimeout(syncCart, 500);
    return () => clearTimeout(timeoutId);
  }, [cart, sessionId]);

  const addToCart = (item) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(i => i.name === item.name);
      if (existingItem) {
        return prevCart.map(i => 
          i.name === item.name ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (name) => {
    setCart(prevCart => prevCart.filter(item => item.name !== name));
  };

  const updateQuantity = (name, change) => {
    setCart(prevCart => {
      return prevCart.map(item => {
        if (item.name === name) {
          const newQuantity = item.quantity + change;
          return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
        }
        return item;
      });
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartCount,
    sessionId // Expose if needed for orders
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
