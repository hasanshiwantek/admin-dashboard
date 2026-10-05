import type {
  DiscountStatus,
  PromotionListResponse,
  UpdatePromotionStatusArgs,
} from "@/app/components/marketing/Promotions/types";
import axiosInstance from "@/lib/axiosInstance";
import { buildQueryParams } from "@/lib/utils";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// StoreFront.ts

export const createCoupon = createAsyncThunk(
  "storefront/createCoupon",
  async ({ data }: { data: any }, thunkAPI) => {
    try {
      const res = await axiosInstance.post(
        `dashboard/coupons/add-couponcode`,
        data,
      );
      return res.data;
    } catch (err: any) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to add coupon code",
      );
    }
  },
);

export const getCouponCodes = createAsyncThunk(
  "marketing/getCouponCodes",
  async (_, thunkAPI) => {
    try {
      const res = await axiosInstance.get(`dashboard/coupons/get-couponcode`);
      return res?.data;
    } catch (err: any) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to fetch coupon code",
      );
    }
  },
);

export const getCouponById = createAsyncThunk(
  "marketing/getCouponById ",
  async ({ id }: { id: any }, thunkAPI) => {
    try {
      const res = await axiosInstance.get(
        `dashboard/coupons/get-couponcode/${id}`,
      );
      return res?.data;
    } catch (err: any) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to fetch Coupon",
      );
    }
  },
);

export const searchCouponcode = createAsyncThunk(
  "marketing/searchCouponcode ",
  async ({ search, per_page }: { search: any; per_page: any }, thunkAPI) => {
    try {
      const res = await axiosInstance.get(
        `dashboard/coupons/get-couponcode?search=${search}&per_page=${per_page}`,
      );
      return res?.data;
    } catch (err: any) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to search Coupon",
      );
    }
  },
);

export const updateCouponCode = createAsyncThunk(
  "storefront/updateCouponCode",
  async ({ id, data }: { id: any; data: any }, thunkAPI) => {
    try {
      const res = await axiosInstance.put(
        `dashboard/coupons/update-couponcode/${id}`,
        data,
      );
      return res?.data;
    } catch (err: any) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to update coupon code page",
      );
    }
  },
);

export const toggleCouponEnabled = createAsyncThunk(
  "marketing/toggleCouponEnabled",
  async ({ id, enabled }: { id: any; enabled: boolean }, thunkAPI) => {
    try {
      const res = await axiosInstance.put(
        `dashboard/coupons/update-enabled/${id}`,
        { enabled },
      );
      return { id, enabled, data: res?.data };
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to update coupon status",
      );
    }
  },
);

export const deleteCouponCode = createAsyncThunk(
  "storefront/deleteWebPage",
  async ({ id }: { id: any }, thunkAPI) => {
    try {
      const res = await axiosInstance.delete(`dashboard/webpages/delete/${id}`);
      return res?.data;
    } catch (err: any) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to delete web page",
      );
    }
  },
);

export const deleteCouponCodes = createAsyncThunk(
  "marketing/deleteCouponCode",
  async ({ id }: { id: any }, thunkAPI) => {
    try {
      const res = await axiosInstance.delete(
        `dashboard/coupons/delete-couponcode/${id}`,
      );
      return res?.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to delete coupon code",
      );
    }
  },
);

export const createEmailMarketing = createAsyncThunk(
  "storefront/createEmailMarketing",
  async ({ data }: { data: any }, thunkAPI) => {
    try {
      const res = await axiosInstance.put(
        `dashboard/email-marketings/email-marketing`,
        data,
      );
      return res.data;
    } catch (err: any) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to add Marketing Response",
      );
    }
  },
);

export const getEmailMarketing = createAsyncThunk(
  "marketing/getEmailMarketing",
  async (_, thunkAPI) => {
    try {
      const res = await axiosInstance.get(
        `dashboard/email-marketings/get-email-marketing`,
      );
      return res?.data;
    } catch (err: any) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to fetch Email Marketing",
      );
    }
  },
);
export const deleteAllSubscribers = createAsyncThunk(
  "marketing/deleteAllSubscribers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(
        "/dashboard/subscribers/delete-all",
      );

      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Something went wrong",
      );
    }
  },
);
export const exportSubscribers = createAsyncThunk(
  "marketing/exportSubscribers",
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get("dashboard/subscribers/export", {
        responseType: "blob",
      });

      return response.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to export subscribers",
      );
    }
  },
);

export const fetchBanners = createAsyncThunk(
  "marketing/fetchBanners",
  async (args: Record<string, any>, thunkAPI) => {
    try {
      const params = buildQueryParams(args);
      const res = await axiosInstance.get(
        `dashboard/banners/list-banners?${params.toString()}`,
      );
      return res?.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to fetch banners",
      );
    }
  },
);

export const getBannerById = createAsyncThunk(
  "marketing/getBannerById",
  async ({ id }: { id: any }, thunkAPI) => {
    try {
      const res = await axiosInstance.get(
        `dashboard/banners/list-banners-by-Id/${id}`,
      );
      return res?.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to fetch banner",
      );
    }
  },
);

export const createBanner = createAsyncThunk(
  "marketing/createBanner",
  async ({ data }: { data: any }, thunkAPI) => {
    try {
      const res = await axiosInstance.post(
        `dashboard/banners/add-banner`,
        data,
      );
      return res?.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to add banner",
      );
    }
  },
);

export const updateBanner = createAsyncThunk(
  "marketing/updateBanner",
  async ({ id, data }: { id: any; data: any }, thunkAPI) => {
    try {
      const res = await axiosInstance.patch(
        `dashboard/banners/update-banner/${id}`,
        data,
      );
      return { id, data: res?.data };
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to update banner",
      );
    }
  },
);

export const deleteBanner = createAsyncThunk(
  "marketing/deleteBanner",
  async ({ id }: { id: any }, thunkAPI) => {
    try {
      const res = await axiosInstance.delete(
        `dashboard/banners/delete-banner/${id}`,
      );
      return { id, data: res?.data };
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to delete banner",
      );
    }
  },
);

// Promotions (automatic + coupon). `kind` selects which list is returned.
export const fetchPromotions = createAsyncThunk(
  "marketing/fetchPromotions",
  async (args: Record<string, any>, thunkAPI) => {
    try {
      const res = await axiosInstance.get(
        `dashboard/promotions/list-promotion?${buildQueryParams(args)}`,
      );
      return res?.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to fetch promotions",
      );
    }
  },
);

export const updatePromotionStatus = createAsyncThunk(
  "marketing/updatePromotionStatus",
  async ({ ids, status }: UpdatePromotionStatusArgs, thunkAPI) => {
    try {
      const res = await axiosInstance.post(
        `dashboard/promotions/update-status`,
        { ids, status },
      );
      return { ids, status, data: res?.data };
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to update promotion status",
      );
    }
  },
);

export const deletePromotions = createAsyncThunk(
  "marketing/deletePromotions",
  async ({ ids }: { ids: number[] }, thunkAPI) => {
    try {
      const res = await axiosInstance.delete(`dashboard/promotions/delete-promotion`, {
        data: { ids },
      });
      return res?.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to delete promotions",
      );
    }
  },
);

export const createPromotion = createAsyncThunk(
  "marketing/createPromotion",
  async ({ data }: { data: Record<string, any> }, thunkAPI) => {
    try {
      const res = await axiosInstance.post(
        `dashboard/promotions/add-promotion`,
        data,
      );
      return res?.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to create promotion",
      );
    }
  },
);

export const getPromotionById = createAsyncThunk(
  "marketing/getPromotionById",
  async ({ id }: { id: number | string }, thunkAPI) => {
    try {
      const res = await axiosInstance.get(
        `dashboard/promotions/get-promotion/${id}`,
      );
      return res?.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to fetch promotion",
      );
    }
  },
);

export const updatePromotion = createAsyncThunk(
  "marketing/updatePromotion",
  async (
    { id, data }: { id: number | string; data: Record<string, any> },
    thunkAPI,
  ) => {
    try {
      const res = await axiosInstance.post(
        `dashboard/promotions/update-promotion/${id}`,
        data,
      );
      return res?.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to update promotion",
      );
    }
  },
);

// Bulk coupon codes of a promotion as a CSV blob.
export const downloadPromotionCodes = createAsyncThunk(
  "marketing/downloadPromotionCodes",
  async ({ id }: { id: number | string }, thunkAPI) => {
    try {
      const res = await axiosInstance.get(
        `dashboard/promotions/download-codes/${id}`,
        { responseType: "blob" },
      );
      return res.data as Blob;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to download coupon codes",
      );
    }
  },
);

type CouponListResponse = {
  couponcode?: {
    data?: any[];
    total?: number;
    current_page?: number;
    last_page?: number;
  };
};

interface MarketingState {
  loading: boolean;
  error: string | null;
  couponCodes: CouponListResponse | null;
  emailMarketing: any[];
  deleteLoading: boolean;
  banners: any;
  bannersLoading: boolean;
  banner: any;
  bannerLoading: boolean;
  promotions: PromotionListResponse | null;
  promotionsLoading: boolean;
  promotionsError: string | null;
}

// 2. Initial State
const initialState: MarketingState = {
  loading: false,
  error: null,
  couponCodes: null,
  emailMarketing: [],
  deleteLoading: false,
  banners: null,
  bannersLoading: false,
  banner: null,
  bannerLoading: false,
  promotions: null,
  promotionsLoading: false,
  promotionsError: null,
};

/** Update the status of the listed promotion rows in place. */
const setPromotionStatus = (
  state: MarketingState,
  ids: number[],
  status: DiscountStatus,
) => {
  state.promotions?.data?.items?.forEach((row) => {
    if (ids.includes(row.id)) {
      row.status = status;
      row.active = status === "active";
    }
  });
};

// 3. Slice
const marketingSlice = createSlice({
  name: "marketing",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getCouponCodes.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCouponCodes.fulfilled, (state, action) => {
        state.loading = false;
        state.couponCodes = action?.payload;
      })
      .addCase(getCouponCodes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to add webpage";
      })
      .addCase(searchCouponcode.pending, (state) => {
        state.loading = true;
      })
      .addCase(searchCouponcode.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to search coupons";
      })
      .addCase(searchCouponcode.fulfilled, (state, action) => {
        state.loading = false;
        state.couponCodes = action?.payload;
      })
      .addCase(getEmailMarketing.pending, (state) => {
        state.loading = true;
      })
      .addCase(getEmailMarketing.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to search coupons";
      })
      .addCase(getEmailMarketing.fulfilled, (state, action) => {
        state.loading = false;
        state.emailMarketing = action?.payload?.data;
      })
      .addCase(deleteCouponCodes.pending, (state) => {
        state.deleteLoading = true;
      })
      .addCase(deleteCouponCodes.fulfilled, (state, action) => {
        state.deleteLoading = false;
        // Optional: Remove deleted coupon from state
        // state.couponCodes = state.couponCodes.filter(
        //   (coupon: any) => coupon.id !== action.meta.arg.id
        // );
      })
      .addCase(deleteCouponCodes.rejected, (state, action) => {
        state.deleteLoading = false;
        state.error = action.error.message || "Failed to delete coupon code";
      })
      .addCase(toggleCouponEnabled.pending, (state) => {
        state.loading = true;
      })
      .addCase(toggleCouponEnabled.fulfilled, (state, action) => {
        state.loading = false;

        if (!state.couponCodes?.couponcode?.data) return;

        state.couponCodes.couponcode.data =
          state.couponCodes.couponcode.data.map((coupon: any) =>
            coupon.id === action.payload.id
              ? { ...coupon, enabled: action.payload.enabled ? 1 : 0 }
              : coupon,
          );
      })
      .addCase(toggleCouponEnabled.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) || "Failed to update coupon status";
      })
      .addCase(deleteAllSubscribers.pending, (state) => {
        state.deleteLoading = true;
      })
      .addCase(deleteAllSubscribers.fulfilled, (state) => {
        state.deleteLoading = false;
      })
      .addCase(deleteAllSubscribers.rejected, (state, action) => {
        state.deleteLoading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchBanners.pending, (state) => {
        state.bannersLoading = true;
      })
      .addCase(fetchBanners.fulfilled, (state, action) => {
        state.bannersLoading = false;
        state.banners = action.payload;
      })
      .addCase(fetchBanners.rejected, (state, action) => {
        state.bannersLoading = false;
        state.error = (action.payload as string) || "Failed to fetch banners";
      })
      .addCase(getBannerById.pending, (state) => {
        state.bannerLoading = true;
        state.banner = null;
      })
      .addCase(getBannerById.fulfilled, (state, action) => {
        state.bannerLoading = false;
        state.banner = action.payload;
      })
      .addCase(getBannerById.rejected, (state, action) => {
        state.bannerLoading = false;
        state.error = (action.payload as string) || "Failed to fetch banner";
      })
      .addCase(createBanner.pending, (state) => {
        state.bannerLoading = true;
      })
      .addCase(createBanner.fulfilled, (state) => {
        state.bannerLoading = false;
      })
      .addCase(createBanner.rejected, (state, action) => {
        state.bannerLoading = false;
        state.error = (action.payload as string) || "Failed to add banner";
      })
      .addCase(updateBanner.pending, (state) => {
        state.bannersLoading = true;
      })
      .addCase(updateBanner.fulfilled, (state) => {
        state.bannersLoading = false;
      })
      .addCase(updateBanner.rejected, (state, action) => {
        state.bannersLoading = false;
        state.error = (action.payload as string) || "Failed to update banner";
      })
      .addCase(deleteBanner.pending, (state) => {
        state.deleteLoading = true;
      })
      .addCase(deleteBanner.fulfilled, (state) => {
        state.deleteLoading = false;
      })
      .addCase(deleteBanner.rejected, (state, action) => {
        state.deleteLoading = false;
        state.error = (action.payload as string) || "Failed to delete banner";
      })
      .addCase(fetchPromotions.pending, (state) => {
        state.promotionsLoading = true;
        state.promotionsError = null;
      })
      .addCase(fetchPromotions.fulfilled, (state, action) => {
        state.promotionsLoading = false;
        state.promotions = action.payload;
      })
      .addCase(fetchPromotions.rejected, (state, action) => {
        state.promotionsLoading = false;
        state.promotionsError =
          (action.payload as string) || "Failed to fetch promotions";
      })
      // With a `previousStatus` (the Active switch) the rows update
      // optimistically and roll back if the request fails.
      .addCase(updatePromotionStatus.pending, (state, action) => {
        const { ids, status, previousStatus } = action.meta.arg;
        if (previousStatus) setPromotionStatus(state, ids, status);
      })
      .addCase(updatePromotionStatus.rejected, (state, action) => {
        const { ids, previousStatus } = action.meta.arg;
        if (previousStatus) setPromotionStatus(state, ids, previousStatus);
      });
  },
});

export default marketingSlice.reducer;
