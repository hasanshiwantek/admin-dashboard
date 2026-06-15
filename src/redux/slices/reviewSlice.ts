// redux/slices/reviewSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/lib/axiosInstance";

// ── Thunks ───────────────────────────────────────────────────────────────────

export const fetchAllReviews = createAsyncThunk(
    "review/fetchAll",
    async ({ page, pageSize }: { page: number; pageSize: number }, thunkAPI) => {
        try {
            const res = await axiosInstance.get(`dashboard/reviews/admin`, {
                params: { page, per_page: pageSize },
            });
            return res?.data;
        } catch (err: any) {
            return thunkAPI.rejectWithValue(
                err.response?.data?.message || "Failed to fetch reviews"
            );
        }
    }
);

export const approveReview = createAsyncThunk(
    "review/approve",
    async ({ ids }: { ids: number[], status: string }, thunkAPI) => {
        try {
            const res = await axiosInstance.put(`dashboard/reviews/bulk-status-review`, { ids, status: "approved" });
            return res?.data;
        } catch (err: any) {
            return thunkAPI.rejectWithValue(
                err.response?.data?.message || "Failed to approve reviews"
            );
        }
    }
);

export const disapproveReview = createAsyncThunk(
    "review/disapprove",
    async ({ ids }: { ids: number[], status: string }, thunkAPI) => {
        try {
            const res = await axiosInstance.put(`dashboard/reviews/bulk-status-review`, { ids, "status": "disapproved" });
            return res?.data;
        } catch (err: any) {
            return thunkAPI.rejectWithValue(
                err.response?.data?.message || "Failed to disapprove reviews"
            );
        }
    }
);

export const deleteReview = createAsyncThunk(
    "review/delete",
    async ({ ids }: { ids: number[] }, thunkAPI) => {
        try {
            const res = await axiosInstance.delete(`dashboard/reviews/bulk-delete-review`, {
                data: { ids },
            });
            return res?.data;
        } catch (err: any) {
            return thunkAPI.rejectWithValue(
                err.response?.data?.message || "Failed to delete reviews"
            );
        }
    }
);

export const getReviewById = createAsyncThunk(
    "review/get-by-id",
    async ({ id }: { id: any }, thunkAPI) => {
        try {
            const res = await axiosInstance.get(`dashboard/reviews/get-by-id/${id}`);
            return res?.data;
        } catch (err: any) {
            return thunkAPI.rejectWithValue(
                err.response?.data?.message || "Failed to fetch review"
            );
        }
    }
);

export const updateReview = createAsyncThunk(
    "review/update",
    async ({ id, data }: { id: any; data: any }, thunkAPI) => {
        try {
            const res = await axiosInstance.put(
                `dashboard/reviews/update-review/${id}`,
                data
            );
            return res?.data;
        } catch (err: any) {
            return thunkAPI.rejectWithValue(
                err.response?.data?.message || "Failed to update review"
            );
        }
    }
);

// ── Initial State ─────────────────────────────────────────────────────────────

const initialState = {
    loading: false,
    deleteLoading: false,
    error: null as string | null,
    reviews: [] as any[],
    pagination: null as any,
    currentReview: null as any,
};

// ── Slice ─────────────────────────────────────────────────────────────────────

const reviewSlice = createSlice({
    name: "review",
    initialState,
    reducers: {},

    extraReducers: (builder) => {
        builder
            // fetchAllReviews
            .addCase(fetchAllReviews.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllReviews.fulfilled, (state, action) => {
                state.loading = false;
                state.reviews = action.payload?.data;
                state.pagination = action.payload?.pagination;
            })
            .addCase(fetchAllReviews.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // approveReview
            .addCase(approveReview.pending, (state) => {
                state.loading = true;
            })
            .addCase(approveReview.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(approveReview.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // disapproveReview
            .addCase(disapproveReview.pending, (state) => {
                state.loading = true;
            })
            .addCase(disapproveReview.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(disapproveReview.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // deleteReview
            .addCase(deleteReview.pending, (state) => {
                state.deleteLoading = true;
            })
            .addCase(deleteReview.fulfilled, (state) => {
                state.deleteLoading = false;
            })
            .addCase(deleteReview.rejected, (state, action) => {
                state.deleteLoading = false;
                state.error = action.payload as string;
            })

            // getReviewById
            .addCase(getReviewById.pending, (state) => {
                state.loading = true;
            })
            .addCase(getReviewById.fulfilled, (state, action) => {
                state.loading = false;
                state.currentReview = action.payload?.data;
            })
            .addCase(getReviewById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // updateReview
            .addCase(updateReview.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateReview.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(updateReview.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default reviewSlice.reducer;