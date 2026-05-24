import axios from "axios";
import { setCartItems } from "../redux/features/CartSlice";
import { setAddToFavorite, setFavoriteData, setRemoveToFavorite } from "../redux/features/favoriteSlice";

const fetchCart = async (dispatch, userId) => {
    try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/cart/${userId}`);
        dispatch(setCartItems(res.data.cartData?.items || []))
    } 
    catch (err) {
        console.error("Failed to fetch cart", err);
    }
};

const addWishlistAPI = async (dispatch, userId, id) => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/addFavorite`,
      { userId, id }
    );

    dispatch(setAddToFavorite(res.data.wishlist.products || []));
  } catch (err) {
    console.error("Failed to add favorite", err);
  }
};

const removeWishlistAPI = async (dispatch, userId, id) => {
  try {
    const res = await axios.delete(
      `${import.meta.env.VITE_BACKEND_URL}/api/removeFavorite`,
      {
        data: { userId, id }, // ✅ FIXED
      }
    );

    dispatch(setRemoveToFavorite(res.data.wishlist.products || []));
  } catch (err) {
    console.error("Failed to remove favorite", err);
  }
};

const getFavoriteProduct = async (dispatch, userId) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/get/favorite/${userId}` // ✅ FIXED
    );

    console.log("product", response.data.wishlist.products);

    dispatch(
      setFavoriteData(response.data.wishlist.products || [])
    );
  } catch (error) {
    console.log("Error", error);
  }
};


const commonAPI = {
    fetchCart,
    addWishlistAPI,
    removeWishlistAPI,
    getFavoriteProduct
}

export default commonAPI;