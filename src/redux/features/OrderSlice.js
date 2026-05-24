import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: [],
  latestOrder: null,
  loading: false,
  error: null,
};

const OrderSlice = createSlice({
  name: "Order",
  initialState,
  reducers: {

    // 👉 loading
    setOrderLoading: (state) => {
      state.loading = true;
    },

    // 👉 set all orders
    setOrders: (state, action) => {
      state.orders = action.payload;
      state.loading = false;
    },

    // 👉 latest order
    setLatestOrder: (state, action) => {
      state.latestOrder = action.payload;
      state.loading = false;
    },

    // 👉 add new order
    addOrder: (state, action) => {
      state.orders.unshift(action.payload);
      state.latestOrder = action.payload;
    },

    // 👉 error
    setOrderError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  setOrderLoading,
  setOrders,
  setLatestOrder,
  addOrder,
  setOrderError,
} = OrderSlice.actions;

export default OrderSlice.reducer;