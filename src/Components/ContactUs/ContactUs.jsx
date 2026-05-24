import React from "react";
import "./ContactUs.css";

const ContactUs = () => {
  return (
    <div className="contact-page">
        <div className="header">
          <p className="small-heading">GET IN TOUCH</p>
          <h2>
            MORE THAN A <span>BRAND.</span>
          </h2>
        </div>
      <div className="contact-info-section">

        {/* LEFT IMAGE */}
        <div className="left-image">
          <img src="/images/signin.png" alt="" />
        </div>

        {/* RIGHT CONTENT */}
        <div className="right-content">
          <p className="description">
            TRNZY is built for creators, dreamers, and people
            who live unapologetically. Whether you want to
            collaborate, ask about products, or just connect —
            we’re here.
          </p>

          {/* TAGS */}

          <div className="tags">

            <div className="tag">
              <span>⚡</span>
              FAST SUPPORT
            </div>

            <div className="tag">
              <span>🌍</span>
              GLOBAL SHIPPING
            </div>

            <div className="tag">
              <span>🔥</span>
              STREET CULTURE
            </div>

            <div className="tag">
              <span>👕</span>
              PREMIUM QUALITY
            </div>

          </div>

          {/* CONTACT FORM */}

          <form className="contact-form">

            <input type="text" placeholder="Your Name" />

            <input type="email" placeholder="Your Email" />

            <textarea
              placeholder="Write Your Message..."
            ></textarea>

            <button type="submit">
              SEND MESSAGE
            </button>

          </form>

        </div>
      </div>
    </div>
  );
};

export default ContactUs;