import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/lib/axiosInstance";

// ADD CATEGORY THUNK
export const addCategory = createAsyncThunk(
  "categories/addCategory",
  async ({ data }: { data: any }, thunkAPI) => {
    try {
      const res = await axiosInstance.post(
        `dashboard/categories/add-categories`,
        data
      );
      console.log("✅ Add Category Response :", res.data);
      return res.data;
    } catch (err: any) {
      console.error("❌ Error adding Categories:", err);
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to add Category"
      );
    }
  }
);

// UPDATE CATEGORY THUNK
export const updateCategory = createAsyncThunk(
  "categories/updateCategory",
  async ({ data, id }: { data: any; id: number }, thunkAPI) => {
    try {
      const res = await axiosInstance.put(
        `dashboard/categories/update-category/${id}`,
        data
      );
      console.log("✅ Update Category Response :", res.data);
      return res.data;
    } catch (err: any) {
      console.error("❌ Error updating Categories:", err);
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to update Category"
      );
    }
  }
);

// FETCH CATEGORY THUNK
export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async (_, thunkAPI) => {
    try {
      const res = await axiosInstance.get(
        `dashboard/categories/list-categories`
      );
      console.log("✅ Fetch Category Response :", res.data);
      return res.data;
    } catch (err: any) {
      console.error("❌ Error fetching Categories:", err);
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to fetch Category"
      );
    }
  }
);

// 2. Initial State
const initialState = {
  categories: [],
  loading: false,
  error: null as string | null,
};

// 3. Slice
const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null; // reset error
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) || action.error.message || "Failed";
      });
  },
});
export default categorySlice.reducer;
