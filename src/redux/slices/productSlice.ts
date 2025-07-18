import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '@/lib/axiosInstance';

// 1. Thunk with slight improvement
export const fetchAllProducts = createAsyncThunk(
  'product/fetchAllProducts',
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as any; // Still using any if you don’t have RootState
      const baseURL = state.auth.baseURL;

      const res = await axiosInstance.get(`${baseURL}/fetch/AllProducts`);
      return res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || 'Failed to fetch products'
      );
    }
  }
);

// 2. Initial State
const initialState = {
  products: [],
  loading: false,
  error: null as string | null,
};

// 3. Slice
const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.pending, (state) => {
        state.loading = true;
        state.error = null; // reset error
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || action.error.message || 'Failed';
      });
  },
});

export default productSlice.reducer;
