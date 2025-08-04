import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice.js"
import adminProductSlice from "../features/admin/productSlice/productSlice.js"
import shoppingProductSlice from "../features/shop/productSlice.js"
import shopCartSlice from "../features/shop/cartSlice.js"


export const store = configureStore({
  reducer: {
    auth: authReducer,
    adminProducts: adminProductSlice,
    shopProducts: shoppingProductSlice,
    shopCart: shopCartSlice
  }
})

export default store;
