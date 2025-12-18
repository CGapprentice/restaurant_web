import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import '../styles/Menu.css';

const Menu = () => {
  const { addToCart } = useCart();
  const [notification, setNotification] = useState(null);
  const [menuItems, setMenuItems] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        const response = await fetch(`${apiUrl}/api/menu`);
        if (!response.ok) {
          throw new Error('Failed to fetch menu');
        }
        const data = await response.json();
        setMenuItems(data);
      } catch (err) {
        console.error("Error loading menu:", err);
        setError("Could not load menu. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, []);

  const handleAddToCart = (item) => {
    addToCart(item);
    setNotification(`${item.name} added to cart!`);
    setTimeout(() => {
      setNotification(null);
    }, 2000);
  };

  if (loading) return <div className="menu-page"><p style={{textAlign: 'center'}}>Loading menu...</p></div>;
  if (error) return <div className="menu-page"><p style={{textAlign: 'center', color: 'red'}}>{error}</p></div>;

  return (
    <div className="menu-page">
      <h1>Our Menu</h1>
      
      {notification && (
        <div className={`cart-notification ${notification ? 'show' : ''}`}>
          {notification}
        </div>
      )}

      {Object.entries(menuItems).map(([category, items]) => (
        <section key={category} className="menu-section">
          <h2>{category}</h2>
          <div className="menu-grid">
            {items.map((item) => (
              <div key={item._id || item.name} className="menu-item">
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <span className="price">${item.price.toFixed(2)}</span>
                <button 
                  className="add-to-cart" 
                  onClick={() => handleAddToCart(item)}
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};

export default Menu;
