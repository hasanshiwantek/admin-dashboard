import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/lib/axiosInstance";

// ─── Thunks ───────────────────────────────────────────────────────────────────

export const fetchShippingZones = createAsyncThunk(
    "shippingZone/fetchShippingZones",
    async (_, thunkAPI) => {
        try {
            const res = await axiosInstance.get(`dashboard/shipping-zones/get-zones`);
            return res.data;
        } catch (err: any) {
            return thunkAPI.rejectWithValue(
                err.response?.data?.message || "Failed to fetch shipping zones"
            );
        }
    }
);

export const fetchShippingZone = createAsyncThunk(
    "shippingZone/fetchShippingZone",
    async ({ zone_id }: { zone_id: number | string }, thunkAPI) => {
        try {
            const res = await axiosInstance.get(`dashboard/shipping-zones/get-zone/${zone_id}`);
            return res.data;
        } catch (err: any) {
            return thunkAPI.rejectWithValue(
                err.response?.data?.message || "Failed to fetch shipping zone"
            );
        }
    }
);

export const addShippingZone = createAsyncThunk(
    "shippingZone/addShippingZone",
    async ({ data }: { data: any }, thunkAPI) => {
        try {
            const response = await axiosInstance.post(
                `shipping-zones/add-zone`,
                data
            );
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Failed to add shipping zone"
            );
        }
    }
);

export const updateShippingZone = createAsyncThunk(
    "shippingZone/updateShippingZone",
    async ({ zone_id, data }: { zone_id: number | string; data: any }, thunkAPI) => {
        try {
            const response = await axiosInstance.put(
                `dashboard/shipping-zones/update-zone/${zone_id}`,
                data
            );
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Failed to update shipping zone"
            );
        }
    }
);

export const deleteShippingZone = createAsyncThunk(
    "shippingZone/deleteShippingZone",
    async ({ zone_id }: { zone_id: number | string }, thunkAPI) => {
        try {
            const response = await axiosInstance.delete(
                `dashboard/shipping-zones/delete-zone/${zone_id}`
            );
            return { zone_id, ...response.data };
        } catch (error: any) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Failed to delete shipping zone"
            );
        }
    }
);

export const fetchShippingMethods = createAsyncThunk(
    "shippingZone/fetchShippingMethods",
    async ({ zone_id }: { zone_id: number | string }, thunkAPI) => {
        try {
            const res = await axiosInstance.get(`dashboard/shipping-methods/get-methods/${zone_id}`);
            return res.data;
        } catch (err: any) {
            return thunkAPI.rejectWithValue(
                err.response?.data?.message || "Failed to fetch shipping methods"
            );
        }
    }
);
export const toggleShippingMethod = createAsyncThunk(
    "shippingZone/toggleShippingMethod",
    async ({ method_id }: { method_id: number | string }, thunkAPI) => {
        try {
            const res = await axiosInstance.patch(`dashboard/shipping-methods/toggle-method/${method_id}`);
            return { method_id, ...res.data };
        } catch (err: any) {
            return thunkAPI.rejectWithValue(
                err.response?.data?.message || "Failed to toggle shipping method"
            );
        }
    }
);
export const fetchFedexConfig = createAsyncThunk(
    "shippingZone/fetchFedexConfig",
    async ({ method_id }: { method_id: number | string }, thunkAPI) => {
        try {
            const res = await axiosInstance.get(`dashboard/fedex-config/get-config/${method_id}`);
            return res.data;
        } catch (err: any) {
            return thunkAPI.rejectWithValue(
                err.response?.data?.message || "Failed to fetch fedex config"
            );
        }
    }
);
export const fetchFedexServices = createAsyncThunk(
    "shippingZone/fetchFedexServices",
    async (_, thunkAPI) => {
        try {
            const res = await axiosInstance.get(`dashboard/fedex-config/get-services`);
            return res.data;
        } catch (err: any) {
            return thunkAPI.rejectWithValue(
                err.response?.data?.message || "Failed to fetch fedex services"
            );
        }
    }
);
export const saveFedexConfig = createAsyncThunk(
    "shippingZone/saveFedexConfig",
    async ({ method_id, data }: { method_id: number | string; data: any }, thunkAPI) => {
        try {
            const res = await axiosInstance.post(`dashboard/fedex-config/save-config/${method_id}`, data);
            return res.data;
        } catch (err: any) {
            return thunkAPI.rejectWithValue(
                err.response?.data?.message || "Failed to save fedex config"
            );
        }
    }
);

export const disconnectFedex = createAsyncThunk(
    "shippingZone/disconnectFedex",
    async ({ method_id }: { method_id: number | string }, thunkAPI) => {
        try {
            const res = await axiosInstance.post(`dashboard/fedex-config/disconnect/${method_id}`);
            return res.data;
        } catch (err: any) {
            return thunkAPI.rejectWithValue(
                err.response?.data?.message || "Failed to disconnect FedEx"
            );
        }
    }
);
export const connectFedex = createAsyncThunk(
    "shippingZone/connection",
    async ({ method_id }: { method_id: number | string }, thunkAPI) => {
        try {
            const res = await axiosInstance.post(`dashboard/fedex-config/test-connection/${method_id}`);
            return res.data;
        } catch (err: any) {
            return thunkAPI.rejectWithValue(
                err.response?.data?.message || "Failed to disconnect FedEx"
            );
        }
    }
);
const initialState = {
    zones: [] as any[],
    selectedZone: null as any,
    shippingMethods: [] as any[],   // new
    fedexConfig: null as any,        // new
    loading: false,
    detailLoader: false,
    methodsLoader: false,            // new
    disconnectLoader: false,            // new
    fedexLoader: false,              // new
    updatingId: null as number | string | null,
    deletingId: null as number | string | null,
    error: null as string | null,
    fedexServices: [] as any[],
    fedexServicesLoader: false,
    saveConfigLoader: false,
    fedexConnection: null
};

// ─── Slice ────────────────────────────────────────────────────────────────────

const shippingZoneSlice = createSlice({
    name: "shippingZone",
    initialState,
    reducers: {
        clearSelectedZone: (state) => {
            state.selectedZone = null;
        },
    },

    extraReducers: (builder) => {
        builder
            // Fetch All Zones
            .addCase(fetchShippingZones.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchShippingZones.fulfilled, (state, action) => {
                state.loading = false;
                state.zones = action.payload?.data;
            })
            .addCase(fetchShippingZones.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to fetch shipping zones";
            })

            // Fetch Single Zone
            .addCase(fetchShippingZone.pending, (state) => {
                state.detailLoader = true;
            })
            .addCase(fetchShippingZone.fulfilled, (state, action) => {
                state.detailLoader = false;
                state.selectedZone = action.payload?.data;
            })
            .addCase(fetchShippingZone.rejected, (state, action) => {
                state.detailLoader = false;
                state.error = action.error.message || "Failed to fetch shipping zone";
            })

            // Add Zone
            .addCase(addShippingZone.pending, (state) => {
                state.loading = true;
            })
            .addCase(addShippingZone.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(addShippingZone.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to add shipping zone";
            })

            // Update Zone
            .addCase(updateShippingZone.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateShippingZone.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(updateShippingZone.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to update shipping zone";
            })

            // Delete Zone
            .addCase(deleteShippingZone.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteShippingZone.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(deleteShippingZone.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to delete shipping zone";
            })

            // Fetch Shipping Methods
            .addCase(fetchShippingMethods.pending, (state) => {
                state.methodsLoader = true;
            })
            .addCase(fetchShippingMethods.fulfilled, (state, action) => {
                state.methodsLoader = false;
                state.shippingMethods = action.payload?.data;
            })
            .addCase(fetchShippingMethods.rejected, (state, action) => {
                state.methodsLoader = false;
                state.error = action.error.message || "Failed to fetch shipping methods";
            })

            // Fetch Fedex Config
            .addCase(fetchFedexConfig.pending, (state) => {
                state.fedexLoader = true;
            })
            .addCase(fetchFedexConfig.fulfilled, (state, action) => {
                state.fedexLoader = false;
                state.fedexConfig = action.payload?.data;
            })
            .addCase(fetchFedexConfig.rejected, (state, action) => {
                state.fedexLoader = false;
                state.error = action.error.message || "Failed to fetch fedex config";
            })


            // Fedex Services
            .addCase(fetchFedexServices.pending, (state) => {
                state.fedexServicesLoader = true;
            })
            .addCase(fetchFedexServices.fulfilled, (state, action) => {
                state.fedexServicesLoader = false;
                state.fedexServices = action.payload?.services;
            })
            .addCase(fetchFedexServices.rejected, (state, action) => {
                state.fedexServicesLoader = false;
                state.error = action.error.message || "Failed to fetch fedex services";
            })

            .addCase(saveFedexConfig.pending, (state) => {
                state.saveConfigLoader = true;
            })
            .addCase(saveFedexConfig.fulfilled, (state, action) => {
                state.saveConfigLoader = false;
                state.fedexConfig = action.payload?.data;
            })
            .addCase(saveFedexConfig.rejected, (state, action) => {
                state.saveConfigLoader = false;
                state.error = action.error.message || "Failed to save fedex config";
            })


            .addCase(disconnectFedex.pending, (state) => {
                state.disconnectLoader = true;
            })
            .addCase(disconnectFedex.fulfilled, (state) => {
                state.disconnectLoader = false;
                state.fedexConfig = { ...state.fedexConfig, is_connected: false };
            })
            .addCase(disconnectFedex.rejected, (state, action) => {
                state.disconnectLoader = false;
                state.error = action.error.message || "Failed to disconnect FedEx";
            })

            // fedex connection
            .addCase(connectFedex.pending, (state) => {
                state.disconnectLoader = true;
            })
            .addCase(connectFedex.fulfilled, (state, action) => {
                state.disconnectLoader = false;
                state.fedexConnection = action.payload?.data;
            })
            .addCase(connectFedex.rejected, (state, action) => {
                state.disconnectLoader = false;
                state.error = action.error.message || "Failed to disconnect FedEx";
            })
    },
});

export const { clearSelectedZone } = shippingZoneSlice.actions;
export default shippingZoneSlice.reducer;