import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState:{
        user: JSON.parse(localStorage.getItem("user")) || null,
        isAuthenticated: false,
    },
    reducers:{
        login: ((state, action)=>{
            state.user = action.payload
            state.isAuthenticated = true;
            // store in localStorage
            localStorage.setItem("user", JSON.stringify(action.payload));

        }),
        signin: ((state, action)=>{
            state.user = action.payload

        }),
        logout: ((state, action)=>{
            state.user = null
            state.isAuthenticated = false;
            // store in localStorage
            localStorage.removeItem("user");
        })
    }
})

export const {login, signin, logout} = authSlice.actions
export default authSlice.reducer