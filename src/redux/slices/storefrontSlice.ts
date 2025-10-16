import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/lib/axiosInstance";

// StoreFront.ts

export const createWebpage = createAsyncThunk(
  "storefront/createWebpage",
  async ({ data }: { data: any }, thunkAPI) => {
    try {
      const res = await axiosInstance.post(
        `dashboard/webpages/create-page`,
        data
      );
      console.log("Add Webpage Response: ", res?.data);
      return res.data;
    } catch (err: any) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to add web page"
      );
    }
  }
);

export const getWebPages = createAsyncThunk(
  "storefront/getWebPages",
  async (_, thunkAPI) => {
    try {
      const res = await axiosInstance.get(`dashboard/webpages/web-pages`);
      console.log("Fetch Webpage Response: ", res?.data);
      return res?.data?.data;
    } catch (err: any) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to fetch web page"
      );
    }
  }
);

export const getWebPageById = createAsyncThunk(
  "storefront/getWebPageById",
  async ({ id }: { id: any }, thunkAPI) => {
    try {
      const res = await axiosInstance.get(
        `dashboard/webpages/single-page/${id}`
      );
      console.log("Fetch Webpage Response by id: ", res?.data);
      return res?.data;
    } catch (err: any) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to fetch web page"
      );
    }
  }
);

export const updateWebPage = createAsyncThunk(
  "storefront/updateWebPage",
  async ({ id, data }: { id: any; data: any }, thunkAPI) => {
    try {
      const res = await axiosInstance.put(
        `dashboard/webpages/update/${id}`,
        data
      );
      console.log("Update Webpage Response by id: ", res?.data);
      return res?.data;
    } catch (err: any) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to update web page"
      );
    }
  }
);

export const deleteWebPage = createAsyncThunk(
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

// 2. Initial State
const initialState = {
  loading: false,
  error: null as string | null,
  webPages: [],
};

// 3. Slice
const homeSlice = createSlice({
  name: "storefront",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(createWebpage.pending, (state) => {
        state.loading = true;
      })
      .addCase(createWebpage.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(createWebpage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to add webpage";
      })
      .addCase(getWebPages.pending, (state) => {
        state.loading = true;
      })
      .addCase(getWebPages.fulfilled, (state, action) => {
        state.loading = false;
        state.webPages = action?.payload;
      })
      .addCase(getWebPages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to  webpage";
      });
  },
});

export default homeSlice.reducer;
