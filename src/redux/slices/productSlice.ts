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

//QUERY SEARCH
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

//PRODUCT UPDATION THUNK
export const updateProduct = createAsyncThunk(
  "product/updateProduct",
  async ({ body }: { body: any }, thunkAPI) => {
    try {
      const res = await axiosInstance.put(
        `dashboard/products/update-product`,
        body
      );
      console.log("✅ Updation Product response from thunk:", res.data);
      return res.data;
    } catch (err: any) {
      console.error("❌ Error Updating Product:", err);
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to update products"
      );
    }
  }
);

//PROODUCT DELETION THUNK
export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async ({ ids }: { ids: number[] }, thunkAPI) => {
    try {
      const res = await axiosInstance.delete(
        `dashboard/products/delete-product`,
        {
          data: { ids }, // ✅ this wraps your array inside an object
        }
      );
      console.log("✅ Product Deletion response from thunk:", res.data);
      return res.data;
    } catch (err: any) {
      console.error("❌ Error deleting Product:", err);
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to delete products"
      );
    }
  }
);

//ADVANCED SEARCH PRODUCT
export const advanceSearchProduct = createAsyncThunk(
  "product/advanceSearchProduct",
  async ({ data }: { data: any }, thunkAPI) => {
    try {
      const res = await axiosInstance.post(
        `dashboard/products/advanced-search`,
        data
      );
      console.log("✅ Advanced Search Product Response  Data:", res.data);
      return res.data;
    } catch (err: any) {
      console.error("❌ Error Searching  Product:", err);
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to search products"
      );
    }
  }
);

export const addProduct = createAsyncThunk(
  "product/addProduct",
  async ({ data }: { data: any }, thunkAPI) => {
    try {
      const res = await axiosInstance.post(
        `dashboard/products/add-product`,
        data
      );
      console.log("✅ Add Product Response  From Thunk:", res.data);
      return res.data;
    } catch (err: any) {
      console.error("❌ Error Adding  Product:", err);
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to Add products"
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
      })
      .addCase(deleteProduct.fulfilled, (state: any, action) => {
        state.loading = false;

        const deletedIds = action.payload?.deletedIds || [];

        state.products = {
          ...state.products,
          data: state.products.data.filter(
            (item: any) => !deletedIds.includes(item.id)
          ),
        };
      })
      .addCase(advanceSearchProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      });
  },
});
export const { setSelectedProducts, clearSelectedProducts } =
  productSlice.actions;
export default productSlice.reducer;
