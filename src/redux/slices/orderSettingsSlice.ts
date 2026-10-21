import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/lib/axiosInstance";
import type {
  OrderNotificationPayload,
  OrderNotificationSettings,
  TestNotificationPayload,
} from "@/app/(protected)/manage/settings/(orders)/order-notifications/type";
import type {
  ReturnSettings,
  ReturnSettingsPayload,
} from "@/app/(protected)/manage/settings/(orders)/return-settings/type";

const NOTIFICATIONS_ENDPOINT = "dashboard/order-settings/notifications";
import type {
  OrderStatus,
  OrderStatusesPayload,
} from "@/app/(protected)/manage/settings/(orders)/order-statuses/type";

const RETURNS_ENDPOINT = "dashboard/order-settings/returns";
const STATUSES_ENDPOINT = "dashboard/order-settings/statuses";

export const fetchOrderNotificationSettings = createAsyncThunk(
  "orderSettings/fetchNotificationSettings",
  async (_, thunkAPI) => {
    try {
      const res = await axiosInstance.get(NOTIFICATIONS_ENDPOINT);
      return res.data?.data ?? res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to fetch notification settings"
      );
    }
  }
);

export const updateOrderNotificationSettings = createAsyncThunk(
  "orderSettings/updateNotificationSettings",
  async (data: OrderNotificationPayload, thunkAPI) => {
    try {
      const res = await axiosInstance.post(NOTIFICATIONS_ENDPOINT, data);
      return res.data?.data ?? data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to save notification settings"
      );
    }
  }
);

export const testOrderNotification = createAsyncThunk(
  "orderSettings/testNotification",
  async (data: TestNotificationPayload, thunkAPI) => {
    try {
      const res = await axiosInstance.post(`${NOTIFICATIONS_ENDPOINT}/test`, data);
      return res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to send test notification"
      );
    }
  }
);

export const fetchReturnSettings = createAsyncThunk(
  "orderSettings/fetchReturnSettings",
  async (_, thunkAPI) => {
    try {
      const res = await axiosInstance.get(RETURNS_ENDPOINT);
      return res.data?.data ?? res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to fetch return settings"
      );
    }
  }
);

export const updateReturnSettings = createAsyncThunk(
  "orderSettings/updateReturnSettings",
  async (data: ReturnSettingsPayload, thunkAPI) => {
    try {
      const res = await axiosInstance.post(RETURNS_ENDPOINT, data);
      return res.data?.data ?? data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to save return settings"
      );
    }
  }
);

export const fetchOrderStatuses = createAsyncThunk(
  "orderSettings/fetchOrderStatuses",
  async (_, thunkAPI) => {
    try {
      const res = await axiosInstance.get(STATUSES_ENDPOINT);
      return res.data?.data ?? res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to fetch order statuses"
      );
    }
  }
);

export const updateOrderStatuses = createAsyncThunk(
  "orderSettings/updateOrderStatuses",
  async (data: OrderStatusesPayload, thunkAPI) => {
    try {
      const res = await axiosInstance.post(STATUSES_ENDPOINT, data);
      return res.data?.data ?? data.statuses;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to save order statuses"
      );
    }
  }
);

const initialState = {
  notificationSettings: null as OrderNotificationSettings | null,
  notificationLoading: false,
  notificationSaving: false,
  notificationTesting: false,
  returnSettings: null as ReturnSettings | null,
  returnLoading: false,
  returnSaving: false,
  orderStatuses: null as OrderStatus[] | null,
  statusesLoading: false,
  statusesSaving: false,
};

const orderSettingsSlice = createSlice({
  name: "orderSettings",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchOrderNotificationSettings.pending, (state) => {
        state.notificationLoading = true;
      })
      .addCase(fetchOrderNotificationSettings.fulfilled, (state, action) => {
        state.notificationLoading = false;
        state.notificationSettings = action.payload;
      })
      .addCase(fetchOrderNotificationSettings.rejected, (state) => {
        state.notificationLoading = false;
      })
      .addCase(updateOrderNotificationSettings.pending, (state) => {
        state.notificationSaving = true;
      })
      .addCase(updateOrderNotificationSettings.fulfilled, (state, action) => {
        state.notificationSaving = false;
        state.notificationSettings = action.payload;
      })
      .addCase(updateOrderNotificationSettings.rejected, (state) => {
        state.notificationSaving = false;
      })
      .addCase(testOrderNotification.pending, (state) => {
        state.notificationTesting = true;
      })
      .addCase(testOrderNotification.fulfilled, (state) => {
        state.notificationTesting = false;
      })
      .addCase(testOrderNotification.rejected, (state) => {
        state.notificationTesting = false;
      })
      .addCase(fetchReturnSettings.pending, (state) => {
        state.returnLoading = true;
      })
      .addCase(fetchReturnSettings.fulfilled, (state, action) => {
        state.returnLoading = false;
        state.returnSettings = action.payload;
      })
      .addCase(fetchReturnSettings.rejected, (state) => {
        state.returnLoading = false;
      })
      .addCase(updateReturnSettings.pending, (state) => {
        state.returnSaving = true;
      })
      .addCase(updateReturnSettings.fulfilled, (state, action) => {
        state.returnSaving = false;
        state.returnSettings = action.payload;
      })
      .addCase(updateReturnSettings.rejected, (state) => {
        state.returnSaving = false;
      })
      .addCase(fetchOrderStatuses.pending, (state) => {
        state.statusesLoading = true;
      })
      .addCase(fetchOrderStatuses.fulfilled, (state, action) => {
        state.statusesLoading = false;
        state.orderStatuses = action.payload;
      })
      .addCase(fetchOrderStatuses.rejected, (state) => {
        state.statusesLoading = false;
      })
      .addCase(updateOrderStatuses.pending, (state) => {
        state.statusesSaving = true;
      })
      .addCase(updateOrderStatuses.fulfilled, (state, action) => {
        state.statusesSaving = false;
        state.orderStatuses = action.payload;
      })
      .addCase(updateOrderStatuses.rejected, (state) => {
        state.statusesSaving = false;
      });
  },
});

export default orderSettingsSlice.reducer;
