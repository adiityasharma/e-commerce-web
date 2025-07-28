import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
  isAuthenticated: false,
  isLoading: false,
  user: null,
  error: null
}

export const registerUser = createAsyncThunk("/auth/register",
  async (formData, {rejectWithValue}) => {
    try {
      const response = await axios.post("http://localhost:3001/api/v1/auth/register", formData, { withCredentials: true })
      return await response.data;
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue("Something went wrong. Please try again.");
      }
    }
  }
)

export const loginUser = createAsyncThunk("loginUser",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post("http://localhost:3001/api/v1/auth/login", formData, { withCredentials: true })
      return await response.data
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      }
      else {
        return rejectWithValue("Something went wrong.Please try again.")
      }
    }
})

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {

    }
  },
  extraReducers: (builder) => {
    builder
      // register
      .addCase(registerUser.pending, (state, action) => {
        state.isLoading = true;
        state.error = null
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = action.payload || "Registertion failed";
      })
    
    // login
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        console.log(action)
        state.isLoading = false;
        state.user = action.payload.success ? action.payload : null;
        state.isAuthenticated = action.payload.success
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.error = action.payload || "Login failed"
    })
  }
})



export const { setUser } = authSlice.actions;

export default authSlice.reducer;