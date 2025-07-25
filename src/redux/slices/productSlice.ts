import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/lib/axiosInstance";

// 1. Thunk with slight improvement
export const fetchAllProducts = createAsyncThunk(
  "product/fetchAllProducts",
  async (
    { page, pageSize }: { page: number; pageSize: number | string },
    thunkAPI
  ) => {
    try {
      const res = await axiosInstance.get(
        `dashboard/products/products-list?page=${page}&pageSize=${pageSize}`
      );
      console.log("✅ Products Response Data:", res.data);
      return res.data;
    } catch (err: any) {
      console.error("❌ Error in fetchAllProducts:", err);
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to fetch products"
      );
    }
  }
);

export const searchAllProducts = createAsyncThunk(
  "product/searchAllProducts",
  async ({ query }: { query: any }, thunkAPI) => {
    try {
      const res = await axiosInstance.get(
        `dashboard/products/search-product?query=${query}`
      );
      console.log("✅ Search Product Response  Data:", res.data);
      return res.data;
    } catch (err: any) {
      console.error("❌ Error Searching  Product:", err);
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to search products"
      );
    }
  }
);

// 2. Initial State
const initialState = {
  products: [],
  loading: false,
  error: null as string | null,
  selectedProducts: [],
};

// 3. Slice
const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setSelectedProducts: (state, action) => {
      state.selectedProducts = action.payload;
    },
    clearSelectedProducts: (state) => {
      state.selectedProducts = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.pending, (state) => {
        state.loading = true;
        state.error = null; // reset error
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) || action.error.message || "Failed";
      })
      .addCase(searchAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      });
  },
});
export const { setSelectedProducts, clearSelectedProducts } =
  productSlice.actions;
export default productSlice.reducer;
