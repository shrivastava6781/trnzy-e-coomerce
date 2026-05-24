import React, { useEffect, useState } from "react";
import "./NewArrival.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../../redux/features/ProductSlice";
import ProductCard from "../ProductCard/ProductCard";

const NewArrival = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {products} = useSelector((state)=> state.productSlice)
  
  async function getProduct(){
    try {
      let response = await axios.get("http://localhost:5000/api/get/products")
      console.log(response.data)
      dispatch(setProducts(response.data.product))
    } 
    catch (error) {
      console.log("Error",error)
    }
  }

  // simulate API
  useEffect(() => {
    getProduct()
  }, []);

  return (
    <div className="new-arrival">
      <h2 className="title">New Arrivals</h2>
      <ProductCard products={products} />

      <button className="showmore-btn" onClick={()=> navigate("/allproducts")}>
        Show More
      </button>
    </div>
  );
};

export default NewArrival;