import { useState, useEffect } from 'react';
import '../styles/Home.css';
import food1 from '../assets/dougies_food1.jpeg';
import food2 from '../assets/dougies_food2.jpg';
import food3 from '../assets/dougies_food3.jpg';
import inside from '../assets/dougies_inside.jpg';
import storefront from '../assets/dougies_storefront.jpg';

const Home = () => {
  const images = [food1, food2, food3, inside, storefront, food1];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="home-page">
      <section className="hero">
        <div className="hero-content">
          <h2>Dougies</h2>
          <p>Authentic Jamaican Cuisine</p>
        </div>
      </section>

      <section className="gallery">
        <h2>Our Dishes</h2>
        <div className="slider">
          <button className="slider-btn prev" onClick={prevImage}>&lt;</button>
          <div className="slider-container">
            {images.map((img, index) => (
              <img 
                key={index} 
                src={img} 
                alt={`Dougies view ${index + 1}`} 
                style={{ display: index === currentIndex ? 'block' : 'none' }}
              />
            ))}
          </div>
          <button className="slider-btn next" onClick={nextImage}>&gt;</button>
        </div>
      </section>
    </div>
  );
};

export default Home;
