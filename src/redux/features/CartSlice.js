import { createSlice } from "@reduxjs/toolkit";

const CartSlice = createSlice({
    name: "Cart",

    initialState:{
        cartItems: [],
        loading: false
    },
    reducers:{
        setCartItems: ((state, action)=>{
            state.cartItems = action.payload,
            state.loading = false
        }),

        setLoading: ((state, action)=>{
            state.loading = action.payload
        }),

        // updateQuantity: ((state, action)=>{
        //     const { productId, quantity } = action.payload;
        //     const item = state.cartItems.find((item)=> item.productId == productId)
        //     if(item){
        //         item.quantity = quantity
        //     }
        // }),

        // removeCartItem: (state, action) => {
        //     state.cartItems = state.cartItems.filter(
        //         (item) => item.productId !== action.payload
        //     );
        // },

        // 👉 clear cart (after order)
        clearCart: (state) => {
            state.cartItems = [];
        },

    }
    
})
export const {
  setCartLoading,
  setCartItems,
  updateQuantity,
  removeCartItem,
  clearCart,
  setCartError,
} = CartSlice.actions;

export default CartSlice.reducer;