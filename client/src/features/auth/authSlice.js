import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
  isAuthenticated: false,
  isLoading: false,
  user: null,
  error: null
}

export const registerUser = createAsyncThunk("/auth/register",
  async (formData) => {
    const response = await axios.post("http://localhost:3001/api/v1/auth/register", formData, { withCredentials: true })
    console.log(await response.data)
    return await response.data
  }
)

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {

    }
  },
  extraReducers: (builder) => {
    builder
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
        state.error = action.error;
    })
  }
})

export const { setUser } = authSlice.actions;

export default authSlice.reducer;