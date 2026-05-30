import React, { useEffect, useState } from "react";
import "./topSelling.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../../redux/features/ProductSlice";
import ProductCard from "../ProductCard/ProductCard";

const TopSelling = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {products} = useSelector((state)=> state.productSlice)
  
  async function getProduct(){
    try {
      let response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/get/products`)
      const printProducts = response.data.product.filter(
        (item) => item.type !== "print"
      );
       console.log("lkjhgfdsa:-",printProducts)
       
      dispatch(setProducts(printProducts))
    } 
    catch (error) {
      console.log("Error",error)
    }
  }

  function handleAddToCart(id){
    console.log("e",id)
    navigate(`/product/${id}`)
  }

  // simulate API
  useEffect(() => {
    getProduct()
  }, []);

  return (
    <div className="top-selling">
      <h2 className="title">Top Selling</h2>
      <ProductCard products={products} />

      <button className="showmore-btn" onClick={()=> navigate("/allproducts")}>
        Show More
      </button>
    </div>
  );
};

export default TopSelling;