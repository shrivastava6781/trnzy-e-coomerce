import axios from "axios";
import React, { useRef, useState } from "react";
import "./AddProduct.css";

const AddProduct = ({ setAddProduct }) => {
  const imageRef = useRef(null);

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    discount: "",
    rating: "",
    image: null,
  });

  const [loading, setLoading] = useState(false);

  // Handle Input Change
  function handleChange(e) {
    const { name, value, files } = e.target;

    if (name === "image") {
      setForm((prev) => ({
        ...prev,
        image: files[0],
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  }

  // Submit Form
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setLoading(true);

      const formData = new FormData();

      Object.keys(form).forEach((key) => {
        formData.append(key, form[key]);
      });

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/products`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response.data);

      alert("Product Added Successfully ✅");

      // Reset Form
      setForm({
        name: "",
        description: "",
        price: "",
        discount: "",
        rating: "",
        image: null,
      });

      if (imageRef.current) {
        imageRef.current.value = "";
      }
    } catch (error) {
      console.log(error);
      alert("Error Adding Product ❌");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="add-product-overlay">
      <div className="add-product-card">

        {/* Header */}
        <div className="header-title">
          <h2>Add Product</h2>

          <span
            className="close-btn"
            onClick={() => setAddProduct(false)}
          >
            ✖
          </span>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <label>Product Name</label>

            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter product name"
              required
            />
          </div>

          <div className="form-group">
            <label>Description</label>

            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Enter product description"
              rows="4"
              required
            />
          </div>

          <div className="form-group">
            <label>Price</label>

            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              placeholder="Enter product price"
              required
            />
          </div>

          <div className="form-group">
            <label>Discount (%)</label>

            <input
              type="number"
              name="discount"
              value={form.discount}
              onChange={handleChange}
              placeholder="Enter discount"
            />
          </div>

          <div className="form-group">
            <label>Rating</label>

            <input
              type="number"
              step="0.1"
              max="5"
              min="0"
              name="rating"
              value={form.rating}
              onChange={handleChange}
              placeholder="Enter rating"
            />
          </div>

          <div className="form-group">
            <label>Product Image</label>

            <input
              ref={imageRef}
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="submit-btn"
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Product"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default AddProduct;