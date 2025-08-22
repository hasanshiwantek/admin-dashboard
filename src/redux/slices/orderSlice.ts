import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/lib/axiosInstance";

// 1. Thunk with slight improvement
export const fetchAllOrders = createAsyncThunk(
  "orders/fetchAllOrders",
  async (
    { page, perPage }: { page: number; perPage: number | string },
    thunkAPI
  ) => {
    try {
      const res = await axiosInstance.get(
        `dashboard/orders/list-orders?page=${page}&pageSize=${perPage}`
      );
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

// FETCH ORDER BY KEYWORD
export const fetchOrderByKeyword = createAsyncThunk(
  "orders/fetchOrderByKeyword ",
  async (
    {
      page,
      perPage,
      keyword,
    }: { page: number; perPage: number | string; keyword: any },
    thunkAPI
  ) => {
    try {
      const res = await axiosInstance.get(
        `dashboard/orders/list-orders?page=${page}&pageSize=${perPage}&keyword=${keyword}`
      );
      console.log("✅ Search Order Response Data:", res.data);
      return res.data;
    } catch (err: any) {
      console.error("❌ Error fetching all orders:", err);
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to fetch orders"
      );
    }
  }
);

// ADD ORDER  THUNK
export const addOrder = createAsyncThunk(
  "orders/addOrder",
  async ({ data }: { data: any }, thunkAPI) => {
    try {
      const response = await axiosInstance.post(
        `dashboard/orders/add-orders`,
        data
      );
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to add order"
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

// UPDATE ORDER STATUS THUNK
export const advanceOrderSearch = createAsyncThunk(
  "orders/advanceOrderSearch",
  async ({ data }: { data: any }, thunkAPI) => {
    try {
      const response = await axiosInstance.post(
        `dashboard/orders/search-advanced`,
        data
      );
      console.log("Advance Order Search Response: ", response.data);

      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to update status"
      );
    }
  }
);

// EXPORT ORDERS THUNK
export const exportOrderCsv = createAsyncThunk(
  "product/exportOrderCsv",
  async ({ payload }: { payload: any }, thunkAPI) => {
    try {
      const response = await axiosInstance.get(
        "dashboard/orders/export-orders",
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

export const fetchAllShipments = createAsyncThunk(
  "orders/fetchAllShipments",
  async (
    { page, perPage }: { page: number; perPage: number | string },
    thunkAPI
  ) => {
    try {
      const res = await axiosInstance.get(
        `dashboard/shipments/list-shipment?page=${page}&pageSize=${perPage}`
      );
      console.log("✅ Order Response Data:", res.data);
      return res.data;
    } catch (err: any) {
      console.error("❌ Error fetching all shipment:", err);
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to fetch shipments"
      );
    }
  }
);

// 2. Initial State
const initialState = {
  orders: [],
  shipments: [],
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
      .addCase(fetchOrderByKeyword.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(advanceOrderSearch.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
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
      })
      .addCase(fetchAllShipments.pending, (state) => {
        state.loading = true;
        state.error = null; // reset error
      })
      .addCase(fetchAllShipments.fulfilled, (state, action) => {
        state.loading = false;
        state.shipments = action.payload;
      })
      .addCase(fetchAllShipments.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) || action.error.message || "Failed";
      });
  },
});
export default orderSlice.reducer;
