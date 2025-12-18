import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import cartIcon from '../assets/cart_design.png';
import '../styles/Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { getCartCount } = useCart();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <header>
      <nav>
        <div className="logo">
          <h1>Dougies</h1>
        </div>
        <div className={`hamburger ${isOpen ? 'active' : ''}`} onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <ul className={`nav-links ${isOpen ? 'active' : ''}`}>
          <li className="cart-link">
            <Link to="/cart" className={`cart-icon ${isActive('/cart')}`} onClick={closeMenu}>
              <img src={cartIcon} alt="Cart" />
              {getCartCount() > 0 && <span className="cart-count">{getCartCount()}</span>}
            </Link>
          </li>
          <li><Link to="/" className={isActive('/')} onClick={closeMenu}>Home</Link></li>
          <li><Link to="/menu" className={isActive('/menu')} onClick={closeMenu}>Menu</Link></li>
          <li><Link to="/about" className={isActive('/about')} onClick={closeMenu}>About</Link></li>
          <li><Link to="/contact" className={isActive('/contact')} onClick={closeMenu}>Contact</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
