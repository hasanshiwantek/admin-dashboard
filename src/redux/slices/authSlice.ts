import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/lib/axiosInstance";

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  storeName: string;
  userRole: number;
  businessSize: string;
  region: string;
}

interface AuthState {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: any;
  token: string | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  stores: {storeId: number; name?: string}[];
}

const initialState: AuthState = {
  user: null,
  token: null,
  loading: false,
  error: null,
  isAuthenticated: false,
  stores: [],
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
    } // eslint-disable-next-line @typescript-eslint/no-explicit-any
      catch (err: any) {
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
      const res = await axiosInstance.post("/auth/register", formData);
      return res.data;
    } // eslint-disable-next-line @typescript-eslint/no-explicit-any 
    catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Registration failed"
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
      localStorage.removeItem("token");
      localStorage.removeItem("storeId");
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
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.stores = action.payload.stores.map((store: any) => ({
          storeId: store.id,
          name: store.name,
        }));

        localStorage.setItem("token", action.payload.token);
        if (action.payload.stores?.length === 1) {
          localStorage.setItem("storeId", action.payload.stores[0].id.toString());
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
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
