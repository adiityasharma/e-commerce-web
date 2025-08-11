import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios";


const initialState = {
  isLoading: false,
  searchResult: [],
  error: null
}

export const getSearchResult = createAsyncThunk("getSearchResult",
  async (keyword) => {
    const response = await axios.get(`http://localhost:3001/api/v1/shop/search/${keyword}`)

    return response.data;
  }
)


const searchSlice = createSlice({
  name: "searchSlice",
  initialState,
  reducers: {
    resetSearchResult: (state) => {
      state.searchResult = []
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSearchResult.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getSearchResult.fulfilled, (state, action) => {
        state.isLoading = true;
        state.searchResult = action?.payload?.data
      })
      .addCase(getSearchResult.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message
      })
  }
})

export const { resetSearchResult } = searchSlice.actions

export default searchSlice.reducer;