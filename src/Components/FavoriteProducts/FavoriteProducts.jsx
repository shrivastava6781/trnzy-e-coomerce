import React, { useEffect } from "react";
import "./FavoriteProducts.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../ProductCard/ProductCard";
import { setFavoriteData } from "../../redux/features/favoriteSlice";
import commonAPI from "../../API/commonAPI";

const FavoriteProducts = () => {
  const dispatch = useDispatch();

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.user?.id;

  const { favoriteData = [] } = useSelector(
    (state) => state.favoriteSlice
  );

  useEffect(() => {
    if (userId) {
      commonAPI.getFavoriteProduct(dispatch, userId);
    }
  }, [userId]); // ✅ FIXED

  return (
    <div className="favorite-container">
      <h2 className="title">Favorite List</h2>

      {favoriteData.length === 0 ? (
        <p className="empty">No favorite products yet 🤍</p>
      ) : (
        <ProductCard products={favoriteData} />
      )}
    </div>
  );
};

export default FavoriteProducts;