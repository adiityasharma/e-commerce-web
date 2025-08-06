import axios from "axios";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  productList: [],
  productDetails: null,
  error: null
}

export const fetchAllFilterdProducts = createAsyncThunk("fetchAllFilterdProducts",
  async ({ filterParams, sortParams }) => {

    const query = new URLSearchParams({
      ...filterParams,
      sortBy: sortParams
    })

    const response = await axios.get(`http://localhost:3001/api/v1/shop/products/get?${query}`);
    return response.data
  }
)

export const fetchProductDetails = createAsyncThunk("fetchProductDetails", 
  async (id) => {
    const response = await axios.get(`http://localhost:3001/api/v1/shop/products/get/${id}`)
    
    return response.data;
  }
)

const shoppingProductSlice = createSlice({
  name: "shoppingProducts",
  initialState,
  reducers: {
    setProductDetails: (state) => {
      state.productDetails = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllFilterdProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllFilterdProducts.fulfilled, (state, action) => {
        state.isLoading = false
        state.productList = action.payload.data
      })
      .addCase(fetchAllFilterdProducts.rejected, (state) => {
        state.isLoading = false;
        state.productList = []
      })
      .addCase(fetchProductDetails.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productDetails = action.payload.data;
      })
      .addCase(fetchProductDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
    
  }
})


export const { setProductDetails } = shoppingProductSlice.actions;

export default shoppingProductSlice.reducer;