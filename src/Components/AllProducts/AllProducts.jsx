import React, { useState, useEffect } from "react";
import "./AllProducts.css";
import ProductCard from "../ProductCard/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setProducts } from "../../redux/features/ProductSlice";

const AllProducts = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.productSlice);

  // FILTER POPUP STATE
  const [showFilter, setShowFilter] = useState(false);

  const [filters, setFilters] = useState({
    category: "",
    price: 8000,
    color: "",
    size: "",
    style: "",
  });

  const handleFilterChange = (key, value) => {
    setFilters({ ...filters, [key]: value });
  };

  async function getProduct() {
    try {
      let response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/get/products`
      );

      dispatch(setProducts(response.data.product));
    } catch (error) {
      console.log("Error", error);
    }
  }

  useEffect(() => {
    getProduct();
  }, []);

  const filteredProducts = products?.filter((item) => {
    return (
      (!filters.category || item.category === filters.category) &&
      (!filters.color || item.color === filters.color) &&
      (!filters.size || item.size === filters.size) &&
      item.price <= filters.price
    );
  });

  return (
    <div className="all-products">

      {/* MOBILE FILTER BUTTON */}
      <div className="mobile-filter-btn">
        <button onClick={() => setShowFilter(true)}>
          <span class="material-symbols-outlined">
            tune
          </span>
        </button>
      </div>

      {/* FILTER OVERLAY */}
      <div
        className={`filter-overlay ${showFilter ? "active" : ""}`}
        onClick={() => setShowFilter(false)}
      ></div>

      {/* LEFT FILTER */}
      <div className={`left ${showFilter ? "show" : ""}`}>

        {/* CLOSE BUTTON */}
        <div className="filter-top">
          <h3>Filters</h3>

          <button
            className="close-btn"
            onClick={() => setShowFilter(false)}
          >
            ✕
          </button>
        </div>

        {/* Category */}
        <div className="filter-section">
          <h4>Category</h4>

          <p onClick={() => handleFilterChange("category", "tshirt")}>
            T-Shirts
          </p>

          <p onClick={() => handleFilterChange("category", "shorts")}>
            Shorts
          </p>

          <p onClick={() => handleFilterChange("category", "shirt")}>
            Shirts
          </p>

          <p onClick={() => handleFilterChange("category", "hoodie")}>
            Hoodies
          </p>

          <p onClick={() => handleFilterChange("category", "jeans")}>
            Jeans
          </p>
        </div>

        {/* Price */}
        <div className="filter-section">
          <h4>Price</h4>

          <input
            type="range"
            min="0"
            max="8000"
            value={filters.price}
            onChange={(e) =>
              handleFilterChange("price", Number(e.target.value))
            }
          />

          <span>Up to ₹{filters.price}</span>
        </div>

        {/* Color */}
        <div className="filter-section">
          <h4>Color</h4>

          <p onClick={() => handleFilterChange("color", "black")}>
            Black
          </p>

          <p onClick={() => handleFilterChange("color", "blue")}>
            Blue
          </p>

          <p onClick={() => handleFilterChange("color", "red")}>
            Red
          </p>
        </div>

        {/* Size */}
        <div className="filter-section">
          <h4>Size</h4>

          <p onClick={() => handleFilterChange("size", "S")}>
            Small
          </p>

          <p onClick={() => handleFilterChange("size", "M")}>
            Medium
          </p>

          <p onClick={() => handleFilterChange("size", "L")}>
            Large
          </p>

          <p onClick={() => handleFilterChange("size", "XL")}>
            XL
          </p>
        </div>
      </div>

      {/* RIGHT PRODUCTS */}
      <div className="right">
        <ProductCard products={filteredProducts} />
      </div>
    </div>
  );
};

export default AllProducts;