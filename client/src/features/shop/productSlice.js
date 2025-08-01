import axios from "axios";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  productList: [],
}

export const fetchAllFilterdProducts = createAsyncThunk("fetchAllFilterdProducts",
  async () => {
    const response = await axios.get("http://localhost:3001/api/v1/shop/products/get");
    return response.data
  }
)


const shoppingProductSlice = createSlice({
  name: "shoppingProducts",
  initialState,
  reducers: {},
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
  }
}) 


export default shoppingProductSlice.reducer;