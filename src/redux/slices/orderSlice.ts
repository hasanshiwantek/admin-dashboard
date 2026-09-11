import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/lib/axiosInstance";

// 1. Thunk with slight improvement
export const fetchAllOrders = createAsyncThunk(
  "orders/fetchAllOrders",
  async (
    { page, perPage, status, productId }: { page: number; perPage: number | string; status?: string, productId?: string },
    thunkAPI,
  ) => {
    try {
      const params = new URLSearchParams({
        page: String(page),
        perPage: String(perPage),
        ...(status && status !== "All orders" && { status }), // ✅ only add if not "All orders"
        ...(productId && { productId: String(productId) }), // ✅ correct
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

// FETCH DASHBOARD ORDER OVERVIEW
export const fetchDashboardOrderOverview = createAsyncThunk(
  "orders/fetchDashboardOrderOverview",
  async (
    {
      status,
      page = 1,
      perPage = 10,
    }: {
      status?: string;
      page?: number;
      perPage?: number | string;
    },
    thunkAPI,
  ) => {
    try {
      const params = new URLSearchParams({
        page: String(page),
        perPage: String(perPage),
        ...(status && { status }),
      });

      const response = await axiosInstance.get(
        `dashboard/orders/dashboard/overview?${params.toString()}`,
      );

      return response.data;
    } catch (error: any) {
      console.error(
        "❌ Error fetching dashboard order overview:",
        error,
      );

      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
        "Failed to fetch dashboard orders",
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
      return res?.data;
    } catch (err: any) {
      console.error("❌ Error fetching order by id:", err);
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to fetch order",
      );
    }
  },
);
// FETCH shipment BY ORDER ID
export const shipmentByOrderId = createAsyncThunk(
  "orders/shipment-by-order",
  async ({ orderId }: { orderId: any }, thunkAPI) => {
    try {
      const res = await axiosInstance.get(
        `dashboard/shipments/shipment-by-order?order_id=${orderId}`,
      );
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
        ...(status && status !== "All orders" && { status }), //  only add if not "All orders"
      });
      const res = await axiosInstance.get(
        `dashboard/orders/list-orders?${params.toString()}`,
      );
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
export const capturePayment = createAsyncThunk(
  "orders/capturePayment",
  async ({ payment_intent_id }: { payment_intent_id: string }, thunkAPI) => {
    try {
      const response = await axiosInstance.post("dashboard/stripe/capture", {
        payment_intent_id,
      });
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to capture payment"
      );
    }
  }
);
export const captureMultiplePayment = createAsyncThunk(
  "orders/capturePayment",
  async (
    {
      payment_intent_id,
    }: {
      payment_intent_id: string | string[];
    },
    thunkAPI,
  ) => {
    try {
      const response = await axiosInstance.post("dashboard/stripe/capture", {
        payment_intent_id,
      });
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to capture payment",
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
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to update order",
      );
    }
  },
);
export const updateShipment = createAsyncThunk(
  "orders/update-shipment",
  async ({ id, data }: { id: any; data: any }, thunkAPI) => {
    try {
      const response = await axiosInstance.put(
        `dashboard/shipments/update-shipment/${id}`,
        data,
      );
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
      const response = await axiosInstance.get(
        `dashboard/orders/search-advanced`,
        { params: data },
      );
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
          //  This must be inside the request config
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
export const printMultiInvoicePdf = createAsyncThunk(
  "orders/printMultiInvoicePdf",
  async (orderIds: Array<number | string | { id?: number | string }>, thunkAPI) => {
    try {
      const ids = orderIds
        .map((item) => (typeof item === "object" && item !== null ? item.id : item))
        .filter((id): id is number | string => id !== undefined && id !== null && id !== "");

      if (!ids.length) {
        return thunkAPI.rejectWithValue("No order IDs provided");
      }

      const response = await axiosInstance.get(
        `dashboard/orders/invoice/${ids.join(",")}`,
        {
          responseType: "blob",
          headers: {
            Accept: "application/pdf",
          },
        },
      );

      return response.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to download PDF",
      );
    }
  },
);
export const printPackingSlipPdf = createAsyncThunk(
  "orders/printPackingSlipPdf",
  async ({ orderId }: { orderId: number | string }, thunkAPI) => {
    try {
      const response = await axiosInstance.get(
        `dashboard/shipments/packing-slip/${orderId}`,

        {
          //  This must be inside the request config
          responseType: "blob",
          headers: {
            Accept: "application/pdf",
          },
        },
      );

      return response.data; // This will be a Blob
    } catch (err: any) {
      let message = "Failed to download PDF";

      if (err.response?.data instanceof Blob) {
        try {
          const text = await err.response.data.text();
          const errorData = JSON.parse(text);

          message = errorData?.message || message;
        } catch {
          // fallback message
        }
      } else {
        message = err.response?.data?.message || message;
      }

      return thunkAPI.rejectWithValue(message);
    }
  },
);
export const printMultiPackingSlipPdf = createAsyncThunk(
  "orders/printMultiPackingSlipPdf",
  async (
    orderIds: Array<number | string | { id?: number | string }>,
    thunkAPI,
  ) => {
    try {
      const ids = orderIds
        .map((item) =>
          typeof item === "object" && item !== null ? item.id : item,
        )
        .filter(
          (id): id is number | string =>
            id !== undefined && id !== null && id !== "",
        );

      if (!ids.length) {
        return thunkAPI.rejectWithValue("No order IDs provided");
      }

      const response = await axiosInstance.get(
        `dashboard/shipments/packing-slip/${ids.join(",")}`,
        {
          responseType: "blob",
          headers: {
            Accept: "application/pdf",
          },
        },
      );

      return response.data;
    } catch (err: any) {
      let message = "Failed to download PDF";

      if (err.response?.data instanceof Blob) {
        try {
          const text = await err.response.data.text();
          const errorData = JSON.parse(text);
          message = errorData?.message || message;
        } catch {
          // fallback message
        }
      } else {
        message = err.response?.data?.message || message;
      }

      return thunkAPI.rejectWithValue(message);
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
        type: String(response.headers["content-type"] ?? ""),
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
// export const advanceShipmentSearch = createAsyncThunk(
//   "orders/advanceShipmentSearch",
//   async ({ data }: { data: any }, thunkAPI) => {
//     try {
//       const response = await axiosInstance.post(
//         `dashboard/shipments/advanced-search`,
//         data,
//       );
//       return response.data;
//     } catch (error: any) {
//       return thunkAPI.rejectWithValue(
//         error.response?.data?.message || "Failed in advancing search",
//       );
//     }
//   },
// );

export const advanceShipmentSearch = createAsyncThunk(
  "orders/advanceShipmentSearch",
  async ({ data }: { data: any }, thunkAPI) => {
    try {
      const params: Record<string, any> = {};

      const keyword = data.keyword ?? data.keywords;
      if (keyword) params.keyword = keyword;

      if (data.shipmentIdFrom) params.shipmentIdFrom = data.shipmentIdFrom;
      if (data.shipmentIdTo) params.shipmentIdTo = data.shipmentIdTo;
      if (data.orderIdFrom) params.orderIdFrom = data.orderIdFrom;
      if (data.orderIdTo) params.orderIdTo = data.orderIdTo;

      if (data.shippingDate && data.shippingDate !== "Custom period") {
        params.shippingDate = data.shippingDate;
      }
      if (data.shippingDateFrom) params.shippingDateFrom = data.shippingDateFrom;
      if (data.shippingDateTo) params.shippingDateTo = data.shippingDateTo;

      if (data.orderDate && data.orderDate !== "Custom period") {
        params.orderDate = data.orderDate;
      }
      if (data.orderDateFrom) params.orderDateFrom = data.orderDateFrom;
      if (data.orderDateTo) params.orderDateTo = data.orderDateTo;

      params.sortField = data.sortField ?? data.sortBy ?? "id";
      params.sortDirection = data.sortDirection ?? "asc";
      params.page = Number(data.page || 1);
      params.pageSize = Number(data.pageSize ?? data.perPage ?? data.limit ?? 20);

      const response = await axiosInstance.post(
        "dashboard/shipments/advanced-search",
        params
      );
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed in advancing search"
      );
    }
  }
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
  async (
    { shipmentId }: { shipmentId: number | string },
    thunkAPI
  ) => {
    try {
      const response = await axiosInstance.get(
        `/dashboard/shipments/packing-slip/${shipmentId}`,
        {
          responseType: "blob",
          headers: {
            Accept: "application/pdf",
          },
        }
      );

      return response.data;
    } catch (err: any) {
      let message = "Failed to download PDF";

      if (err.response?.data instanceof Blob) {
        try {
          const text = await err.response.data.text();
          const data = JSON.parse(text);

          message = data?.message || message;
        } catch {
          // Blob JSON parse failed
        }
      } else {
        message =
          err.response?.data?.message ||
          err.message ||
          message;
      }

      return thunkAPI.rejectWithValue(message);
    }
  }
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
      const res = await axiosInstance.get(`dashboard/orders/admin-return-requests`);
      return res.data;
    } catch (err: any) {
      console.error("❌ Error fetching returns:", err);
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to fetch returns",
      );
    }
  },
);
export const fetchShippingRates = createAsyncThunk(
  "shippingZone/fetchShippingRates",
  async ({ data }: { data: any }, thunkAPI) => {
    try {
      const res = await axiosInstance.post(`web/checkout/get-shipping-rates`, data);
      return res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to fetch shipping rates"
      );
    }
  }
);
export const applyCoupon = createAsyncThunk(
  "order/fetchCouponByCode",
  async (couponCode: string, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("web/coupons/get-couponcode", {
        params: { couponCode },
      });
      return res.data;
    } catch (err: any) {
      return rejectWithValue(
        err?.response?.data || { message: "Coupon request failed" }
      );
    }
  }
);

// 2. Initial State
const initialState = {
  orders: [],
  shipments: [],
  singleOrder: null,
  singleShipmentByOrder: null,
  loading: false,
  error: null as string | null,
  draftOrder: [],
  returnLoader: false,
  returnOrders: [],
  shipmentLoader: false,
  shippingRates: [] as any[],
  ratesLoader: false,
  appliedCoupon: null,
  dashboardOrders: [],
  dashboardOrdersLoading: false,
};

// 3. Slice
const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    resetCoupon: (state) => {
      state.appliedCoupon = null;
      state.loading = false;
      state.error = null;
    },
  },

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
        state.singleOrder = action.payload.orders;
      })
      .addCase(shipmentByOrderId.fulfilled, (state, action) => {
        state.loading = false;
        state.singleShipmentByOrder = action.payload.data;
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
      })


      // update shipment
      .addCase(updateShipment.rejected, (state, action) => {
        state.shipmentLoader = false;
        state.error = action.payload as string;
      })
      .addCase(updateShipment.pending, (state) => {
        state.shipmentLoader = true;
        state.error = null; // reset error
      })
      .addCase(updateShipment.fulfilled, (state, action) => {
        state.shipmentLoader = false;
        state.returnOrders = action.payload;
      })


      .addCase(fetchShippingRates.pending, (state) => {
        state.ratesLoader = true;
      })
      .addCase(fetchShippingRates.fulfilled, (state, action) => {
        state.ratesLoader = false;
        state.shippingRates = action.payload?.rates;
      })
      .addCase(fetchShippingRates.rejected, (state, action) => {
        state.ratesLoader = false;
        state.error = "Shipping is not available in your region.";
      })



      .addCase(applyCoupon.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(applyCoupon.fulfilled, (state, action) => {
        state.loading = false;
        state.appliedCoupon = action.payload.data
        state.error = null;
      })
      .addCase(applyCoupon.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })



      .addCase(fetchDashboardOrderOverview.pending, (state) => {
        state.dashboardOrdersLoading = true;
        state.error = null;
      })
      .addCase(fetchDashboardOrderOverview.fulfilled, (state, action) => {
        state.dashboardOrdersLoading = false;
        state.dashboardOrders = action.payload;
      })
      .addCase(fetchDashboardOrderOverview.rejected, (state, action) => {
        state.dashboardOrdersLoading = false;
        state.error =
          (action.payload as string) ||
          action.error.message ||
          "Failed to fetch dashboard orders";
      })
    // builder.addCase(deleteDraftOrders.fulfilled, (state, action) => {
    //   state.draftOrder = state.draftOrder?.data?.filter(
    //     (order: any) => order?.order?.id !== action.meta.arg.id
    //   );
    // });
  },
});
export default orderSlice.reducer;
export const { resetCoupon } = orderSlice.actions;
function rejectWithValue(arg0: any): any {
  throw new Error("Function not implemented.");
}
