import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import './footer.css';

const Footer = () => {
  return (
    <footer className="footer-section">
      <div className="footer-container">
        <p className="footer-text">
          &copy; {new Date().getFullYear()} <span className="brand-name">CareConnect</span>. All rights reserved.
        </p>
        <div className="footer-icons">
          <Link to="/" className="social-icon" aria-label="Facebook"><FaFacebookF /></Link>
          <Link to="/" className="social-icon" aria-label="Twitter"><FaTwitter /></Link>
          <Link to="/" className="social-icon" aria-label="Instagram"><FaInstagram /></Link>
          <Link to="/" className="social-icon" aria-label="LinkedIn"><FaLinkedin /></Link>
        </div>
        <p className="footer-contact">
          Contact: <a href="mailto:support@Careconnect.com">support@Careconnect.com</a> | Phone: +91-9876543210
        </p>
      </div>
    </footer>
  );
};

export default Footer;
