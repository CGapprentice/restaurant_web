import React, { useState } from 'react';
import '../styles/Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({
      name: '',
      email: '',
      message: ''
    });
  };

  return (
    <div className="contact-page">
      <h1>Contact Us</h1>

      <div className="contact-container">
        <div className="contact-form-section">
          <h2>Send Us a Message</h2>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input 
                type="text" 
                id="name" 
                name="name" 
                value={formData.name}
                onChange={handleChange}
                required 
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                value={formData.email}
                onChange={handleChange}
                required 
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea 
                id="message" 
                name="message" 
                rows="6" 
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <button type="submit" className="submit-btn">Send Message</button>
          </form>
        </div>

        <div className="map-section">
          <h2>Visit Us</h2>
          <div className="map-container">
            <iframe
              title="Dougies Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3030.8447203847654!2d-73.90361892403!3d40.6287089713068!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c244b4f7f7f7f7%3A0x7f7f7f7f7f7f7f7f!2s9604%20Avenue%20L%2C%20Brooklyn%2C%20NY%2011236!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy">
            </iframe>
          </div>
          <div className="contact-info">
            <p><strong>Address:</strong> 9604 Avenue L, Brooklyn, NY 11236</p>
            <p><strong>Phone:</strong> (347) 702-7190</p>
            <p><strong>Email:</strong> info@dougies.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
