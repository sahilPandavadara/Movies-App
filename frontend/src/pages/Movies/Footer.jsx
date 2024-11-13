import React from "react";
import "../../CSS/Footer.css";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaGithub,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-logo">
        <img src="logo.png" alt="Logo" className="logo" />
        <h2>SCENE</h2>
      </div>
      <div className="footer-links">
        <div className="footer-column">
          <h3>Quick Links</h3>
          <ul>
            <li>Home</li>
            <li>About</li>
            <li>For You</li>
            <li>Profile</li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>Need Help?</h3>
          <ul>
            <li>Visit Help Center</li>
            <li>Share Feedback</li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>Community</h3>
          <div className="social-icons">
            <FaFacebookF />
            <FaTwitter />
            <FaInstagram />
            <FaLinkedinIn />
            <FaGithub />
          </div>
        </div>
      </div>
      <div className="back-to-top">
        <button>↑</button>
      </div>
    </footer>
  );
};

export default Footer;
