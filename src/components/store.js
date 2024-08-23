import { configureStore } from "@reduxjs/toolkit";
import infiniteReducer from "./actionslice"

const store=configureStore({
    reducer:{
        infiniteScrollContent:infiniteReducer
    }
})
export default store;