import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/lib/axiosInstance";
import { headers } from "next/headers";

export const fetchAllProducts = createAsyncThunk(
  "product/fetchAllProducts",
  // Accepts any filters (basic listing, tab filters, or advanced-search fields)
  // and forwards every defined value to the products-list endpoint. This is why
  // it can replace the old advanced-search call.
  async (args: Record<string, any>, thunkAPI) => {
    try {
      const params = new URLSearchParams();
      Object.entries(args || {}).forEach(([key, value]) => {
        if (value === undefined || value === null || value === "") return;
        if (Array.isArray(value)) {
          value.forEach((v) => {
            if (v !== undefined && v !== null && v !== "") {
              params.append(key, String(v));
            }
          });
        } else if (typeof value === "boolean") {
          params.append(key, value ? "1" : "0");
        } else {
          params.append(key, String(value));
        }
      });

      const res = await axiosInstance.get(
        `dashboard/products/products-list?${params.toString()}`
      );
      return res.data;
    } catch (err: any) {
      console.error("❌ Error in fetchAllProducts:", err);
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to fetch products"
      );
    }
  }
);
export const fetchAllPurchasableProducts = createAsyncThunk(
  "product/fetchAllPurchasableProducts",
  async (
    {
      page,
      pageSize,
      isName,
      isFeatured,
      isVisible,
      freeShipping,
      outOfStock,
      inventoryLow,
      lastImported,
    }: {
      page: number;
      pageSize: number | string;
      isName?: string;
      isFeatured?: boolean;
      isVisible?: boolean;
      freeShipping?: boolean;
      outOfStock?: boolean;
      inventoryLow?: boolean;
      lastImported?: boolean;
    },
    thunkAPI
  ) => {
    try {
      const params = new URLSearchParams({
        page: String(page),
        pageSize: String(pageSize),
      });

      if (isName?.trim()) params.set("isName", isName.trim());
      if (isFeatured !== undefined) params.set("isFeatured", String(isFeatured));
      if (isVisible !== undefined) params.set("isVisible", String(isVisible));
      if (freeShipping !== undefined) params.set("freeShipping", String(freeShipping));
      if (outOfStock !== undefined) params.set("outOfStock", String(outOfStock));
      if (inventoryLow !== undefined) params.set("inventoryLow", String(inventoryLow));
      if (lastImported !== undefined) params.set("lastImported", String(lastImported));

      const res = await axiosInstance.get(
        `dashboard/products/purchasable-products?${params.toString()}`
      );
      return res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to fetch products"
      );
    }
  }
);
export const fetchFilterProducts = createAsyncThunk(
  "product/fetchFilterProducts",
  async (
    { category, isName }: { category: any; isName: string },
    thunkAPI
  ) => {
    try {
      const res = await axiosInstance.get("dashboard/products/products-filter", {
        params: {
          ...(category?.length ? { isCategory: Array.isArray(category) ? category.join(",") : category } : {}),
          ...(isName ? { isName } : {}),

        },
      });
      return res.data;
    } catch (err: any) {
      console.error("❌ Error in fetchFilterProducts:", err);
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
      return res.data;
    } catch (err: any) {
      console.error("❌ Error deleting Product:", err);
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to delete products"
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
        { data }
      );

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

      return response.data;
    } catch (error: any) {
      console.error("❌ Error fetching  Brand:", error);
      return thunkAPI.rejectWithValue("Failed to fetch brands");
    }
  }
);

// GET BRAND THUNK
export const fetchBrandByKeyword = createAsyncThunk(
  "product/fetchBrandByKeyword",
  async (
    {
      page,
      pageSize,
      keyword,
    }: { page: number; pageSize: number | string; keyword: any },
    thunkAPI
  ) => {
    try {
      const response = await axiosInstance.get(
        `dashboard/brands/brand-list?page=${page}&pageSize=${pageSize}&keyword=${keyword}`
      );

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
      return response.data;
    } catch (error: any) {
      console.error("❌ Error Importing CSV:", error);
      return thunkAPI.rejectWithValue("Failed to import CSV");
    }
  }
);

// EXPORT PRODUCTS THUNK
export const exportCsv = createAsyncThunk(
  "product/exportProductCsv",
  async (
    {
      payload,
      onProgress,
    }: {
      payload: any;
      onProgress?: (percent: number) => void;
    },
    thunkAPI,
  ) => {
    try {
      const response = await axiosInstance.get(
        "dashboard/products/export-csv",
        {
          params: payload,
          responseType: "blob",
          onDownloadProgress: (progressEvent) => {
            
            const loaded = progressEvent.loaded ?? 0;
            const total = progressEvent.total;

            if (total && total > 0) {
              const percent = Math.round((loaded * 100) / total);
              onProgress?.(Math.min(100, Math.max(0, percent)));
            } else {
              // no Content-Length — show movement without hitting 100
              const fake = Math.min(90, Math.round(loaded / 1024) % 90);
              onProgress?.(fake || 10);
            }
          },
        },
      );

      const blob = new Blob([response.data], {
        type: String(response.headers["content-type"] ?? "text/csv"),
      });

      const format = String(payload?.fileFormat || "csv").replace(/^\./, "");
      const today = new Date().toISOString().slice(0, 10);
      let filename = `products-${today}.${format}`;

      const disposition = response.headers["content-disposition"];
      if (disposition && disposition.includes("filename=")) {
        filename = disposition
          .split("filename=")[1]
          .split(";")[0]
          .replace(/"/g, "")
          .trim();
      }

      onProgress?.(100);
      return { blob, filename };
    } catch (error: any) {
      console.error("❌ Error Exporting CSV:", error);
      return thunkAPI.rejectWithValue("Failed to Export CSV");
    }
  },
);
// 2. Initial State
const initialState = {
  products: [],
  filterProducts: [],
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
    resetSingleProduct: (state) => {
      state.singleProduct = [];
      state.loading = false;
      state.error = null;
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


      .addCase(fetchFilterProducts.pending, (state) => {
        state.loading = true;
        state.error = null; // reset error
      })
      .addCase(fetchFilterProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.filterProducts = action.payload;
      })
      .addCase(fetchFilterProducts.rejected, (state, action) => {
        state.loading = false;
        state.filterProducts = []; // Clear previous results on error
        state.error =
          (action.payload as string) || action.error.message || "Failed";
      })

      .addCase(searchAllProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(searchAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(searchAllProducts.rejected, (state, action) => {
        state.loading = false;
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
      .addCase(fetchBrandByKeyword.fulfilled, (state, action) => {
        state.loading = false;
        state.brands = action.payload;
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
      });
  },
});
export const { setSelectedProducts, clearSelectedProducts, resetSingleProduct } =
  productSlice.actions;
export default productSlice.reducer;
