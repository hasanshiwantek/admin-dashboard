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
      return response.data;
    } catch (error: any) {
      console.error("❌ Error Saving Store Setting:", error);
      return thunkAPI.rejectWithValue("Error Saving Store Setting");
    }
  }
);
export const urlSettings = createAsyncThunk(
  "dashboard/url-settings",                    // Better generic type name
  async ({ data, sectionName }: {
    data: any;
    sectionName: "product" | "category" | "webPage";
  }, thunkAPI) => {

    try {
      const response = await axiosInstance.post(
        `dashboard/url-settings/${sectionName}`,   // Dynamic endpoint
        data
      );

      return {
        section: sectionName,
        data: response.data
      };

    } catch (error: any) {
      return thunkAPI.rejectWithValue({
        section: sectionName,
        message: error.response?.data?.message || "Failed to update URL settings"
      });
    }
  }
);

// export const fetchUrlSettings = createAsyncThunk(
//   "dashboard/url-settings/product",
//   async (_, thunkAPI) => {
//     try {
//       const response = await axiosInstance.get(
//         "dashboard/url-settings/product"
//       );
//       return response.data;
//     } catch (error: any) {
//       console.error("❌ Error fetching Store Setting:", error);
//       return thunkAPI.rejectWithValue("Error fetching Store Setting");
//     }
//   }
// );
export const fetchUrlSettings = createAsyncThunk(
  "dashboard/url-settings/fetch",
  async (sectionName: "product" | "category" | "webPage", thunkAPI) => {
    try {
      const response = await axiosInstance.get(
        `dashboard/url-settings/${sectionName}`   // Dynamic endpoint
      );
      return {
        section: sectionName,
        data: response.data
      };
    } catch (error: any) {
      console.error(`❌ Error fetching ${sectionName} URL settings:`, error);
      return thunkAPI.rejectWithValue({
        section: sectionName,
        message: error.response?.data?.message || `Error fetching ${sectionName} settings`
      });
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
  urlsettingsLoader: false,
  loading: false,
  error: null as string | null,
  urlSettingData: null
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
      })



      .addCase(urlSettings.pending, (state) => {
        state.urlsettingsLoader = true;
      })
      .addCase(urlSettings.fulfilled, (state, action) => {
        state.urlsettingsLoader = false;
      })
      .addCase(urlSettings.rejected, (state, action) => {
        state.urlsettingsLoader = false;
        state.error = action.error.message || "Failed to fetch settings data";
      })

      .addCase(fetchUrlSettings.pending, (state) => {
        state.urlsettingsLoader = true;
      })
      .addCase(fetchUrlSettings.fulfilled, (state, action) => {
        state.urlsettingsLoader = false;
        state.urlSettingData = action.payload?.data?.data;
      })
      .addCase(fetchUrlSettings.rejected, (state, action) => {
        state.urlsettingsLoader = false;
        state.error = action.error.message || "Failed to fetch settings data";
      });
  },
});

export default homeSlice.reducer;
