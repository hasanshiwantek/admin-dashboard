import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/lib/axiosInstance";
import { headers } from "next/headers";

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

export const fetchSingleProduct = createAsyncThunk(
  "product/fetchSingleProduct",
  async ({ id }: { id: any }, thunkAPI) => {
    try {
      const res = await axiosInstance.get(`dashboard/products/product/${id}`);
      console.log("✅ Product Response Data By Id:", res.data);
      return res.data;
    } catch (err: any) {
      console.error("❌ Error in fetching:", err);
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to fetch product"
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

export const updateProductFormData = createAsyncThunk(
  "product/updateProductFormData",
  async ({ id, data }: { id: number; data: FormData }, thunkAPI) => {
    try {
      const res = await axiosInstance.post(
        `dashboard/products/update-single-product/${id}`,
        data,
        {
          headers: { "content-Type": "multipart/form-data" },
        }
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

// ADD PRODUCT THUNK
export const addProduct = createAsyncThunk(
  "product/addProduct",
  async ({ data }: { data: any }, thunkAPI) => {
    try {
      const res = await axiosInstance.post(
        `dashboard/products/add-product`,
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
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

//DELETE PRODUCT CATEGORY THUNK
export const deleteProductCategory = createAsyncThunk(
  "product/deleteProductCategory",
  async ({ data }: { data: any }, thunkAPI) => {
    try {
      const response = await axiosInstance.delete(
        `dashboard/products/delete-product/categories`,
       {data}
      );

      console.log("✅ Delete Product Category Response:", response.data);
      return response.data;
    } catch (error: any) {
      console.error("❌ Error Deleting Product Category:", error);
      return thunkAPI.rejectWithValue("Failed to delete Product Category");
    }
  }
);

// ADD BRAND THUNK
export const addBrand = createAsyncThunk(
  "product/addBrand",
  async (formData: FormData, thunkAPI) => {
    try {
      const response = await axiosInstance.post(
        "dashboard/brands/add-brand",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("✅ Add Brand Response  From Thunk:", response.data);

      return response.data;
    } catch (error: any) {
      console.error("❌ Error Adding Brand:", error);
      return thunkAPI.rejectWithValue("Failed to create brand");
    }
  }
);

// GET BRAND THUNK
export const fetchBrands = createAsyncThunk(
  "product/fetchBrands",
  async (
    { page, pageSize }: { page: number; pageSize: number | string },
    thunkAPI
  ) => {
    try {
      const response = await axiosInstance.get(
        `dashboard/brands/brand-list?page=${page}&pageSize=${pageSize}`
      );
      console.log("✅  Brand Response  From Thunk:", response.data);

      return response.data;
    } catch (error: any) {
      console.error("❌ Error fetching  Brand:", error);
      return thunkAPI.rejectWithValue("Failed to fetch brands");
    }
  }
);

// GET BRAND BY ID THUNK
export const getBrandById = createAsyncThunk(
  "product/getBrandById",
  async (id: any, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`dashboard/brands/brand/${id}`);
      console.log("✅  Brand Response  From Thunk Thru Id:", response.data);

      return response.data.data;
    } catch (error: any) {
      console.error("❌ Error fetching  Brand id:", error);
      return thunkAPI.rejectWithValue("Failed to fetch brand");
    }
  }
);

// UPDATE BRAND THUNK
export const updateBrand = createAsyncThunk(
  "product/updateBrand",
  async ({ id, formData }: { id: any; formData: FormData }, thunkAPI) => {
    try {
      const response = await axiosInstance.post(
        `dashboard/brands/update-brand/${id}`,
        formData
      );

      console.log("✅ Update Brand Response:", response.data);
      return response.data;
    } catch (error: any) {
      console.error("❌ Error Updating Brand:", error);
      return thunkAPI.rejectWithValue("Failed to update brand");
    }
  }
);

// DELETE BRAND THUNK
export const deleteBrand = createAsyncThunk(
  "product/updateBrand",
  async ({ id }: { id: any }, thunkAPI) => {
    try {
      const response = await axiosInstance.delete(
        `dashboard/brands/delete-brand/${id}`
      );

      console.log("✅ Delete Brand Response:", response.data);
      return response.data;
    } catch (error: any) {
      console.error("❌ Error Deleting Brand:", error);
      return thunkAPI.rejectWithValue("Failed to delete brand");
    }
  }
);

// IMPORT CSV THUNK
export const importCsv = createAsyncThunk(
  "product/importCsv",
  async (formData: FormData, thunkAPI) => {
    try {
      const response = await axiosInstance.post(
        "dashboard/products/import-csv",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("✅ Import Csv Response  From Thunk:", response.data);

      return response.data;
    } catch (error: any) {
      console.error("❌ Error Importing CSV:", error);
      return thunkAPI.rejectWithValue("Failed to import CSV");
    }
  }
);

// EXPORT PRODUCTS THUNK
export const exportCsv = createAsyncThunk(
  "product/exportCsv",
  async ({ payload }: { payload: any }, thunkAPI) => {
    try {
      const response = await axiosInstance.get(
        "dashboard/products/export-csv",
        {
          params: payload,
          responseType: "blob", // 👈 critical for file download
        }
      );

      // Create a blob URL for the file
      const blob = new Blob([response.data], {
        type: response.headers["content-type"],
      });
      const downloadUrl = URL.createObjectURL(blob);

      // Get the file name from content-disposition header (if present)
      const disposition = response.headers["content-disposition"];
      let filename = "products_export.xlsx";
      if (disposition && disposition.includes("filename=")) {
        filename = disposition
          .split("filename=")[1]
          .split(";")[0]
          .replace(/"/g, "");
      }

      // Trigger the download
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      link.remove();

      return "Export successful";
    } catch (error: any) {
      console.error("❌ Error Exporting CSV:", error);
      return thunkAPI.rejectWithValue("Failed to Export CSV");
    }
  }
);

// 2. Initial State
const initialState = {
  products: [],
  singleProduct: [],
  brands: [],
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
      .addCase(fetchSingleProduct.pending, (state) => {
        state.loading = true;
        state.error = null; // reset error
      })
      .addCase(fetchSingleProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.singleProduct = action.payload;
      })
      .addCase(fetchSingleProduct.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) || action.error.message || "Failed";
      })
      .addCase(fetchBrands.pending, (state) => {
        state.loading = true;
        state.error = null; // reset error
      })
      .addCase(fetchBrands.fulfilled, (state, action) => {
        state.loading = false;
        state.brands = action.payload;
      })
      .addCase(fetchBrands.rejected, (state, action) => {
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
