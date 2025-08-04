import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
  cartItems: [],
  isLoading: false,
  error: null
}

export const addToCart = createAsyncThunk("addToCart",
  async ({ userId, productId, quantity }) => {
    const response = await axios.post("http:/localhost:3001/api/v1/shop/cart/add", { userId, productId, quantity })

    return response.data;
  }
)
export const fetchCartItems = createAsyncThunk("fetchCartItems",
  async (userId) => {
    const response = await axios.get(`http:/localhost:3001/api/v1/shop/cart/get/${userId}`)

    return response.data;
  }
)
export const deleteCartItem = createAsyncThunk("deleteCartItem",
  async ({ userId, productId }) => {
    const response = await axios.delete(`http:/localhost:3001/api/v1/shop/cart/delete/${userId}/${productId}`)

    return response.data;
  }
)
export const updateCartQuantity = createAsyncThunk("updateCartQuantity",
  async ({ userId, productId, quantity }) => {
    const response = await axios.put("http:/localhost:3001/api/v1/shop/cart/update-cart", { userId, productId, quantity })

    return response.data;
  }
)



const shoppingCartSlice = createSlice({
  name: "shoppingCart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (state) => {
        state.isLoading = true;
        state.error = null
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload
      })
      .addCase(fetchCartItems.pending, (state) => {
        state.isLoading = true;
        state.error = null
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data
      })
      .addCase(fetchCartItems.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload
      })
      .addCase(updateCartQuantity.pending, (state) => {
        state.isLoading = true;
        state.error = null
      })
      .addCase(updateCartQuantity.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data
      })
      .addCase(updateCartQuantity.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload
      })
      .addCase(deleteCartItem.pending, (state) => {
        state.isLoading = true;
        state.error = null
      })
      .addCase(deleteCartItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data
      })
      .addCase(deleteCartItem.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload
      })

  }
})

export default shoppingCartSlice.reducer;