import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice.js"
import adminProductSlice from "../features/admin/productSlice/productSlice.js"
import adminOrderSlice from "../features/admin/orderSlice.js"

import shoppingProductSlice from "../features/shop/productSlice.js"
import shopCartSlice from "../features/shop/cartSlice.js"
import shopAddressSlice from "../features/address/address.slice.js"
import shopOrderSlice from "../features/shop/orderSlice.js"
import shopSearchSlice from "../features/shop/searchSlice.js"
import shopReviewSlice from "../features/shop/reviewSlice.js"
import commonFeatureSlice from "../features/common-slice/featureSlice.js"

export const store = configureStore({
  reducer: {
    auth: authReducer,

    adminProducts: adminProductSlice,
    adminOrder: adminOrderSlice,

    shopProducts: shoppingProductSlice,
    shopCart: shopCartSlice,
    shopAddress: shopAddressSlice,
    shopOrder: shopOrderSlice,
    shopSearch: shopSearchSlice,
    shopReview: shopReviewSlice,
    commonFeature: commonFeatureSlice
  }
})

export default store;
