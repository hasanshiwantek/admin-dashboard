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
      return res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to add Customer"
      );
    }
  }
);
// LOGIN AS CUSTOMER THUNK
export const loginAsCustomer = createAsyncThunk(
  "customer/login-as-customer",
  async ({ customerId }: { customerId: any }, thunkAPI) => {
    try {
      const res = await axiosInstance.post(
        `dashboard/login-as-customer`,
        { customer_id: customerId }  // ← object properly pass karo
      );
      return res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to login customer"
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
      return res.data;
    } catch (err: any) {
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
      return res.data;
    } catch (err: any) {
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
      return res.data;
    } catch (err: any) {
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
      return res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to fetch Customer"
      );
    }
  }
);
export const fetchCustomerDetailById = createAsyncThunk(
  "customer/fetchCustomerById",
  async ({ id }: { id: any }, thunkAPI) => {
    try {
      const res = await axiosInstance.get(
        `dashboard/orders/customer/${id}/orders`
      );
      return res.data;
    } catch (err: any) {
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
      return res.data;
    } catch (err: any) {
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
      return res.data;
    } catch (err: any) {
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
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue("Failed to import CSV");
    }
  }
);

export const fetchCustomerAddresses = createAsyncThunk(
  "customer/fetchCustomerAddresses",
  async ({ customerId }: { customerId: number }, thunkAPI) => {
    try {
      const res = await axiosInstance.get(
        `dashboard/customer-address/list?customer_id=${customerId}`
      );
      return res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to fetch customer addresses"
      );
    }
  }
);
// DELETE customerAddressesDeleteMultiple THUNK
export const customerAddressesDeleteMultiple = createAsyncThunk(
  "customer/delete-multiple",
  async ({ data }: { data: any }, thunkAPI) => {
    try {
      const res = await axiosInstance.delete(
        `dashboard/customer-address/delete-multiple`,
        { data }
      );
      return res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to delete Customer"
      );
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
        type: String(response.headers["content-type"] ?? ""),
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
      return thunkAPI.rejectWithValue("Failed to Export CSV");
    }
  }
);
// ADD CUSTOMER ADDRESS
export const addCustomerAddress = createAsyncThunk(
  "customer/addCustomerAddress",
  async ({ data }: { data: any }, thunkAPI) => {
    try {
      const res = await axiosInstance.post(
        `dashboard/customer-address/store`,
        data
      );
      return res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to add address"
      );
    }
  }
);
// GET SINGLE ADDRESS
export const fetchCustomerAddressById = createAsyncThunk(
  "customer/fetchCustomerAddressById",
  async ({ addressId }: { addressId: number }, thunkAPI) => {
    try {
      const res = await axiosInstance.get(
        `dashboard/customer-address/show/${addressId}` // or adjust if backend uses different param
      );
      return res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to fetch address"
      );
    }
  }
);

// UPDATE ADDRESS
export const updateCustomerAddress = createAsyncThunk(
  "customer/updateCustomerAddress",
  async (
    { addressId, data }: { addressId: number | string; data: any },
    thunkAPI
  ) => {
    try {
      const res = await axiosInstance.put(
        `dashboard/customer-address/update/${addressId}`,
        data
      );
      return res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to update address"
      );
    }
  }
);
// 2. Initial State
const initialState = {
  customers: [],
  singleCustomer: null,
  customerAddresses: [],
  loading: false,
  addressesLoading: false,
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
      })


      .addCase(fetchCustomerDetailById.pending, (state) => {
        state.loading = true;
        state.error = null; // reset error
      })
      .addCase(fetchCustomerDetailById.fulfilled, (state, action) => {
        state.loading = false;
        state.singleCustomer = action?.payload?.data;
      })
      .addCase(fetchCustomerDetailById.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) || action.error.message || "Failed";
      })


      // Customer Addresses
      .addCase(fetchCustomerAddresses.pending, (state) => {
        state.addressesLoading = true;
        state.error = null;
      })
      .addCase(fetchCustomerAddresses.fulfilled, (state, action) => {
        state.addressesLoading = false;
        state.customerAddresses = action.payload?.data?.customer_addresses || action.payload?.customer_addresses || [];
      })
      .addCase(fetchCustomerAddresses.rejected, (state, action) => {
        state.addressesLoading = false;
        state.error =
          (action.payload as string) || action.error.message || "Failed to fetch addresses";
      })
  },
});
export default categorySlice.reducer;