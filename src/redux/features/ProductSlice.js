import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
    name: "productSlice",
    initialState: {
        products:[],
        product: null,
        loading: false,
        error: null
    },
    
    reducers: {
        // SET ALL PRODUCTS
        setProducts: ((state, action)=>{
            state.products = action.payload
            state.loading = false
        }),
    
        setLoading: ((state, action)=>{
            state.loading = action.payload;
        }),
        
        setProduct: ((state, action)=>{
            state.product = action.payload
            state.loading = false
        }),
    
        // 👉 ERROR
        setError: (state, action) => {
          state.error = action.payload;
          state.loading = false;
        }
    }
})

export const {setProducts, setLoading, setProduct, setError} = productSlice.actions
export default productSlice.reducer 