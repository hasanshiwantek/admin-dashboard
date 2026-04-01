import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/lib/axiosInstance";

// 1. Thunk with slight improvement
// export const fetchAllOrders = createAsyncThunk(
//   "orders/fetchAllOrders",
//   async (
//     { page, perPage }: { page: number; perPage: number | string },
//     thunkAPI,
//   ) => {
//     try {
//       const res = await axiosInstance.get(
//         `dashboard/orders/list-orders?page=${page}&perPage=${perPage}`,
//       );
//       console.log("✅ Order Response Data:", res.data);
//       return res.data;
//     } catch (err: any) {
//       console.error("❌ Error fetching all orders:", err);
//       return thunkAPI.rejectWithValue(
//         err.response?.data?.message || "Failed to fetch orders",
//       );
//     }
//   },
// );
export const fetchAllOrders = createAsyncThunk(
  "orders/fetchAllOrders",
  async (
    { page, perPage, status }: { page: number; perPage: number | string; status?: string },
    thunkAPI,
  ) => {
    try {
      const params = new URLSearchParams({
        page: String(page),
        perPage: String(perPage),
        ...(status && status !== "All orders" && { status }), // ✅ only add if not "All orders"
      });

      const res = await axiosInstance.get(
        `dashboard/orders/list-orders?${params.toString()}`
      );
      return res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to fetch orders"
      );
    }
  },
);
// FETCH ORDER BY ID
export const fetchOrderById = createAsyncThunk(
  "orders/fetchOrderById",
  async ({ orderId }: { orderId: any }, thunkAPI) => {
    try {
      const res = await axiosInstance.get(
        `dashboard/orders/show-order/${orderId}`,
      );
      console.log("✅ Order Response Data By ID:", res.data);
      return res?.data;
    } catch (err: any) {
      console.error("❌ Error fetching order by id:", err);
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to fetch order",
      );
    }
  },
);

// FETCH ORDER BY KEYWORD
export const fetchOrderByKeyword = createAsyncThunk(
  "orders/fetchOrderByKeyword ",
  async (
    {
      page,
      perPage,
      keyword,
      status,
    }: { page: number; perPage: number | string; keyword: any; status?: string },
    thunkAPI,
  ) => {
    try {
      const params = new URLSearchParams({
        page: String(page),
        perPage: String(perPage),
        keyword: String(keyword),
        ...(status && status !== "All orders" && { status }), // ✅ only add if not "All orders"
      });
      const res = await axiosInstance.get(
        `dashboard/orders/list-orders?${params.toString()}`,
      );
      console.log("✅ Search Order Response Data:", res.data);
      return res.data;
    } catch (err: any) {
      console.error("❌ Error fetching all orders:", err);
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to fetch orders",
      );
    }
  },
);

// ADD ORDER  THUNK
export const addOrder = createAsyncThunk(
  "orders/addOrder",
  async ({ data }: { data: any }, thunkAPI) => {
    try {
      const response = await axiosInstance.post(
        `dashboard/orders/existing-customer`,
        data,
      );
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to add order",
      );
    }
  },
);

// ADD ORDER FOR NEW CUSTOMER  THUNK
export const addOrderForNewCustomer = createAsyncThunk(
  "orders/addOrderForNewCustomer",
  async ({ data }: { data: any }, thunkAPI) => {
    try {
      const response = await axiosInstance.post(
        `dashboard/orders/new-customer`,
        data,
      );
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to add order",
      );
    }
  },
);

// UPDATE ORDER STATUS THUNK
export const updateOrderStatus = createAsyncThunk(
  "orders/updateOrderStatus",
  async ({ id, status }: { id: any; status: string }, thunkAPI) => {
    try {
      const response = await axiosInstance.patch(
        `/dashboard/orders/update-status/${id}`,
        { status },
      );
      return { id, status: response.data.status || status };
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to update status",
      );
    }
  },
);

// UPDATE ORDER  THUNK
export const updateOrder = createAsyncThunk(
  "orders/updateOrder",
  async ({ id, data }: { id: any; data: any }, thunkAPI) => {
    try {
      const response = await axiosInstance.put(
        `dashboard/orders/update-order/${id}`,
        data,
      );
      console.log("✅ Updtate Order Response Data:", response.data);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to update order",
      );
    }
  },
);

// ADVANCE ORDER SEARCH THUNK
export const advanceOrderSearch = createAsyncThunk(
  "orders/advanceOrderSearch",
  async ({ data }: { data: any }, thunkAPI) => {
    try {
      const response = await axiosInstance.post(
        `dashboard/orders/search-advanced`,
        data,
      );
      console.log("Advance Order Search Response: ", response.data);

      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to update status",
      );
    }
  },
);

//PAYMENT INVOICE THUNK

export const printPaymentInvoice = createAsyncThunk(
  "orders/printPaymentInvoice",
  async ({ orderId }: { orderId: number | string }, thunkAPI) => {
    try {
      const response = await axiosInstance.get(
        `dashboard/orders/send-payment-invoice/${orderId}`,
      );

      return response.data; // This will be a Blob
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to download PDF",
      );
    }
  },
);

//PAYMENT INVOICE THUNK

export const printInvoicePdf = createAsyncThunk(
  "orders/printPaymentInvoicePdf",
  async ({ orderId }: { orderId: number | string }, thunkAPI) => {
    try {
      const response = await axiosInstance.get(
        `dashboard/orders/invoice/${orderId}`,

        {
          // ✅✅✅ This must be inside the request config
          responseType: "blob",
          headers: {
            Accept: "application/pdf",
          },
        },
      );

      return response.data; // This will be a Blob
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to download PDF",
      );
    }
  },
);

//PAYMENT INVOICE THUNK

export const refundOrder = createAsyncThunk(
  "orders/refundOrder",
  async ({ orderId }: { orderId: number | string }, thunkAPI) => {
    try {
      const response = await axiosInstance.post(
        `dashboard/orders/refund/${orderId}`,
      );

      console.log("Order refund Response: ", response?.data);
      return response.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to Refund Order",
      );
    }
  },
);

//RESEND INVOICE THUNK

export const resendInvoice = createAsyncThunk(
  "orders/resendInvoice",
  async ({ orderId }: { orderId: number | string }, thunkAPI) => {
    try {
      const response = await axiosInstance.post(
        `dashboard/orders/resend-invoice/${orderId}`,
      );

      return response.data; // This will be a Blob
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to resend invoice",
      );
    }
  },
);

//ORDER TIMELINE THUNK

export const orderTimeline = createAsyncThunk(
  "orders/orderTimeline",
  async ({ orderId }: { orderId: any }, thunkAPI) => {
    try {
      const response = await axiosInstance.get(
        `dashboard/orders/timeline/${orderId}`,
      );

      return response.data; // This will be a Blob
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to send orderTimeline",
      );
    }
  },
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
        },
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
  },
);

export const fetchAllShipments = createAsyncThunk(
  "orders/fetchAllShipments",
  async (
    { page, perPage }: { page: number; perPage: number | string },
    thunkAPI,
  ) => {
    try {
      const res = await axiosInstance.get(
        `dashboard/shipments/list-shipment?page=${page}&pageSize=${perPage}`,
      );
      console.log("✅ Shipments Response Data:", res.data);
      return res.data;
    } catch (err: any) {
      console.error("❌ Error fetching  shipments:", err);
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to fetch shipments",
      );
    }
  },
);

// ADD SHIPMENT ORDER
export const addShipmentOrder = createAsyncThunk(
  "orders/addShipmentOrder",
  async ({ data }: { data: any }, thunkAPI) => {
    try {
      const res = await axiosInstance.post(
        `dashboard/shipments/add-shipment`,
        data,
      );
      console.log("✅ Add Shipment Response Data:", res.data);
      return res.data;
    } catch (err: any) {
      console.error("❌ Error adding shipment:", err);
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to add shipments",
      );
    }
  },
);

// ADVANCE SEARCH SHIPMENT THUNK
export const advanceShipmentSearch = createAsyncThunk(
  "orders/advanceShipmentSearch",
  async ({ data }: { data: any }, thunkAPI) => {
    try {
      const response = await axiosInstance.post(
        `dashboard/shipments/advanced-search`,
        data,
      );
      console.log("Advance Shipment Search Response: ", response.data);

      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed in advancing search",
      );
    }
  },
);

// FETCH ORDER BY KEYWORD
export const fetchShipmentByKeyword = createAsyncThunk(
  "orders/fetchShipmentByKeyword",
  async (
    {
      page,
      perPage,
      keyword,
    }: { page: number; perPage: number | string; keyword: any },
    thunkAPI,
  ) => {
    try {
      const res = await axiosInstance.get(
        `dashboard/shipments/list-shipment?page=${page}&pageSize=${perPage}&keyword=${keyword}`,
      );
      console.log("✅ Search Shipment Response Data:", res.data);
      return res.data;
    } catch (err: any) {
      console.error("❌ Error fetching shipments:", err);
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to fetch shipments",
      );
    }
  },
);

// DELETE SHIPMENT THUNK
export const deleteShipment = createAsyncThunk(
  "order/deleteShipment",
  async ({ ids }: { ids: any }, thunkAPI) => {
    try {
      const res = await axiosInstance.delete(
        `dashboard/shipments/destroy-shipment`,
        {
          data: { ids }, // ✅ this wraps your array inside an object
        },
      );
      console.log("✅ Shipment Deletion response from thunk:", res.data);
      return res.data;
    } catch (err: any) {
      console.error("❌ Error deleting shipment:", err);
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to delete shipments",
      );
    }
  },
);

//PRINT PACKAGE SLIP LOGIC

export const fetchPackingSlipPdf = createAsyncThunk(
  "orders/fetchPackingSlipPdf",
  async ({ shipmentId }: { shipmentId: number | string }, thunkAPI) => {
    try {
      const response = await axiosInstance.get(
        `/dashboard/shipments/packing-slip/${shipmentId}`,
        {
          // ✅✅✅ This must be inside the request config
          responseType: "blob",
          headers: {
            Accept: "application/pdf",
          },
        },
      );

      return response.data; // This will be a Blob
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to download PDF",
      );
    }
  },
);

// IMPORT CSV THUNK
export const importTrackingNumbers = createAsyncThunk(
  "orders/importTrackingNumbers",
  async (formData: FormData, thunkAPI) => {
    try {
      const response = await axiosInstance.post(
        "dashboard/tracking/import",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
      console.log("✅ Import Csv Response  From Thunk:", response.data);

      return response.data;
    } catch (error: any) {
      console.error("❌ Error Importing CSV:", error);
      return thunkAPI.rejectWithValue("Failed to import CSV");
    }
  },
);

// ADVANCE RETURN ORDER SEARCH THUNK
export const advanceReturnOrderSearch = createAsyncThunk(
  "orders/advanceReturnOrderSearch",
  async ({ data }: { data: any }, thunkAPI) => {
    try {
      const response = await axiosInstance.post(
        `dashboard/tracking/search-advanced`,
        data,
      );
      console.log("Advance Order Search Response: ", response.data);

      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to update status",
      );
    }
  },
);

// DRAFT ORDERS
export const fetchDraftOrders = createAsyncThunk(
  "orders/fetchDraftOrders",
  async ({ isDraft }: { isDraft: any }, thunkAPI) => {
    try {
      const res = await axiosInstance.get(
        `dashboard/orders/get-draft-order?isDraft=${isDraft}`,
      );
      console.log("✅ Draft Order Response Data:", res.data);
      return res.data;
    } catch (err: any) {
      console.error("❌ Error fetching draft orders:", err);
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to fetch draft orders",
      );
    }
  },
);

// DELETE DRAFT ORDERS
export const deleteDraftOrders = createAsyncThunk(
  "orders/deleteDraftOrders",
  async ({ id }: { id: any }, thunkAPI) => {
    try {
      const res = await axiosInstance.delete(
        `dashboard/orders/delete-draft/${id}`,
      );
      console.log("✅ Draft Delete Response Data:", res.data);
      return res.data;
    } catch (err: any) {
      console.error("❌ Error deleting draft order:", err);
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to delete draft order",
      );
    }
  },
);

export const getReturnOrders = createAsyncThunk(
  "orders/getReturnOrders",
  async (_, thunkAPI) => {
    try {
      const res = await axiosInstance.get(`dashboard/orders/get-return-order`);
      console.log("✅ Return Response Data:", res.data);
      return res.data;
    } catch (err: any) {
      console.error("❌ Error fetching returns:", err);
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to fetch returns",
      );
    }
  },
);

// 2. Initial State
const initialState = {
  orders: [],
  shipments: [],
  singleOrder: null,
  loading: false,
  error: null as string | null,
  draftOrder: [],
  returnLoader: false,
  returnOrders: [],
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
      .addCase(fetchOrderById.fulfilled, (state, action) => {
        state.loading = false;
        state.singleOrder = action.payload.data;
        console.log("Fulfilled response: ", state.singleOrder);
      })
      .addCase(fetchOrderByKeyword.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrderByKeyword.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrderByKeyword.rejected, (state, action) => {
        state.loading = false;
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
      })
      .addCase(advanceShipmentSearch.fulfilled, (state, action) => {
        state.loading = false;
        state.shipments = action.payload;
      })
      .addCase(fetchShipmentByKeyword.fulfilled, (state, action) => {
        state.loading = false;
        state.shipments = action.payload;
      })
      .addCase(fetchDraftOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchDraftOrders.pending, (state) => {
        state.loading = true;
        state.error = null; // reset error
      })
      .addCase(fetchDraftOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.draftOrder = action.payload;
      })

      .addCase(getReturnOrders.rejected, (state, action) => {
        state.returnLoader = false;
        state.error = action.payload as string;
      })
      .addCase(getReturnOrders.pending, (state) => {
        state.returnLoader = true;
        state.error = null; // reset error
      })
      .addCase(getReturnOrders.fulfilled, (state, action) => {
        state.returnLoader = false;
        state.returnOrders = action.payload;
      });
    // builder.addCase(deleteDraftOrders.fulfilled, (state, action) => {
    //   state.draftOrder = state.draftOrder?.data?.filter(
    //     (order: any) => order?.order?.id !== action.meta.arg.id
    //   );
    // });
  },
});
export default orderSlice.reducer;
function rejectWithValue(arg0: any): any {
  throw new Error("Function not implemented.");
}
