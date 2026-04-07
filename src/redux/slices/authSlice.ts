import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/lib/axiosInstance";

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  phoneNumber: string;
  storeName: string;
  userRole: number;
  businessSize: string;
  region: string;
}

interface AuthState {
  user: any;
  token: string | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  stores: { storeId: number; name?: string }[];
  twoFaStatus?: any;
  setupAuthenticator?: any;
  pending_token: string | null,
  two_factor_required: boolean,
  two_factor_type: string | null,
}

const initialState: AuthState = {
  // ✅ Read token presence to restore auth on refresh
  isAuthenticated: typeof window !== "undefined"
    ? !!localStorage.getItem("token")
    : false,

  token: typeof window !== "undefined"
    ? localStorage.getItem("token")
    : null,

  user: (() => {
    try {
      const u = localStorage.getItem("user");
      return u ? JSON.parse(u) : null;
    } catch { return null; }
  })(),
  twoFaStatus: null,
  setupAuthenticator: null,
  stores: (() => {
    try {
      const s = localStorage.getItem("availableStores");
      return s ? JSON.parse(s)?.map((store: any) => ({
        storeId: store?.id,
        name: store?.name,
      })) : [];
    } catch { return []; }
  })(),

  loading: false,
  error: null,
  pending_token:
    typeof window !== "undefined"
      ? localStorage.getItem("pending_token")
      : null,

  two_factor_required:
    typeof window !== "undefined"
      ? localStorage.getItem("two_factor_required") === "true"
      : false,

  two_factor_type:
    typeof window !== "undefined"
      ? localStorage.getItem("two_factor_type")
      : null,
};
// Login thunk
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (
    { email, password }: { email: string; password: string },
    thunkAPI
  ) => {
    try {
      const res = await axiosInstance.post("user/login", { email, password });
      return res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Login failed"
      );
    }
  }
);

// Register thunk
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (formData: RegisterPayload, thunkAPI) => {
    try {
      const res = await axiosInstance.post("user/register", formData);
      return res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Registration failed"
      );
    }
  }
);

// Update Profile thunk
export const updateUserPofile = createAsyncThunk(
  "auth/updateUserPofile",
  async (
    { firstName, lastName }: { firstName: any; lastName: any },
    thunkAPI
  ) => {
    try {
      const res = await axiosInstance.put("dashboard/profile/update-name", {
        firstName,
        lastName,
      });
      return res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Updation failed"
      );
    }
  }
);

// Change Email Thunk
export const updateUserEmail = createAsyncThunk(
  "auth/updateUserEmail",
  async (
    { newEmail, password }: { newEmail: any; password: any },
    thunkAPI
  ) => {
    try {
      const res = await axiosInstance.post("dashboard/profile/update-email", {
        newEmail,
        password,
      });
      return res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Updation failed"
      );
    }
  }
);

export const fetchTwofaStatus = createAsyncThunk(
  "2fa/status",
  async (_, thunkAPI) => {
    try {
      const res = await axiosInstance.get(
        `2fa/status`
      );
      return res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to fetch 2FA Status"
      );
    }
  }
);


export const enableEmail2FA = createAsyncThunk(
  "2fa/enable/email",
  async (_, thunkAPI) => {
    try {
      const res = await axiosInstance.post("2fa/enable/email");
      return res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to enable email 2FA"
      );
    }
  }
);

export const disableEmail2FA = createAsyncThunk(
  "2fa/disable",
  async ({ password }: { password: string }, thunkAPI) => {
    try {
      const res = await axiosInstance.post("2fa/disable", { password }); // ✅ send password in body
      return res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to disable email 2FA"
      );
    }
  }
);
export const enableAuthenticator2FA = createAsyncThunk(
  "2fa/enable/authenticator",
  async (_, thunkAPI) => {
    try {
      const res = await axiosInstance.post("2fa/setup/authenticator");
      return res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to enable authenticator 2FA"
      );
    }
  }
);
export const confirmAuthenticator = createAsyncThunk(
  "2fa/confirm/authenticator",
  async ({ code }: { code: string }, thunkAPI) => {
    try {
      const res = await axiosInstance.post("2fa/confirm/authenticator", { code });
      return res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to confirm authenticator 2FA"
      );
    }
  }
);

export const verifyOtp = createAsyncThunk(
  "auth/verifyOtp",
  async ({ otp, pendingToken }: { otp: string; pendingToken: string }, thunkAPI) => {
    try {
      const res = await axiosInstance.post("2fa/verify", {
        code: otp,
        pending_token: pendingToken,
      });
      return res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "OTP verification failed"
      );
    }
  }
);
export const resendOtp = createAsyncThunk(
  "auth/resend-otp",
  async ({ pendingToken }: { pendingToken: string }, thunkAPI) => {
    try {
      const res = await axiosInstance.post("2fa/resend-otp", {
        pending_token: pendingToken,
      });
      return res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "OTP verification failed"
      );
    }
  }
);
export const profileUpdatePassword = createAsyncThunk(
  "auth/profile/update-password",
  async ({ currentPassword, newPassword, confirmPassword }: { currentPassword: string, newPassword: string, confirmPassword: string }, thunkAPI) => {
    const payload = {
      currentPassword: currentPassword,
      newPassword: newPassword,
      confirmPassword: confirmPassword
    }
    try {
      const res = await axiosInstance.post("dashboard/profile/update-password", payload);
      return res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "OTP verification failed"
      );
    }
  }
);

// Slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.stores = [];
      // ✅ Clear everything on logout
      localStorage.removeItem("token");
      localStorage.removeItem("storeId");
      localStorage.removeItem("user");
      localStorage.removeItem("availableStores");
      localStorage.removeItem("tokenExpiry");
    },
  },
  extraReducers: (builder) => {
    builder
      // Pending
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      // Fulfilled - login
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.pending_token && action.payload.two_factor_type) {
          state.pending_token = action.payload.pending_token;
          state.two_factor_required = action.payload.two_factor_required;
          state.two_factor_type = action.payload.two_factor_type;
          localStorage.setItem("pending_token", action.payload.pending_token);
          localStorage.setItem("two_factor_required", action.payload.two_factor_required);
          localStorage.setItem("two_factor_type", action.payload.two_factor_type);
        } else {
          state.user = action.payload.user;
          state.token = action.payload.token;
          state.isAuthenticated = true;
          const mappedStores = action?.payload?.stores?.map((store: any) => ({
            storeId: store?.id,
            name: store?.name,
          }));
          state.stores = mappedStores;
          localStorage.setItem("token", action.payload.token);
          localStorage.setItem("user", JSON.stringify(action.payload.user));
          localStorage.setItem("availableStores", JSON.stringify(mappedStores));
          localStorage.removeItem("storeId");
        }
      })

      // Fulfilled - register
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
      })

      // Rejected
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Fulfilled - verify Otp
      .addCase(verifyOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        const mappedStores = action?.payload?.stores?.map((store: any) => ({
          storeId: store?.id,
          name: store?.name,
        }));
        state.stores = mappedStores;
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("user", JSON.stringify(action.payload.user));
        localStorage.setItem("availableStores", JSON.stringify(mappedStores));
        localStorage.removeItem("storeId");
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // fetch2faStatus
      .addCase(fetchTwofaStatus.pending, (state) => {
        state.loading = true;
        state.error = null; // reset error
      })
      .addCase(fetchTwofaStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.twoFaStatus = action.payload;
      })
      .addCase(fetchTwofaStatus.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) || action.error.message || "Failed";
      })

      // fetch2faStatus
      .addCase(disableEmail2FA.pending, (state) => {
        state.loading = true;
        state.error = null; // reset error
      })
      .addCase(disableEmail2FA.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(disableEmail2FA.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) || action.error.message || "Failed";
      })

      // Profile Update Password
      .addCase(profileUpdatePassword.pending, (state) => {
        state.loading = true;
        state.error = null; // reset error
      })
      .addCase(profileUpdatePassword.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(profileUpdatePassword.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) || action.error.message || "Failed";
      })


      // fetch2faStatus
      .addCase(enableAuthenticator2FA.pending, (state) => {
        state.loading = true;
        state.error = null; // reset error
      })
      .addCase(enableAuthenticator2FA.fulfilled, (state, action) => {
        state.loading = false;
        state.setupAuthenticator = action.payload;
      })
      .addCase(enableAuthenticator2FA.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) || action.error.message || "Failed";
      })
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;