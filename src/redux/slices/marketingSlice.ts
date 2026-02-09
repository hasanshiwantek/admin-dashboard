import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/lib/axiosInstance";

// StoreFront.ts

export const createCoupon = createAsyncThunk(
  "storefront/createCoupon",
  async ({ data }: { data: any }, thunkAPI) => {
    try {
      const res = await axiosInstance.post(
        `dashboard/coupons/add-couponcode`,
        data
      );
      console.log("Add Coupon code Response: ", res?.data);
      return res.data;
    } catch (err: any) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to add coupon code"
      );
    }
  }
);

export const getCouponCodes = createAsyncThunk(
  "marketing/getCouponCodes",
  async (_, thunkAPI) => {
    try {
      const res = await axiosInstance.get(`dashboard/coupons/get-couponcode`);
      console.log("Fetch Coupon Code Response: ", res?.data);
      return res?.data;
    } catch (err: any) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to fetch coupon code"
      );
    }
  }
);





export const getCouponById = createAsyncThunk(
  "marketing/getCouponById ",
  async ({ id }: { id: any }, thunkAPI) => {
    try {
      const res = await axiosInstance.get(
        `dashboard/coupons/get-couponcode/${id}`
      );
      console.log("Fetch Coupon Response by id: ", res?.data);
      return res?.data;
    } catch (err: any) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to fetch Coupon"
      );
    }
  }
);

export const searchCouponcode = createAsyncThunk(
  "marketing/searchCouponcode ",
  async ({ search, per_page }: { search: any; per_page: any }, thunkAPI) => {
    try {
      const res = await axiosInstance.get(
        `dashboard/coupons/get-couponcode?search=${search}&per_page=${per_page}`
      );
      console.log("Search Coupon Response by id: ", res?.data);
      return res?.data;
    } catch (err: any) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to search Coupon"
      );
    }
  }
);

export const updateCouponCode = createAsyncThunk(
  "storefront/updateCouponCode",
  async ({ id, data }: { id: any; data: any }, thunkAPI) => {
    try {
      const res = await axiosInstance.put(
        `dashboard/coupons/update-couponcode/${id}`,
        data
      );
      console.log("Update Coupon Code Response by id: ", res?.data);
      return res?.data;
    } catch (err: any) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to update coupon code page"
      );
    }
  }
);

export const deleteCouponCode = createAsyncThunk(
  "storefront/deleteWebPage",
  async ({ id }: { id: any }, thunkAPI) => {
    try {
      const res = await axiosInstance.delete(`dashboard/webpages/delete/${id}`);
      console.log("Delete Webpage Response by id: ", res?.data);
      return res?.data;
    } catch (err: any) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to delete web page"
      );
    }
  }
);


export const deleteCouponCodes = createAsyncThunk(
  "marketing/deleteCouponCode",
  async ({ id }: { id: any }, thunkAPI) => {
    try {
      const res = await axiosInstance.delete(
        `dashboard/coupons/delete-couponcode/${id}`
      );
      console.log("Delete Coupon Code Response by id: ", res?.data);
      return res?.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to delete coupon code"
      );
    }
  }
);

export const createEmailMarketing = createAsyncThunk(
  "storefront/createEmailMarketing",
  async ({ data }: { data: any }, thunkAPI) => {
    try {
      const res = await axiosInstance.put(
        `dashboard/email-marketings/email-marketing`,
        data
      );
      console.log("Add Email Marketing Response: ", res?.data);
      return res.data;
    } catch (err: any) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to add Marketing Response"
      );
    }
  }
);

export const getEmailMarketing = createAsyncThunk(
  "marketing/getEmailMarketing",
  async (_, thunkAPI) => {
    try {
      const res = await axiosInstance.get(
        `dashboard/email-marketings/get-email-marketing`
      );
      console.log("Fetch Email Marketing Response ", res?.data);
      return res?.data;
    } catch (err: any) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to fetch Email Marketing"
      );
    }
  }
);

// 2. Initial State
const initialState = {
  loading: false,
  error: null as string | null,
  couponCodes: [],
  emailMarketing: [],
   deleteLoading: false,
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
        state.emailMarketing = action?.payload;
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
      });
  },
});

export default marketingSlice.reducer;
