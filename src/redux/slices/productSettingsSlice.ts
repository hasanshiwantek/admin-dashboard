import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/lib/axiosInstance";
import type {
  InventorySettings,
  InventorySettingsPayload,
} from "@/app/(protected)/manage/settings/(products)/inventory/type";
import type { GiftWrapping } from "@/app/(protected)/manage/settings/(products)/gift-wrapping/type";

const INVENTORY_ENDPOINT = "dashboard/product-settings/inventory";
const GIFT_WRAPPING_ENDPOINT = "dashboard/product-settings/gift-wrapping";
const MULTIPART = { headers: { "Content-Type": "multipart/form-data" } };

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

export const fetchGiftWrappings = createAsyncThunk(
  "productSettings/fetchGiftWrappings",
  async (_, thunkAPI) => {
    try {
      const res = await axiosInstance.get(GIFT_WRAPPING_ENDPOINT);
      return res.data?.data ?? res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to fetch gift wrapping options"
      );
    }
  }
);

export const fetchGiftWrappingById = createAsyncThunk(
  "productSettings/fetchGiftWrappingById",
  async (id: number, thunkAPI) => {
    try {
      const res = await axiosInstance.get(`${GIFT_WRAPPING_ENDPOINT}/${id}`);
      return res.data?.data ?? res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to fetch gift wrapping option"
      );
    }
  }
);

export const createGiftWrapping = createAsyncThunk(
  "productSettings/createGiftWrapping",
  async (data: FormData, thunkAPI) => {
    try {
      const res = await axiosInstance.post(GIFT_WRAPPING_ENDPOINT, data, MULTIPART);
      return res.data?.data ?? res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to add gift wrapping option"
      );
    }
  }
);

export const updateGiftWrapping = createAsyncThunk(
  "productSettings/updateGiftWrapping",
  async ({ id, data }: { id: number; data: FormData }, thunkAPI) => {
    try {
      const res = await axiosInstance.post(
        `${GIFT_WRAPPING_ENDPOINT}/${id}`,
        data,
        MULTIPART
      );
      return res.data?.data ?? res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to update gift wrapping option"
      );
    }
  }
);

export const deleteGiftWrappings = createAsyncThunk(
  "productSettings/deleteGiftWrappings",
  async (ids: number[], thunkAPI) => {
    try {
      await axiosInstance.delete(GIFT_WRAPPING_ENDPOINT, { data: { ids } });
      return ids;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to delete gift wrapping options"
      );
    }
  }
);

const initialState = {
  inventorySettings: null as InventorySettings | null,
  inventoryLoading: false,
  inventorySaving: false,
  giftWrappings: [] as GiftWrapping[],
  giftWrappingsLoading: false,
  selectedGiftWrapping: null as GiftWrapping | null,
  giftWrappingLoading: false,
  giftWrappingSaving: false,
  giftWrappingDeleting: false,
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
      })
      .addCase(fetchGiftWrappings.pending, (state) => {
        state.giftWrappingsLoading = true;
      })
      .addCase(fetchGiftWrappings.fulfilled, (state, action) => {
        state.giftWrappingsLoading = false;
        state.giftWrappings = action.payload ?? [];
      })
      .addCase(fetchGiftWrappings.rejected, (state) => {
        state.giftWrappingsLoading = false;
      })
      .addCase(fetchGiftWrappingById.pending, (state) => {
        state.giftWrappingLoading = true;
      })
      .addCase(fetchGiftWrappingById.fulfilled, (state, action) => {
        state.giftWrappingLoading = false;
        state.selectedGiftWrapping = action.payload;
      })
      .addCase(fetchGiftWrappingById.rejected, (state) => {
        state.giftWrappingLoading = false;
      })
      .addCase(createGiftWrapping.pending, (state) => {
        state.giftWrappingSaving = true;
      })
      .addCase(createGiftWrapping.fulfilled, (state) => {
        state.giftWrappingSaving = false;
      })
      .addCase(createGiftWrapping.rejected, (state) => {
        state.giftWrappingSaving = false;
      })
      .addCase(updateGiftWrapping.pending, (state) => {
        state.giftWrappingSaving = true;
      })
      .addCase(updateGiftWrapping.fulfilled, (state) => {
        state.giftWrappingSaving = false;
      })
      .addCase(updateGiftWrapping.rejected, (state) => {
        state.giftWrappingSaving = false;
      })
      .addCase(deleteGiftWrappings.pending, (state) => {
        state.giftWrappingDeleting = true;
      })
      .addCase(deleteGiftWrappings.fulfilled, (state, action) => {
        state.giftWrappingDeleting = false;
        state.giftWrappings = state.giftWrappings.filter(
          (giftWrapping) => !action.payload.includes(giftWrapping.id)
        );
      })
      .addCase(deleteGiftWrappings.rejected, (state) => {
        state.giftWrappingDeleting = false;
      });
  },
});

export default productSettingsSlice.reducer;
