import { useNavigate } from "react-router-dom";
import "./HeroBanner.css";

const HeroBanner = () => {
  const navigate = useNavigate()
  return (
    <>
      <div className="hero-banner">

        {/* IMAGE BACKGROUND */}
        <img src="/images/herobanner.png" alt="banner" className="banner-image" />

        {/* CONTENT OVER IMAGE */}
        <div className="banner-content">
          <h1 className="banner-heading">
            FIND CLOTHES THAT MATCHES YOUR STYLE
          </h1>

          <p className="banner-desc">
            Browse through our diverse range of meticulously crafted garments,
            designed to bring out your individuality and cater to your sense of style.
          </p>

          <button className="banner-btn" onClick={()=> navigate("/allproducts")}>
            🛍 Shop Now
          </button>

          <div className="banner-stats">
            <div className="stat">
              <h3>200+</h3>
              <p>International Brands</p>
            </div>

            <div className="stat">
              <h3>2000+</h3>
              <p>High-Quality Products</p>
            </div>

            <div className="stat">
              <h3>30000+</h3>
              <p>Happy Customers</p>
            </div>
          </div>
        </div>

      </div>

      {/* Scroller */}
      <div className="scroller">
        <div className="scroller_in">
          <div className='text'> Arrival Collections, </div>
          <div className='text'> Design Collections, </div>
          {/* <video src="/scrollgif.mp4" loop muted autoPlay playsInline preload="auto"></video> */}
          {/* <img src="/images/desktop-logo.png" alt="" /> */}
          <div className='text '> Printed Designs, </div>
          <div className='text'> Popular Shirts, </div>
        </div>
        <div className="scroller_in">
          <div className='text'> Arrival Collections, </div>
          <div className='text'> Design Collections,</div>
          {/* <video src="/scrollgif.mp4" loop muted autoPlay playsInline preload="auto"></video> */}
          {/* <img src="/images/desktop-logo.png" alt="" /> */}
          <div className='text'> Printed Designs,</div>
          <div className='text'>Popular Shirts,</div>
        </div>
      </div>
    </>
  );
};

export default HeroBanner;