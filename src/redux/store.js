import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth"
import productReducer from "./features/ProductSlice"
import CartReducer from "./features/CartSlice"
import OrderReducer from "./features/OrderSlice"
import favoriteReducer from "./features/favoriteSlice"
import customizeReducer from "./features/customizeSlice"

const store = configureStore({
    reducer:{
        auth : authReducer,
        productSlice: productReducer,
        cartSlice: CartReducer,
        orderSlice: OrderReducer,
        favoriteSlice: favoriteReducer,
        customize: customizeReducer,
    }
})

export default store