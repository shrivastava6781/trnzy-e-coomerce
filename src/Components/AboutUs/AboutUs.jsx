import React from "react";
import "./AboutUs.css";

const AboutUs = () => {
  return (
    <div className="about-page">
      <div className="header">
          <p className="small-heading">WHO WE ARE</p>
          <h2>
            MORE THAN <span>CLOTHES.</span>
          </h2>
      </div>
      {/* ABOUT CONTENT */}

      <div className="about-content">

        {/* LEFT SIDE */}

        <div className="left-section">

          <div className="image-grid">

            <div className="big-img">
              <img src="/images/mainch1.png" alt="" />
            </div>

            <div className="small-imgs">

              <img src="/images/mainch1.png" alt="" />

              <img src="/images/mainch1.png" alt="" />

            </div>

          </div>

        </div>

        {/* RIGHT SIDE */}

        <div className="right-section">

          <p className="description">
            TRNZY is more than just a streetwear brand —
            it’s a movement built for creators, rebels,
            and individuals who live unapologetically.
          </p>

          <p className="description">
            Inspired by real streets, real culture, and
            real people, every piece we create carries
            attitude, confidence, and expression.
          </p>

          {/* FEATURES */}

          <div className="features">

            <div className="feature-card">
              <h3>🌍 GLOBAL VISION</h3>
              <p>Streetwear for the new generation.</p>
            </div>

            <div className="feature-card">
              <h3>⚡ BOLD DESIGN</h3>
              <p>Designed to stand out everywhere.</p>
            </div>

            <div className="feature-card">
              <h3>👕 PREMIUM QUALITY</h3>
              <p>Comfort with luxury street energy.</p>
            </div>

            <div className="feature-card">
              <h3>🔥 FEARLESS ATTITUDE</h3>
              <p>Wear your story. Own the vibe.</p>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default AboutUs;