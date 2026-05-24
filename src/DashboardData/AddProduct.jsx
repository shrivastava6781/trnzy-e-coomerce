import axios from "axios";
import React, { useRef, useState } from "react";
import "./AddProduct.css";

const AddProduct = ({ setAddProduct }) => {
  const [form, setForm] = useState({
    name: "",
    price: "",
    discount: "",
    rating: "",
    description: "",
    image: null,
  });
  const imageRef = useRef(null)

  function handleChange(e) {
    const { name, value } = e.target;
    if(name == "image"){
        console.log(e.target.files, e.target.files[0])
        setForm((prev)=>({
            ...prev,
            [name] : e.target.files[0]
        }))
    }
    else{
        setForm((prev)=>({
            ...prev,
            [name] : value
        }))
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();

    for (let key in form) {
        formData.append(key, form[key]);
    }

    try {
      const response = await axios.post(
        "https://ecommerce-backend-9rq3.onrender.com/api/products", // FIXED PORT
        formData
      );

      console.log("Response", response.data);

      alert("Product Added Successfully ✅");

      setForm({
        name: "",
        price: "",
        discount: "",
        rating: "",
        description: "",
        image: null,
      });
      if(imageRef.current){
        imageRef.current.value = null
      }
    } 
    catch (error) {
      console.log("Error", error);
      alert("Error adding product ❌");
    }
  }

  function handleBack() {
    setAddProduct(false);
  }

  return (
    <div className="add-product-overlay">
      <div className="add-product-card">
        
        <div className="header">
          <h2>Add Product</h2>
          <span className="close-btn" onClick={handleBack}>❌</span>
        </div>

        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <label>Name</label>
            <input type="text" name="name" value={form.name} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Description</label>
            <input type="text" name="description" value={form.description} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Price</label>
            <input type="number" name="price" value={form.price} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Discount (%)</label>
            <input type="number" name="discount" value={form.discount} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Rating</label>
            <input type="number" step="0.1" name="rating" value={form.rating} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Image URL</label>
            <input ref={imageRef} type="file" name="image" onChange={handleChange} />
          </div>

          <button type="submit" className="submit-btn">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;