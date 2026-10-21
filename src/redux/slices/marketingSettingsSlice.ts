import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/lib/axiosInstance";
import type {
  PromotionSettings,
  PromotionSettingsPayload,
} from "@/app/(protected)/manage/settings/(marketing)/promotions/type";

const PROMOTIONS_ENDPOINT = "dashboard/marketing-settings/promotions";

export const fetchPromotionSettings = createAsyncThunk(
  "marketingSettings/fetchPromotionSettings",
  async (_, thunkAPI) => {
    try {
      const res = await axiosInstance.get(PROMOTIONS_ENDPOINT);
      return res.data?.data ?? res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to fetch promotion settings"
      );
    }
  }
);

export const updatePromotionSettings = createAsyncThunk(
  "marketingSettings/updatePromotionSettings",
  async (data: PromotionSettingsPayload, thunkAPI) => {
    try {
      const res = await axiosInstance.post(PROMOTIONS_ENDPOINT, data);
      return res.data?.data ?? data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to save promotion settings"
      );
    }
  }
);

const initialState = {
  promotionSettings: null as PromotionSettings | null,
  promotionLoading: false,
  promotionSaving: false,
};

const marketingSettingsSlice = createSlice({
  name: "marketingSettings",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchPromotionSettings.pending, (state) => {
        state.promotionLoading = true;
      })
      .addCase(fetchPromotionSettings.fulfilled, (state, action) => {
        state.promotionLoading = false;
        state.promotionSettings = action.payload;
      })
      .addCase(fetchPromotionSettings.rejected, (state) => {
        state.promotionLoading = false;
      })
      .addCase(updatePromotionSettings.pending, (state) => {
        state.promotionSaving = true;
      })
      .addCase(updatePromotionSettings.fulfilled, (state, action) => {
        state.promotionSaving = false;
        state.promotionSettings = action.payload;
      })
      .addCase(updatePromotionSettings.rejected, (state) => {
        state.promotionSaving = false;
      });
  },
});

export default marketingSettingsSlice.reducer;
