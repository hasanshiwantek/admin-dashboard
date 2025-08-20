import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/lib/axiosInstance";

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
  async (_, thunkAPI) => {
    try {
      const res = await axiosInstance.get(`dashboard/customers/get-customers`);
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
      });
  },
});
export default categorySlice.reducer;
