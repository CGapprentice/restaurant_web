import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import '../styles/Cart.css';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, getCartTotal } = useCart();

  if (cart.length === 0) {
    return (
      <div className="cart-page">
        <h1>Shopping Cart</h1>
        <div className="cart-container empty">
          <div className="cart-items">
            <p className="empty-cart">
              Your cart is empty. <Link to="/menu">Browse our menu</Link>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h1>Shopping Cart</h1>

      <div className="cart-container">
        <div className="cart-items">
          {cart.map((item) => (
            <div key={item.name} className="cart-item">
              <div className="item-details">
                <h3>{item.name}</h3>
                <p className="item-price">${item.price.toFixed(2)}</p>
              </div>
              <div className="item-controls">
                <div className="quantity-controls">
                  <button 
                    className="qty-btn" 
                    onClick={() => updateQuantity(item.name, -1)}
                  >-</button>
                  <span className="quantity">{item.quantity}</span>
                  <button 
                    className="qty-btn" 
                    onClick={() => updateQuantity(item.name, 1)}
                  >+</button>
                </div>
                <p className="item-total">${(item.price * item.quantity).toFixed(2)}</p>
                <button 
                  className="remove-btn" 
                  onClick={() => removeFromCart(item.name)}
                >Remove</button>
              </div>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <h2>Order Summary</h2>
          <div className="summary-row">
            <span>Subtotal:</span>
            <span>${getCartTotal().toFixed(2)}</span>
          </div>
          <div className="summary-row total">
            <span>Total:</span>
            <span>${getCartTotal().toFixed(2)}</span>
          </div>
          <button className="clear-btn" onClick={clearCart}>Clear Cart</button>
          <button className="checkout-btn" onClick={() => alert('Proceeding to checkout...')}>Proceed to Checkout</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
