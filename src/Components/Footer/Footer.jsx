import React from "react";
import { NavLink } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">

      {/* 🔥 Newsletter */}
        <div className="newsletter">
          <div className="newsletterheading">
            <div>
                  STAY UPTO DATE ABOUT <br />
                  OUR LATEST OFFERS
            </div>
          </div>
          <div className="newsletter-box">
            <input type="email" placeholder="Enter your email" />
            <button>Subscribe</button>
          </div>
        </div>

      {/* 🔥 TOP SECTION */}
      <div className="footer-top">

        {/* Company Info */}
        <div className="footer-col">
          <h2 className="company-name">Trendzy</h2>
          <p className="footer-desc">
            We have clothes that suit your style and which you’re proud to wear.
            From women to men.
          </p>

          <div className="social-link">
            <i className="bi bi-twitter-x"></i>
            <i className="bi bi-instagram"></i>
            <i className="bi bi-facebook"></i>
            <i className="bi bi-youtube"></i>
          </div>
        </div>

        {/* Company */}
        <div className="footer-col">
          <h3 className="footer-heading">Company</h3>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/aboutUs">About Us</NavLink>
          <NavLink to="/contactUs">Contact</NavLink>
          <NavLink to="/Home">Careers</NavLink>
        </div>

        {/* Support */}
        <div className="footer-col">
          <h3 className="footer-heading">Support</h3>
          <NavLink to="/aboutUs">FAQ</NavLink>
          <NavLink to="/aboutUs">Shipping</NavLink>
          <NavLink to="/aboutUs">Returns</NavLink>
          <NavLink to="/contactUs">Privacy Policy</NavLink>
        </div>

        {/* Shop */}
        <div className="footer-col">
          <h3 className="footer-heading">Shop</h3>
          <NavLink to="/allproducts">Men</NavLink>
          <NavLink to="/allproducts">Women</NavLink>
          <NavLink to="/allproducts">Accessories</NavLink>
          <NavLink to="/allproducts">Sale</NavLink>
        </div>

        {/* Contact */}
        <div className="footer-col">
          <h3 className="footer-heading">Contact</h3>
          <p><i className="bi bi-telephone"></i> +91 9876543210</p>
          <p><i className="bi bi-envelope"></i> trendzy@gmail.com</p>
          <p><i className="bi bi-geo-alt"></i> MP, India</p>
        </div>

      </div>

      {/* 🔥 BOTTOM */}
      <div className="footer-bottom">
        <p>© 2025 Trendzy. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;