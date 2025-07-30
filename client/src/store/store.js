import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice.js"
import adminProductSlice from "../features/admin/productSlice/productSlice.js"


export const store = configureStore({
  reducer: {
    auth: authReducer,
    adminProducts: adminProductSlice,
  }
})

export default store;
