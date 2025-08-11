import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
  isLoading: false,
  reviews: [],
  error: null
}

export const addReview = createAsyncThunk("addReview",
  async ({ productId, userId, username, reviewMessage ,reviewValue }) => {
    try {
      const response = await axios.post(`http://localhost:3001/api/v1/shop/review/add`, { productId, userId, username, reviewMessage, reviewValue })

      return response.data;
    } catch (error) {
      console.log(error)
    }
  }
)
export const getReviews = createAsyncThunk("getReviews",
  async (id) => {
    try {
      const response = await axios.get(`http://localhost:3001/api/v1/shop/review/${id}`)

      return response.data;
    } catch (error) {
      console.log(error)
    }
  }
)


const reviewSlice = createSlice({
  name: "reviewSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getReviews.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(getReviews.fulfilled, (state, action) => {
        state.isLoading = false
        state.reviews = action.payload?.data
      })
      .addCase(getReviews.rejected, (state, action) => {
        state.isLoading = false;
        state.reviews = []
        state.error = action.payload
      })
  }
})


export default reviewSlice.reducer; 