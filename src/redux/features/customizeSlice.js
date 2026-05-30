// customizeSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  customizeProducts: [],
  customizePrint: [],

  selectedProduct: null,
  selectedColor: null,
  selectedPrint: null,
  uploadedDesign: null,
};

const customizeSlice = createSlice({
  name: "customize",

  initialState,

  reducers: {

    setProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },

    setColor: (state, action) => {
      state.selectedColor = action.payload;
    },

    setPrint: (state, action) => {
      state.selectedPrint = action.payload;
    },

    setUploadedDesign: (state, action) => {
      state.uploadedDesign = action.payload;
    },

    setCustomizeProducts: (state, action) => {
      state.customizeProducts = action.payload;
    },

    setCustomizePrint: (state, action) => {
      state.customizePrint = action.payload;
    },
  },
});

export const {
  setProduct,
  setColor,
  setPrint,
  setUploadedDesign,
  setCustomizeProducts,
  setCustomizePrint,
} = customizeSlice.actions;

export default customizeSlice.reducer;