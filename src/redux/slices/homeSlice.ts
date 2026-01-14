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
  async ({ query }: { query: any }, thunkAPI) => {
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

export const createStoreSettings = createAsyncThunk(
  "customer/createStoreSettings",
  async ({ data }: { data: any }, thunkAPI) => {
    try {
      const response = await axiosInstance.post(
        "dashboard/store-setting/add-store-setting",
        data
      );
      console.log("✅ Store Settings Response From Thunk:", response.data);

      return response.data;
    } catch (error: any) {
      console.error("❌ Error Saving Store Setting:", error);
      return thunkAPI.rejectWithValue("Error Saving Store Setting");
    }
  }
);

export const fetchStoreSettings = createAsyncThunk(
  "customer/fetchStoreSettings",
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get(
        "dashboard/store-setting/get-store-setting"
      );
      console.log("✅ Store Settings Response From Thunk:", response.data);

      return response.data;
    } catch (error: any) {
      console.error("❌ Error fetching Store Setting:", error);
      return thunkAPI.rejectWithValue("Error fetching Store Setting");
    }
  }
);

// 2. Initial State
const initialState = {
  metrics: null,
  statistics: null,
  orders: [],
  searchData: [],
  storeSettings: [],
  settingsLoader: false,
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
      })
      //STORE SETTINGS

      .addCase(fetchStoreSettings.pending, (state) => {
        state.settingsLoader = true;
      })
      .addCase(fetchStoreSettings.fulfilled, (state, action) => {
        state.settingsLoader = false;
        state.storeSettings = action.payload?.data;
      })
      .addCase(fetchStoreSettings.rejected, (state, action) => {
        state.settingsLoader = false;
        state.error = action.error.message || "Failed to fetch settings data";
      });
  },
});

export default homeSlice.reducer;
