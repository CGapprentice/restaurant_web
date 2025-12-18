import React from 'react';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer>
      <div className="footer-content">
        <div className="footer-section">
          <h3>Hours</h3>
          <p>Monday - Thursday: 8am - 11pm</p>
          <p>Friday - Saturday: 8am - 12am</p>
          <p>Sunday: 8am - 11pm</p>
        </div>
        <div className="footer-section">
          <h3>Follow Us</h3>
          <div className="social-links">
            <a href="https://www.facebook.com/Dougiesjamaicancuisine/" target="_blank" rel="noreferrer" aria-label="Facebook">Facebook</a>
            <a href="https://www.grubhub.com/restaurant/dougies-jamaican-cuisine-9604-ave-l-brooklyn/339389" target="_blank" rel="noreferrer" aria-label="GrubHub">GrubHub</a>
          </div>
        </div>
      </div>
      <p className="copyright">&copy; 2025 Dougies Jamaican Cuisine</p>
    </footer>
  );
};

export default Footer;
