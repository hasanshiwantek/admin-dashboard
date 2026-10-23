// redux/slices/orderMessageSlice.ts
import axiosInstance from "@/lib/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// ── Thunks ───────────────────────────────────────────────────────────────────

export const fetchOrderMessages = createAsyncThunk(
  "orderMessage/fetchAll",
  async ({ orderId }: { orderId: string | number }, thunkAPI) => {
    try {
      const res = await axiosInstance.get(
        `web/customer-messages/admin-messages?order_id=${orderId}`,
      );
      return res?.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to fetch messages",
      );
    }
  },
);

export const sendOrderMessage = createAsyncThunk(
  "orderMessage/send",
  async (
    { data }: { data: { subject: string; message: string; order_id: number } },
    thunkAPI,
  ) => {
    try {
      const res = await axiosInstance.post(
        `web/customer-messages/admin-reply`,
        data,
      );
      return res?.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to send message",
      );
    }
  },
);

export const markMessageStatus = createAsyncThunk(
  "orderMessage/mark-read",
  async ({ messageId }: { messageId: number[] }, thunkAPI) => {
    try {
      const res = await axiosInstance.post(
        `web/customer-messages/mark-read`,
        // `dashboard/orders/${orderId}/messages/${id}/status`,
        { ids: messageId },
      );
      return res?.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to update message status",
      );
    }
  },
);

export const unreadMessageStatus = createAsyncThunk(
  "orderMessage/mark-read",
  async ({ messageId }: { messageId: number[] }, thunkAPI) => {
    try {
      const res = await axiosInstance.post(
        `web/customer-messages/mark-unread`,
        { ids: messageId },
      );
      return res?.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to update message status",
      );
    }
  },
);

export const toggleFlagHeaders = createAsyncThunk(
  "orderMessage/flagHeaders",
  async (
    { messageId, flag }: { messageId: number[]; flag: boolean },
    thunkAPI,
  ) => {
    try {
      const res = await axiosInstance.post(
        `web/customer-messages/toggle-flag`,
        { ids: messageId, flag },
      );
      return res?.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to update message status",
      );
    }
  },
);
export const getMessageById = createAsyncThunk(
  "orderMessage/getMessageById",
  async ({ id }: { id: any }, thunkAPI) => {
    try {
      const res = await axiosInstance.get(`web/customer-messages/show/${id}`);
      return res?.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to fetch review",
      );
    }
  },
);
export const getCustomerDetailById = createAsyncThunk(
  "orderMessage/customer-by-order",
  async ({ id }: { id: any }, thunkAPI) => {
    try {
      const res = await axiosInstance.get(
        `dashboard/orders/customer-by-order/${id}`,
      );
      return res?.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to fetch review",
      );
    }
  },
);
export const deleteOrderMessages = createAsyncThunk(
  "orderMessage/customer-messages",
  async ({ ids }: { ids: number[] }, thunkAPI) => {
    try {
      const res = await axiosInstance.post(`web/customer-messages/delete`, {
        ids,
      });
      return res?.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to delete messages",
      );
    }
  },
);

export const updateMessage = createAsyncThunk(
  "orderMessage/updateMessage",
  async ({ id, data }: { id: any; data: any }, thunkAPI) => {
    try {
      const res = await axiosInstance.put(
        `web/customer-messages/update/${id}`,
        data,
      );
      return res?.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to update review",
      );
    }
  },
);
//  ── Initial State ─────────────────────────────────────────────────────────────

const initialState = {
  loading: false,
  deleteLoading: false,
  error: null as string | null,
  messages: [] as any[],
  order: null as any,
  customerDetail: null,
  message: null,
  messageLoading: false,
};

// ── Slice ─────────────────────────────────────────────────────────────────────

const orderMessageSlice = createSlice({
  name: "orderMessage",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      // fetchOrderMessages
      .addCase(fetchOrderMessages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrderMessages.fulfilled, (state, action) => {
        state.loading = false;
        state.messages = action.payload?.data ?? [];
        state.order = action.payload?.order ?? null;
      })
      .addCase(fetchOrderMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // sendOrderMessage
      .addCase(sendOrderMessage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendOrderMessage.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(sendOrderMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // markMessageStatus
      .addCase(markMessageStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(markMessageStatus.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(markMessageStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // deleteOrderMessages
      .addCase(deleteOrderMessages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteOrderMessages.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteOrderMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // toggleFlagHeaders
      .addCase(toggleFlagHeaders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(toggleFlagHeaders.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(toggleFlagHeaders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Get Customer Detail
      .addCase(getCustomerDetailById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCustomerDetailById.fulfilled, (state, action) => {
        state.loading = false;
        state.customerDetail = action.payload?.data;
      })
      .addCase(getCustomerDetailById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Get message by ID
      .addCase(getMessageById.pending, (state) => {
        state.messageLoading = true;
        state.error = null;
      })
      .addCase(getMessageById.fulfilled, (state, action) => {
        state.messageLoading = false;
        state.message = action.payload?.data;
      })
      .addCase(getMessageById.rejected, (state, action) => {
        state.messageLoading = false;
        state.error = action.payload as string;
      });
  },
});

export default orderMessageSlice.reducer;
