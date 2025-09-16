import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/lib/axiosInstance";
import { AnyARecord } from "node:dns";

// ADD CUSTOMER THUNK
export const addCustomer = createAsyncThunk(
  "customer/addCustomer",
  async ({ data }: { data: any }, thunkAPI) => {
    try {
      const res = await axiosInstance.post(
        `dashboard/customers/add-customer`,
        data
      );
      console.log("✅ Add Customer Response :", res.data);
      return res.data;
    } catch (err: any) {
      console.error("❌ Error adding Customer:", err);
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to add Customer"
      );
    }
  }
);

// FETCH CUSTOMERS THUNK
export const fetchCustomers = createAsyncThunk(
  "customer/fetchCustomers",
  async (
    { page, pageSize }: { page: number; pageSize: number | string },
    thunkAPI
  ) => {
    try {
      const res = await axiosInstance.get(
        `dashboard/customers/get-customers?page=${page}&pageSize=${pageSize}`
      );
      console.log("✅ Fetch Customers Response :", res.data);
      return res.data;
    } catch (err: any) {
      console.error("❌ Error fetching Customer:", err);
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to fetch Customer"
      );
    }
  }
);

// FETCH CUSTOMERS THUNK
export const advanceCustomerSearch = createAsyncThunk(
  "customer/advanceCustomerSearch",
  async ({ data }: { data: any }, thunkAPI) => {
    try {
      const res = await axiosInstance.post(
        `dashboard/customers/customer-search`,
        data
      );
      console.log("✅ Advance Search Customers Response :", res.data);
      return res.data;
    } catch (err: any) {
      console.error("❌ Error Searching Customer:", err);
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to Search Customer"
      );
    }
  }
);

// FETCH CUSTOMERS THUNK
export const fetchCustomerByKeyword = createAsyncThunk(
  "customer/fetchCustomerByKeyword",
  async (
    {
      page,
      pageSize,
      search,
    }: { page: number; pageSize: number | string; search: any },
    thunkAPI
  ) => {
    try {
      const res = await axiosInstance.get(
        `dashboard/customers/get-customers?page=${page}&pageSize=${pageSize}&search=${search}`
      );
      console.log("✅ Keyword Fetch Customers Response :", res.data);
      return res.data;
    } catch (err: any) {
      console.error("❌ Error fetching Customer:", err);
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to fetch Customer"
      );
    }
  }
);

// FETCH CUSTOMERS THUNK
export const fetchCustomerById = createAsyncThunk(
  "customer/fetchCustomerById",
  async ({ id }: { id: any }, thunkAPI) => {
    try {
      const res = await axiosInstance.get(
        `dashboard/customers/get-customer/${id}`
      );
      console.log("✅ Fetch Customer Response :", res.data);
      return res.data;
    } catch (err: any) {
      console.error("❌ Error fetching Customer:", err);
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to fetch Customer"
      );
    }
  }
);

// DELETE CUSTOMER THUNK
export const deleteCustomer = createAsyncThunk(
  "customer/deleteCustomer",
  async ({ data }: { data: any }, thunkAPI) => {
    try {
      const res = await axiosInstance.delete(
        `dashboard/customers/delete-customer`,
        { data }
      );
      console.log("✅ Delete Customer Response :", res.data);
      return res.data;
    } catch (err: any) {
      console.error("❌ Error deleting Customer:", err);
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to delete Customer"
      );
    }
  }
);

export const updateCustomer = createAsyncThunk(
  "customer/updateCustomer",
  async ({ data, id }: { data: any; id: any }, thunkAPI) => {
    try {
      const res = await axiosInstance.put(
        `dashboard/customers/update-customer/${id}`,
        data
      );
      console.log("✅ Update Customer Response :", res.data);
      return res.data;
    } catch (err: any) {
      console.error("❌  Error UpdatingCustomer:", err);
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to update Customer"
      );
    }
  }
);

// IMPORT CSV THUNK
export const importCustomerCsv = createAsyncThunk(
  "customer/importCustomerCsv",
  async (formData: FormData, thunkAPI) => {
    try {
      const response = await axiosInstance.post(
        "dashboard/customers/import",
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

// EXPORT CSV THUNK
export const exportCustomerCsv = createAsyncThunk(
  "customer/exportCustomerCsv",
  async ({ payload }: { payload: any }, thunkAPI) => {
    try {
      const response = await axiosInstance.get("dashboard/customers/export", {
        params: payload,
        responseType: "blob", // 👈 critical for file download
      });

      // Create a blob URL for the file
      const blob = new Blob([response.data], {
        type: response.headers["content-type"],
      });
      const downloadUrl = URL.createObjectURL(blob);

      // Get the file name from content-disposition header (if present)
      const disposition = response.headers["content-disposition"];
      let filename = "customer_export.xlsx";
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
  customers: [],
  loading: false,
  error: null as string | null,
};

// 3. Slice
const categorySlice = createSlice({
  name: "customer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomers.pending, (state) => {
        state.loading = true;
        state.error = null; // reset error
      })
      .addCase(fetchCustomers.fulfilled, (state, action) => {
        state.loading = false;
        state.customers = action.payload;
      })
      .addCase(fetchCustomers.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) || action.error.message || "Failed";
      })
      .addCase(advanceCustomerSearch.fulfilled, (state, action) => {
        state.loading = false;
        state.customers = action.payload;
      })
      .addCase(fetchCustomerByKeyword.fulfilled, (state, action) => {
        state.loading = false;
        state.customers = action.payload;
      })
      .addCase(deleteCustomer.fulfilled, (state: any, action) => {
        state.loading = false;
        const deletedIds = action.payload?.deletedIds || [];
        state.customers = {
          ...state.customers,
          data: state.customers.data.filter(
            (item: any) => !deletedIds.includes(item.id)
          ),
        };
      });
  },
});
export default categorySlice.reducer;
