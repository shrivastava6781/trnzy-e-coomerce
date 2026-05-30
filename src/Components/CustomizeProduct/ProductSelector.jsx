// ProductSelector.jsx

import axios from "axios";
import React, { useEffect } from "react";
import "./ProductSelector.css";
import { useDispatch, useSelector } from "react-redux";
import { setCustomizeProducts } from "../../redux/features/customizeSlice";

const ProductSelector = ({ selectedProduct, setSelectedProduct }) => {

  const dispatch = useDispatch();
  const { customizeProducts } = useSelector( (state) => state.customize );

  async function getProducts() {
    try {
      let response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/get/products`);
      const clothProducts = response.data.product.filter(
        (item) => item.type == "cloth"
      );

      dispatch( setCustomizeProducts(clothProducts) );
    } 
    catch (error) {
      console.log("Error", error);
    }
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="product-selector">
      <h2 className="selector-title"> Choose Product</h2>
      <div className="product-grid">
        {customizeProducts.map((item) => (
          <div
            key={item._id}
            className={`product-card ${
              selectedProduct?._id == item._id
                ? 
                  "active-product"
                : 
                  ""
            }`}
            onClick={() => setSelectedProduct(item)}
          >
            <img
              src={`${import.meta.env.VITE_BACKEND_URL}/${item.image}`}
              alt={item.name}
            />
            <div className="title">{item.name}</div>
            <div className="price-section">
              <span className="price">
                ₹{item.price - (item.price * item.discount) / 100}
              </span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default ProductSelector;