import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/lib/axiosInstance";


export const fetchStaffLogs = createAsyncThunk(
    "storeLogs/fetchStaffLogs",
    async (
        { page = 1, pageSize = 20 }: { page?: number; pageSize?: number },
        thunkAPI
    ) => {
        try {
            const res = await axiosInstance.get(`dashboard/staff-logs`, {
                params: {
                    page,
                    per_page: pageSize,
                },
            });

            return res.data;
        } catch (err: any) {
            return thunkAPI.rejectWithValue(
                err.response?.data?.message || "Failed to fetch staff logs"
            );
        }
    }
);
// 2. Initial State
const initialState = {
    loading: false,
    error: null as string | null,
    staffLogs: [],
    meta: null as {
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    } | null,
};

// 3. Slice
const storeLogsSlice = createSlice({
    name: "storeLogs",
    initialState,
    reducers: {},

    extraReducers: (builder) => {
        builder
            .addCase(fetchStaffLogs.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchStaffLogs.fulfilled, (state, action) => {
                state.loading = false;
                state.staffLogs = action.payload?.data || [];
                state.meta = action.payload?.meta || null;
            })
            .addCase(fetchStaffLogs.rejected, (state, action) => {
                state.loading = false;
                state.error = action?.error?.message || "Failed to  fetch Carousal";
            });
    },
});

export default storeLogsSlice.reducer;
