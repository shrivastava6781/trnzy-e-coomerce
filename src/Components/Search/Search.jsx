import React, { useEffect } from "react";
import "./search.css";
import ProductCard from "../ProductCard/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setProducts } from "../../redux/features/ProductSlice";
import { useLocation } from "react-router-dom";

const Search = () => {
  const dispatch = useDispatch();

  const { products } = useSelector(
    (state) => state.productSlice
  );

  // ✅ GET QUERY FROM URL
  const location = useLocation();

  const query = new URLSearchParams(location.search).get(
    "query"
  );

  async function getProduct() {
    try {
      let response = await axios.get(
        "http://localhost:5000/api/get/products"
      );

      dispatch(setProducts(response.data.product));
    } catch (error) {
      console.log("Error", error);
    }
  }

  useEffect(() => {
    getProduct();
  }, []);

  // ✅ FILTER PRODUCTS
  const filteredProducts = products?.filter((item) =>
    item.name.toLowerCase().includes(query?.toLowerCase())
  );

  return (
    <div className="search-container">
        {
            !filteredProducts?.length > 0
            &&
            <h2 className="search-heading">
                Search Results for "{query}"
            </h2>
        }

      <div className="search-product">
        {
          filteredProducts?.length > 0 ? (
            <ProductCard products={filteredProducts} />
          ) : (
            <h3>No Products Found</h3>
          )
        }
      </div>

    </div>
  );
};

export default Search;