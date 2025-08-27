import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/lib/axiosInstance";

// homeSlice.ts
export const fetchDashboardMetrics = createAsyncThunk(
  "home/fetchDashboardMetrics",
  async (_, thunkAPI) => {
    try {
      const res = await axiosInstance.get(`dashboard/store-performance`);
      return res.data;
    } catch (err: any) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to fetch metrics"
      );
    }
  }
);

export const fetchStoreStatistics = createAsyncThunk(
  "home/fetchStoreStatistics",
  async (_, thunkAPI) => {
    try {
      const res = await axiosInstance.get(`dashboard/total-count`);
      return res.data;
    } catch (err: any) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to fetch metrics"
      );
    }
  }
);

export const fetchOrdersByStatus = createAsyncThunk(
  "home/fetchOrdersByStatus",
  async (_, thunkAPI) => {
    try {
      const res = await axiosInstance.get(`/dashboard/metrics`);
      return res.data;
    } catch (err: any) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to fetch metrics"
      );
    }
  }
);

export const globalSearch = createAsyncThunk(
  "home/globalSearch",
  async ({query} : {query:any}, thunkAPI) => {
    try {
      const res = await axiosInstance.get(
        `dashboard/global-search?query=${query}`
      );
      console.log("Main Search Data: ", res?.data);
      return res.data;
    } catch (err: any) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to fetch search data"
      );
    }
  }
);

// 2. Initial State
const initialState = {
  metrics: null,
  statistics: null,
  orders: [],
  searchData: [],
  loading: false,
  error: null as string | null,
};

// 3. Slice
const homeSlice = createSlice({
  name: "home",
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
        state.error = action.error.message || "Failed to fetch metrics";
      })
      // GLOBAL SEARCH
      .addCase(globalSearch.pending, (state) => {
        state.loading = true;
      })
      .addCase(globalSearch.fulfilled, (state, action) => {
        state.loading = false;
        state.searchData = action.payload;
      })
      .addCase(globalSearch.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch search data";
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
