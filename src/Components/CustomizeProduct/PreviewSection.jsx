import React, { useState, useRef} from "react";
import axios from "axios";
import html2canvas from "html2canvas";
import {useNavigate,} from "react-router-dom";
import "./PreviewSection.css";

const PreviewSection = ({ selectedProduct, selectedDesign }) => {

  const navigate = useNavigate();
  const previewRef = useRef(null);
  const [position, setPosition] = useState({ x: 50, y: 45 });
  const [size, setSize] = useState(140);
  const [rotation, setRotation] = useState(0);
  const [dragging, setDragging] = useState(false);

  const productPrice = selectedProduct?.price || 0;
  const designPrice = selectedDesign?.price || 0;
  const productDiscount = selectedProduct?.discount || 0;
  const designDiscount = selectedDesign?.discount || 0;
  const totalPrice = productPrice + designPrice;
  const totalDiscount = productDiscount + designDiscount;
  const finalPrice = totalPrice - (totalPrice * totalDiscount) / 100;

  const handleMouseDown = () => {
    setDragging(true);
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!dragging) 
      return;

    const container = previewRef.current;
    const rect = container.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setPosition({ x, y });
  };

  const handleDownload = async () => {
    try {
      const canvas = await html2canvas(
        previewRef.current,
          {
            scale: 2,
            useCORS: true,
          }
        );

      const image = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = image;
      link.download = "custom-tshirt.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

    } 
    catch (error) {
      console.log(error);
    }
  };

  const handleAddToCart = async () => {

    const user = JSON.parse(localStorage.getItem("user"));

    if (!user || !user.token) {
      alert("Login first");
      navigate("/login");
      return;
    }

    try {
      const canvas = await html2canvas(
          previewRef.current,
          {
            scale: 1,
            useCORS: true,
          }
        );

      const previewImage = canvas.toDataURL( "image/webp", 0.6 );

      const payload = {
        productType: "custom",
        quantity: 1,
        name:`${selectedProduct.name} Custom`,
        price: finalPrice,
        image: selectedProduct.image,
        baseProductId: selectedProduct._id,
        printDesignId: selectedDesign._id,
        previewImage,
        designConfig: { x: position.x, y: position.y, width: size, rotation },
        printPosition:"front",
        size: "M",
        color: "White",
      };
      console.log( "PAYLOAD", payload);
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/add/cart/${user.user.id}`,payload,
        {
          headers: {
            Authorization:
              `Bearer ${user.token}`,
          },
        }
      );
      navigate("/cart");
    } 
    catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="preview-section">
      <div className="preview-header">
        <h2 className="preview-title">Live Preview</h2>
      </div>
      <div className="preview-product">  
        <div
          ref={previewRef}
          className="preview-container"
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {
            selectedProduct 
            ? 
              <img
                src={`${import.meta.env.VITE_BACKEND_URL}/${selectedProduct.image}`}
                alt="product"
                className="preview-product"
              />
            : 
              <div className="empty-preview">Select Product</div>
          }
          {
            selectedDesign 
            &&
            <img
              src={`${import.meta.env.VITE_BACKEND_URL}/${selectedDesign.image}`}
              alt="design"
              draggable={false}
              onMouseDown={handleMouseDown}
              className="preview-design"
              style={{
                left:`${position.x}%`,
                top:`${position.y}%`,
                width:`${size}px`,
                transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
              }}
            />
          }
        </div>
        <div>
          {
            selectedProduct 
            && 
            <div className="preview-details">
              <div className="preview-product-info">
                <img
                  src={`${import.meta.env.VITE_BACKEND_URL}/${selectedProduct.image}`}
                  alt="product"
                  className="preview-product-thumb"
                />
                <div>
                  <h3>{selectedProduct.name}</h3>
                  <p>₹{productPrice}</p>
                </div>
              </div>

              {
                selectedDesign 
                && 
                <div className="preview-design-info">
                  <img
                    src={`${import.meta.env.VITE_BACKEND_URL}/${selectedDesign.image}`}
                    alt="design"
                    className="preview-design-thumb"
                  />
                  <div>
                  <h3>Sticker</h3>
                  <p>₹{designPrice}</p>
                  </div>
                </div>
              }
              <div className="preview-total">
                <span>Total</span>
                <h2>₹{finalPrice}</h2>
              </div>
            </div>
          }
          {
            selectedDesign 
            && 
            <div className="design-controls">
              <div className="control-box">
                <span className="range-text">Size</span>
                <input
                  type="range"
                  min="20"
                  max="300"
                  value={size}
                  onChange={(e) => setSize(Number(e.target.value))}
                  className="size-range"
                />
              </div>

              <div className="control-box">
                <span className="range-text">Rotate</span>
                <input
                  type="range"
                  min="-180"
                  max="180"
                  step="1"
                  value={rotation}
                  onChange={(e) => setRotation(Number(e.target.value))}
                  className="size-range"
                />
                <span className="rotate-value">{rotation}°</span>
              </div>
            </div>
          }
        </div>
      </div>

      <div className="preview-actions">
        <button className="cart-btn" onClick={handleDownload}>Download</button>
        <button className="cart-btn" onClick={handleAddToCart}>Add To Cart ₹ {finalPrice}</button>
      </div>
    </div>
  );
};

export default PreviewSection;