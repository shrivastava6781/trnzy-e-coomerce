import React from "react";
import "./productCard.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import commonAPI from "../../API/commonAPI";

const ShimmerCard = () => {
  return (
    <div className="card shimmer">
      <div className="shimmer-img"></div>
      <div className="shimmer-text"></div>
      <div className="shimmer-text small"></div>
      <div className="shimmer-btn"></div>
    </div>
  );
};

const ProductCard = ({ products }) => {
  console.log("qwerewq",products)
  const { favoriteData = [] } = useSelector((state) => state.favoriteSlice);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.user?.id;

  const handleAddToCart = (id) => {
    navigate(`/product/${id}`);
  };

  const handleWishlist = async (e, itemId) => {
    e.preventDefault();
    e.stopPropagation();

    const isFavorite = favoriteData.includes(itemId);

    if (isFavorite) {
      await commonAPI.removeWishlistAPI(dispatch, userId, itemId);
    } else {
      await commonAPI.addWishlistAPI(dispatch, userId, itemId);
    }
  };

  return (
    <div className="product-container">
      {products?.length === 0 ? (
        Array(5)
          .fill("")
          .map((_, index) => <ShimmerCard key={index} />)
      ) : (
        products.map((item) => {
          const isFavorite = favoriteData.some(fav => fav._id === item._id);

          return (
            <div
              className="card"
              onClick={() => handleAddToCart(item._id)}
              key={item._id}
            >
              <span
                className={`favorite ${isFavorite ? "active" : ""}`}
                onClick={(e) => handleWishlist(e, item._id)}
              >
                {isFavorite ? "❤️" : "🤍"}
              </span>

              <img
                src={`https://ecommerce-backend-9rq3.onrender.com/${item.image}`}
                alt={item.name}
              />

              <div className="heading">{item.name}</div>
              <div className="desc">{item.description}</div>

              <div className="price-section">
                <span className="price">
                  ₹{item.price - (item.price * item.discount) / 100}
                </span>
                <span className="old-price">₹{item.price}</span>
                <span className="discount">
                  ({item.discount}% OFF)
                </span>
                <span className="rating">⭐ {item.rating}</span>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default ProductCard;