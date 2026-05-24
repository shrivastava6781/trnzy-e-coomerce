import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth"
import productReducer from "./features/ProductSlice"
import CartReducer from "./features/CartSlice"
import OrderReducer from "./features/OrderSlice"
import favoriteReducer from "./features/favoriteSlice"

const store = configureStore({
    reducer:{
        auth : authReducer,
        productSlice: productReducer,
        cartSlice: CartReducer,
        orderSlice: OrderReducer,
        favoriteSlice: favoriteReducer
    }
})

export default store