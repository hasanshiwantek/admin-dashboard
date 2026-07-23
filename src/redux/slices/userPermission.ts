import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/lib/axiosInstance";

export interface AdminUser {
    id: number;
    name: string;
    email: string;
    userRole: number;
    storeId: number;
}

export interface UpdateAdminUserPayload {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    permissions: number[];
}

interface AdminUsersState {
    adminUsers: AdminUser[];
    loading: boolean;
    error: string | null;
    updating: boolean;
    deleting: boolean;
    message: string | null;

    permissionGroups: PermissionGroup[];
    myPermissions: PermissionItem[]; // or any[] if you don't know the type yet
    userPermissions: PermissionItem[]; // or any[]
    permissionsLoading: boolean;
    assigning: boolean;
}
export interface PermissionItem {
    id: number;
    name: string;
    label: string;
    slug: string;
}

export interface PermissionGroup {
    group: string;
    permissions: PermissionItem[];
}
const initialState: AdminUsersState = {
    adminUsers: [],
    loading: false,
    error: null,
    updating: false,
    deleting: false,
    message: null,

    // 
    permissionGroups: [] as PermissionGroup[],
    myPermissions: [] as any[],
    userPermissions: [] as any[],
    permissionsLoading: false,
    assigning: false,
};

// GET dashboard/admin-users
export const fetchAdminUsers = createAsyncThunk(
    "adminUsers/fetchAdminUsers",
    async (_, thunkAPI) => {
        try {
            const res = await axiosInstance.get("dashboard/admin-users");
            return res.data;
        } catch (err: any) {
            return thunkAPI.rejectWithValue(
                err.response?.data?.message || "Failed to fetch admin users"
            );
        }
    }
);

// PUT dashboard/admin-users/{id}
export const updateAdminUser = createAsyncThunk(
    "adminUsers/updateAdminUser",
    async (
        { id, firstName, lastName, email, permissions }: UpdateAdminUserPayload,
        thunkAPI
    ) => {
        try {
            const res = await axiosInstance.put(`dashboard/admin-users/${id}`, {
                firstName,
                lastName,
                email,
                permissions,
            });
            return res.data;
        } catch (err: any) {
            return thunkAPI.rejectWithValue(
                err.response?.data?.message || "Failed to update admin user"
            );
        }
    }
);

// DELETE dashboard/admin-users/{id}
export const deleteAdminUser = createAsyncThunk(
    "adminUsers/deleteAdminUser",
    async ({ id }: { id: any }, thunkAPI) => {
        try {
            const res = await axiosInstance.delete(`dashboard/admin-users/${id}`);
            return { ...res.data, id };
        } catch (err: any) {
            return thunkAPI.rejectWithValue(
                err.response?.data?.message || "Failed to delete admin user"
            );
        }
    }
);
// ===== Permissions Thunks =====


// GET dashboard/permissions
export const fetchPermissions = createAsyncThunk(
    "adminUsers/fetchPermissions",
    async (_, thunkAPI) => {
        try {
            const res = await axiosInstance.get("dashboard/permissions");
            return res.data;
        } catch (err: any) {
            return thunkAPI.rejectWithValue(
                err.response?.data?.message || "Failed to fetch permissions"
            );
        }
    }
);

// GET dashboard/permissions/my
export const fetchMyPermissions = createAsyncThunk(
    "adminUsers/fetchMyPermissions",
    async (_, thunkAPI) => {
        try {
            const res = await axiosInstance.get("dashboard/permissions/my");
            return res.data;
        } catch (err: any) {
            return thunkAPI.rejectWithValue(
                err.response?.data?.message || "Failed to fetch my permissions"
            );
        }
    }
);

// GET dashboard/permissions/user/{id}
export const fetchUserPermissions = createAsyncThunk(
    "adminUsers/fetchUserPermissions",
    async ({ userId }: { userId: number }, thunkAPI) => {
        try {
            const res = await axiosInstance.get(`dashboard/permissions/user/${userId}`);
            return res.data;
        } catch (err: any) {
            return thunkAPI.rejectWithValue(
                err.response?.data?.message || "Failed to fetch user permissions"
            );
        }
    }
);

// POST dashboard/permissions/assign/{id}
export const assignPermissions = createAsyncThunk(
    "adminUsers/assignPermissions",
    async (
        { userId, permissions }: { userId: number; permissions: number[] },
        thunkAPI
    ) => {
        try {
            const res = await axiosInstance.post(
                `dashboard/permissions/assign/${userId}`,
                { permissions }
            );
            return res.data;
        } catch (err: any) {
            return thunkAPI.rejectWithValue(
                err.response?.data?.message || "Failed to assign permissions"
            );
        }
    }
);
const adminUsersSlice = createSlice({
    name: "adminUsers",
    initialState,
    reducers: {
        clearAdminUsersState: (state) => {
            state.error = null;
            state.message = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch
            .addCase(fetchAdminUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAdminUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.adminUsers = action.payload?.data || [];
                state.message = action.payload?.message || null;
            })
            .addCase(fetchAdminUsers.rejected, (state, action) => {
                state.loading = false;
                state.error =
                    (action.payload as string) || action.error.message || "Failed";
            })

            // Update
            .addCase(updateAdminUser.pending, (state) => {
                state.updating = true;
                state.error = null;
            })
            .addCase(updateAdminUser.fulfilled, (state, action) => {
                state.updating = false;
                state.message = action.payload?.message || null;
                const updated = action.payload?.data;
                if (updated?.id) {
                    state.adminUsers = state.adminUsers.map((u) =>
                        u.id === updated.id ? { ...u, ...updated } : u
                    );
                }
            })
            .addCase(updateAdminUser.rejected, (state, action) => {
                state.updating = false;
                state.error =
                    (action.payload as string) || action.error.message || "Failed";
            })

            // Delete
            .addCase(deleteAdminUser.pending, (state) => {
                state.deleting = true;
                state.error = null;
            })
            .addCase(deleteAdminUser.fulfilled, (state, action: any) => {
                state.deleting = false;
                state.message = action.payload?.message || null;
                state.adminUsers = state.adminUsers.filter(
                    (u) => u.id !== action.payload?.id
                );
            })
            .addCase(deleteAdminUser.rejected, (state, action) => {
                state.deleting = false;
                state.error =
                    (action.payload as string) || action.error.message || "Failed";
            })



            // 
            // Permissions (all)
            .addCase(fetchPermissions.pending, (state) => {
                state.permissionsLoading = true;
                state.error = null;
            })
            .addCase(fetchPermissions.fulfilled, (state, action) => {
                state.permissionsLoading = false;
                state.permissionGroups = action.payload?.data || [];
            })
            .addCase(fetchPermissions.rejected, (state, action) => {
                state.permissionsLoading = false;
                state.error =
                    (action.payload as string) || action.error.message || "Failed";
            })

            // My permissions
            .addCase(fetchMyPermissions.pending, (state) => {
                state.permissionsLoading = true;
                state.error = null;
            })
            .addCase(fetchMyPermissions.fulfilled, (state, action) => {
                state.permissionsLoading = false;
                state.myPermissions = action.payload?.data || [];
            })
            .addCase(fetchMyPermissions.rejected, (state, action) => {
                state.permissionsLoading = false;
                state.error =
                    (action.payload as string) || action.error.message || "Failed";
            })

            // User permissions
            .addCase(fetchUserPermissions.pending, (state) => {
                state.permissionsLoading = true;
                state.error = null;
            })
            .addCase(fetchUserPermissions.fulfilled, (state, action) => {
                state.permissionsLoading = false;
                state.userPermissions = action.payload?.data || [];
            })
            .addCase(fetchUserPermissions.rejected, (state, action) => {
                state.permissionsLoading = false;
                state.error =
                    (action.payload as string) || action.error.message || "Failed";
            })

            // Assign permissions
            .addCase(assignPermissions.pending, (state) => {
                state.assigning = true;
                state.error = null;
            })
            .addCase(assignPermissions.fulfilled, (state, action) => {
                state.assigning = false;
                state.message = action.payload?.message || null;
            })
            .addCase(assignPermissions.rejected, (state, action) => {
                state.assigning = false;
                state.error =
                    (action.payload as string) || action.error.message || "Failed";
            })
    },
});

export const { clearAdminUsersState } = adminUsersSlice.actions;
export default adminUsersSlice.reducer;