import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/lib/axiosInstance";
import type {
  OrderNotificationPayload,
  OrderNotificationSettings,
  TestNotificationPayload,
} from "@/app/(protected)/manage/settings/(orders)/order-notifications/type";

const NOTIFICATIONS_ENDPOINT = "dashboard/order-settings/notifications";

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

const initialState = {
  notificationSettings: null as OrderNotificationSettings | null,
  notificationLoading: false,
  notificationSaving: false,
  notificationTesting: false,
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
      });
  },
});

export default orderSettingsSlice.reducer;
