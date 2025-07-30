import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/lib/axiosInstance";

// 1. Thunk with slight improvement
export const fetchAllOrders = createAsyncThunk(
  "orders/fetchAllOrders",
  async (
    { page, perPage }: { page: number; perPage: number | string },
    thunkAPI
  )=> {
    try {
      const res = await axiosInstance.get(`dashboard/orders/list-orders?page=${page}&pageSize=${perPage}`);
      console.log("✅ Order Response Data:", res.data);
      return res.data;
    } catch (err: any) {
      console.error("❌ Error fetching all orders:", err);
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to fetch orders"
      );
    }
  }
);

// UPDATE ORDER STATUS THUNK
export const updateOrderStatus = createAsyncThunk(
  "orders/updateOrderStatus",
  async ({ id, status }: { id: number; status: string }, thunkAPI) => {
    try {
      const response = await axiosInstance.patch(
        `/dashboard/orders/update-status/${id}`,
        { status }
      );
      return { id, status: response.data.status || status };
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to update status"
      );
    }
  }
);

// 2. Initial State
const initialState = {
  orders: [],
  loading: false,
  error: null as string | null,
};

// 3. Slice
const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllOrders.pending, (state) => {
        state.loading = true;
        state.error = null; // reset error
      })
      .addCase(fetchAllOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchAllOrders.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) || action.error.message || "Failed";
      })
      .addCase(updateOrderStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateOrderStatus.fulfilled, (state: any, action: any) => {
        const { id, status } = action.payload;
        const index = state.orders?.data?.findIndex((o: any) => o.id === id);
        if (index !== -1) {
          state.orders.data[index].status = status;
        }
        state.loading = false;
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});
export default orderSlice.reducer;
