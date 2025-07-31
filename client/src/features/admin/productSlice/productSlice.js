import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
  isLoading: false,
  productList: []
}

export const addNewProduct = createAsyncThunk("addNewProduct",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post("http://localhost:3001/api/v1/admin/products/add", formData, {
        withCredentials: true, headers: {
          'Content-Type': 'application/json',
        },
      })

      return response.data

    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue("Something went wrong. Please try again.");
      }
    }
  }
)

export const fetchAllProducts = createAsyncThunk("fetchAllProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:3001/api/v1/admin/products/get");
      return response?.data

    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue("Something went wrong. Please try again.");
      }
    }
  }
)
export const editProduct = createAsyncThunk("editProduct",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`http://localhost:3001/api/v1/admin/products/edit/${id}`, formData, {
        withCredentials: true, headers: {
          'Content-Type': 'application/json',
        },
      });
      return response?.data

    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue("Something went wrong. Please try again.");
      }
    }
  }
)

export const deleteProduct = createAsyncThunk("editProduct",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`http://localhost:3001/api/v1/admin/products/delete/${id}`);
      return response?.data

    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue("Something went wrong. Please try again.");
      }
    }
  }
)

const adminProductSlice = createSlice({
  name: "adminProduct",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.pending, (state, action) => {
        state.isLoading = true;
        state.error = null
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList = action.payload.data
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.productList = []
      })
  }
})

export default adminProductSlice.reducer;