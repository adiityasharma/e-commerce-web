import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
  approvalURL: null,
  isLoading: false,
  orderId: null,
  error: null
}

export const createNewOrder = createAsyncThunk("createNewOrder",
  async (orderData) => {
    const response = await axios.post("http://localhost:3001/api/v1/shop/order/create", orderData)

    return response.data;
  }
)


const shoppingOrderSlice = createSlice({
  name: "shoppingOrderSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createNewOrder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createNewOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.approvalURL = action.payload.approvalURL;
        state.orderId = action.payload.orderId
      })
      .addCase(createNewOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message
      })
  }
})


export default shoppingOrderSlice.reducer;