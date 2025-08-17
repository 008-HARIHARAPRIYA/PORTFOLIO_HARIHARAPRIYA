import React from 'react';
import '../styles/Footer.css';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="custom-footer">
      <div className="footer-content">
        <div className="footer-left">
          CONTACT ME:
        </div>
        <div className="footer-right">
          <div className="contact-info">
            <p><strong>Call:</strong> 9790502928</p>
            <p><strong>Email:</strong> <a href="hariharapriya73@gmail.com">hariharapriya73@gmail.com</a></p>
            <div className="social-icons">
              <a href="https://www.linkedin.com/in/hariharapriya-r-s-9880a72b1"><FaLinkedinIn /></a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
