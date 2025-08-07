import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
  isLoading: false,
  addressList: [],
  error: null
}


export const addNewAddress = createAsyncThunk("addNewAddress",
  async (formData) => {
    const response = await axios.post("http://localhost:3001/api/v1/shop/address/add", formData);

    return response.data;
  }
)
export const fetchAllAddress = createAsyncThunk("fetchAllAddress",
  async (userId) => {
    const response = await axios.get(`http://localhost:3001/api/v1/shop/address/get/${userId}`);

    return response.data;
  }
)
export const deleteAddress = createAsyncThunk("deleteAddress",
  async ({ userId, addressId }) => {
    const response = await axios.post(`http://localhost:3001/api/v1/shop/address/delete/${userId}/${addressId}`);

    return response.data;
  }
)
export const editAddress = createAsyncThunk("editAddress",
  async ({ userId, addressId, formData }) => {
    const response = await axios.put(`http://localhost:3001/api/v1/shop/address/update/${userId}/${addressId}`, formData);

    return response.data;
  }
)

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addNewAddress.pending, (state) => {
        state.isLoading = true;
        state.error = null
      })
      .addCase(addNewAddress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.addressList = action.payload.data;
      })
      .addCase(addNewAddress.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message
        state.addressList = []
      })
      .addCase(fetchAllAddress.pending, (state) => {
        state.isLoading = true;
        state.error = null
      })
      .addCase(fetchAllAddress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.addressList = action.payload.data;
      })
      .addCase(fetchAllAddress.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message
        state.addressList = []
      })
      .addCase(editAddress.pending, (state) => {
        state.isLoading = true;
        state.error = null
      })
      .addCase(editAddress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.addressList = action.payload.data;
      })
      .addCase(editAddress.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message
        state.addressList = []
      })
      .addCase(deleteAddress.pending, (state) => {
        state.isLoading = true;
        state.error = null
      })
      .addCase(deleteAddress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.addressList = action.payload.data;
      })
      .addCase(deleteAddress.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message
        state.addressList = []
      })

  }
})

export default addressSlice.reducer;