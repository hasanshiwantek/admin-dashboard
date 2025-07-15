import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchDashboardMetrics = createAsyncThunk(
  'home/fetchDashboardMetrics',
  async () => {
    const res = await fetch('/api/dashboard/metrics');
    return await res.json();
  }
);

export const fetchStoreStatistics = createAsyncThunk(
  'home/fetchStoreStatistics',
  async () => {
    const res = await fetch('/api/dashboard/statistics');
    return await res.json();
  }
);

export const fetchOrdersByStatus = createAsyncThunk(
  'home/fetchOrdersByStatus',
  async (status: string) => {
    const res = await fetch(`/api/orders?status=${status}`);
    return await res.json();
  }
);

// 2. Initial State
const initialState = {
  metrics: null,
  statistics: null,
  orders: [],
  loading: false,
  error: null as string | null,
};

// 3. Slice
const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      // Metrics
      .addCase(fetchDashboardMetrics.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDashboardMetrics.fulfilled, (state, action) => {
        state.loading = false;
        state.metrics = action.payload;
      })
      .addCase(fetchDashboardMetrics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch metrics';
      })

      // Statistics
      .addCase(fetchStoreStatistics.fulfilled, (state, action) => {
        state.statistics = action.payload;
      })

      // Orders
      .addCase(fetchOrdersByStatus.fulfilled, (state, action) => {
        state.orders = action.payload;
      });
  },
});

export default homeSlice.reducer;
