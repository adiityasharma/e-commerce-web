import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  featureImageList: [],
  error: null
}

export const getFeatureImages = createAsyncThunk("getFeatureImages",
  async () => {
    const response = await axios.get(`http://localhost:3001/api/v1/common/feature/get`);
    return response.data
  }
)

export const addFeatureImages = createAsyncThunk("addFeatureImages",
  async (image) => {
    const response = await axios.post(`http://localhost:3001/api/v1/common/feature/add`, {image});
    return response.data
  }
)

export const deleteFeatureImage = createAsyncThunk("deleteFeatureImage",
  async (id) => {
    const response = await axios.delete(`http://localhost:3001/api/v1/common/feature/delete/${id}`);
    return response.data
  }
)

const featureSlice = createSlice({
  name: "featureSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFeatureImages.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getFeatureImages.fulfilled, (state, action) => {
        state.isLoading = true;
        state.featureImageList = action?.payload?.data
      })
      .addCase(getFeatureImages.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message
      })
  }
})


export default featureSlice.reducer;