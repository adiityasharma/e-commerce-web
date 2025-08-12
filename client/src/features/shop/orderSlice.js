import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
  approvalURL: null,
  isLoading: false,
  orderId: null,
  error: null,
  orderList: [],
  orderDetails: null
}

export const createNewOrder = createAsyncThunk("createNewOrder",
  async (orderData) => {
    try {
      const response = await axios.post("https://demo-ecommerce-443h.onrender.com/api/v1/shop/order/create", orderData)

      return response.data;
    } catch (error) {
      console.log(error)
    }
  }
)

export const capturePayment = createAsyncThunk("capturePayment",
  async ({ paymentId, payerId, orderId }) => {
    try {
      const response = await axios.post("https://demo-ecommerce-443h.onrender.com/api/v1/shop/order/capture", { paymentId, payerId, orderId })

      return response.data;
    } catch (error) {
      console.log(error)
    }
  }
)
export const getAllOrdersByUser = createAsyncThunk("getAllOrdersByUser",
  async (userId) => {
    try {
      const response = await axios.get(`https://demo-ecommerce-443h.onrender.com/api/v1/shop/order/list/${userId}`)

      return response.data;
    } catch (error) {
      console.log(error)
    }
  }
)
export const getOrderDetails = createAsyncThunk("getOrderDetails",
  async (id) => {
    try {
      const response = await axios.get(`https://demo-ecommerce-443h.onrender.com/api/v1/shop/order/details/${id}`)

      return response.data;
    } catch (error) {
      console.log(error)
    }
  }
)


const shoppingOrderSlice = createSlice({
  name: "shoppingOrderSlice",
  initialState,
  reducers: {
    resetOrderDetails: (state) => {
      state.orderDetails = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createNewOrder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createNewOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.approvalURL = action.payload?.approvalURL;
        state.orderId = action.payload?.orderId
        sessionStorage.setItem("currentOrderId", JSON.stringify(action.payload?.orderId))
      })
      .addCase(createNewOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message
      })
      .addCase(getAllOrdersByUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllOrdersByUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderList = action.payload?.data;
      })
      .addCase(getAllOrdersByUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message
      })
      .addCase(getOrderDetails.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getOrderDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderDetails = action.payload?.data;
      })
      .addCase(getOrderDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message
      })
  }
})

export const { resetOrderDetails } = shoppingOrderSlice.actions;

export default shoppingOrderSlice.reducer;