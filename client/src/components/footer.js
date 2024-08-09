import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} Recipe Haven. All Rights Reserved.</p>
        <p>
          <a href="/privacy-policy">Privacy Policy</a> | <a href="/terms">Terms of Service</a>
        </p>
        <Link to="/customer-support">
          <button className="support-button">Customer Support</button>
        </Link>
      </div>
    </footer>
  );
}

export default Footer;
