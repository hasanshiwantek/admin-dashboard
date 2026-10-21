import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/lib/axiosInstance";
import type {
  InventorySettings,
  InventorySettingsPayload,
} from "@/app/(protected)/manage/settings/(products)/inventory/type";

const INVENTORY_ENDPOINT = "dashboard/product-settings/inventory";

export const fetchInventorySettings = createAsyncThunk(
  "productSettings/fetchInventorySettings",
  async (_, thunkAPI) => {
    try {
      const res = await axiosInstance.get(INVENTORY_ENDPOINT);
      return res.data?.data ?? res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to fetch inventory settings"
      );
    }
  }
);

export const updateInventorySettings = createAsyncThunk(
  "productSettings/updateInventorySettings",
  async (data: InventorySettingsPayload, thunkAPI) => {
    try {
      const res = await axiosInstance.post(INVENTORY_ENDPOINT, data);
      return res.data?.data ?? data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to save inventory settings"
      );
    }
  }
);

const initialState = {
  inventorySettings: null as InventorySettings | null,
  inventoryLoading: false,
  inventorySaving: false,
};

const productSettingsSlice = createSlice({
  name: "productSettings",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchInventorySettings.pending, (state) => {
        state.inventoryLoading = true;
      })
      .addCase(fetchInventorySettings.fulfilled, (state, action) => {
        state.inventoryLoading = false;
        state.inventorySettings = action.payload;
      })
      .addCase(fetchInventorySettings.rejected, (state) => {
        state.inventoryLoading = false;
      })
      .addCase(updateInventorySettings.pending, (state) => {
        state.inventorySaving = true;
      })
      .addCase(updateInventorySettings.fulfilled, (state, action) => {
        state.inventorySaving = false;
        state.inventorySettings = action.payload;
      })
      .addCase(updateInventorySettings.rejected, (state) => {
        state.inventorySaving = false;
      });
  },
});

export default productSettingsSlice.reducer;
