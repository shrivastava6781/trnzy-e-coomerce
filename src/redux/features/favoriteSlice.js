import { createSlice } from "@reduxjs/toolkit";

const favoriteSlice = createSlice({
  name: "favorite",
  initialState: {
    favoriteData: [],
  },
  reducers: {
    setFavoriteData: (state, action) => {
      state.favoriteData = action.payload;
    },

    setAddToFavorite: (state, action) => {
      // API already returns full updated wishlist
      state.favoriteData = action.payload;
    },

    setRemoveToFavorite: (state, action) => {
      // same here
      state.favoriteData = action.payload;
    },
  },
});
export const {setFavoriteData, setAddToFavorite, setRemoveToFavorite} = favoriteSlice.actions;
export default favoriteSlice.reducer