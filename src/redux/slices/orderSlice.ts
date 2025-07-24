import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '@/lib/axiosInstance';

// 1. Thunk with slight improvement
export const fetchAllOrders = createAsyncThunk(
  'product/fetchAllOrders',
  async (_, thunkAPI) => {
    try {
      const res = await axiosInstance.get(`dashboard/orders/list-orders`);
      console.log("✅ Order Response Data:", res.data);
      return res.data;
    } catch (err: any) {
      console.error("❌ Error fetching all orders:", err);
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || 'Failed to fetch orders'
      );
    }
  }
);

// 2. Initial State
const initialState = {
  orders: [],
  loading: false,
  error: null as string | null,
};

// 3. Slice
const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllOrders.pending, (state) => {
        state.loading = true;
        state.error = null; // reset error
      })
      .addCase(fetchAllOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchAllOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || action.error.message || 'Failed';
      });
  },
});
export default orderSlice.reducer;
