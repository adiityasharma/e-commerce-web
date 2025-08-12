import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";



const initialState = {
  isLoading: false,
  orderList: [],
  error: null,
  orderDetails: null
}

export const getAllOrdersForAdmin = createAsyncThunk("getAllOrdersForAdmin",
  async () => {
    try {
      const response = await axios.get(`https://demo-ecommerce-443h.onrender.com/api/v1/admin/orders/get`)

      return response.data;
    } catch (error) {
      console.log(error)
    }
  }
)
export const getOrderDetailsForAdmin = createAsyncThunk("getOrderDetailsForAdmin",
  async (id) => {
    try {
      const response = await axios.get(`https://demo-ecommerce-443h.onrender.com/api/v1/admin/orders/details/${id}`)

      return response.data;
    } catch (error) {
      console.log(error)
    }
  }
)

export const updateOrderStatus = createAsyncThunk("updateOrderStatus",
  async ({id, orderStatus}) => {
    try {
      const response = await axios.put(`https://demo-ecommerce-443h.onrender.com/api/v1/admin/orders/update/${id}`, {orderStatus})

      return response.data;
    } catch (error) {
      console.log(error)
    }
  }
)


const adminOrderSlice = createSlice({
  name: "adminOrderSlice",
  initialState,
  reducers: {
    resetOrderDetails: (state) => {
      state.orderDetails = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllOrdersForAdmin.pending, (state) => {
        state.isLoading = true;
        state.error = null
      })
      .addCase(getAllOrdersForAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderList = action.payload?.data
      })
      .addCase(getAllOrdersForAdmin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message
      })
      .addCase(getOrderDetailsForAdmin.pending, (state) => {
        state.isLoading = true;
        state.error = null
      })
      .addCase(getOrderDetailsForAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderDetails = action.payload?.data
      })
      .addCase(getOrderDetailsForAdmin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message
      })
  }
})

export const { resetOrderDetails } = adminOrderSlice.actions;

export default adminOrderSlice.reducer;