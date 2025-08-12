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

export const editCategory = createAsyncThunk(
  "categories/editCategory",
  async (
    {
      id,
      data,
      isFormData = false,
    }: { id: number; data: any; isFormData?: boolean },
    { rejectWithValue }
  ) => {
    try {
      const res = await axiosInstance.post(
        `dashboard/categories/update-categorySingle/${id}`,
        data,
        {
          headers: isFormData
            ? { "Content-Type": "multipart/form-data" }
            : undefined,
        }
      );
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err?.response?.data || err?.message);
    }
  }
);

// UPDATE CATEGORY THUNK
export const updateBulkCategory = createAsyncThunk(
  "categories/updateBulkCategory",
  async ({ data }: { data: any }, thunkAPI) => {
    try {
      const res = await axiosInstance.put(
        `dashboard/categories/update-bulk-category`,
        data
      );
      console.log("✅ Bulk Update Category Response :", res.data);
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

// FETCH CATEGORY  BY ID THUNK
export const fetchCategoryById = createAsyncThunk(
  "categories/fetchCategoryById",
  async ({ id }: { id: number }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(
        `dashboard/categories/category/${id}`
      );
      console.log("✅ Fetch Category By Id Response :", res.data);
      return res.data;
    } catch (err: any) {
      console.error("❌ Error fetching Category by id:", err);
      return rejectWithValue(
        err?.response?.data?.message || "Failed to fetch Category"
      );
    }
  }
);

// DELETE CATEGORY THUNK
export const deleteCategory = createAsyncThunk(
  "categories/deleteCategory",
  async (data: any, thunkAPI) => {
    try {
      const res = await axiosInstance.delete(
        `dashboard/categories/delete-categories`,
        data
      );
      console.log("✅ Delete Category Response :", res.data);
      return res.data;
    } catch (err: any) {
      console.error("❌ Error deleting Categories:", err);
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to delete Category"
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
      })
      .addCase(deleteCategory.fulfilled, (state: any, action) => {
        state.loading = false;
        const deletedIds = action.payload?.deletedIds || [];
        state.categories = {
          ...state.categories,
          data: state.categories.data.filter(
            (item: any) => !deletedIds.includes(item.id)
          ),
        };
      });
  },
});
export default categorySlice.reducer;
