// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axiosInstance from "@/lib/axiosInstance";

// export interface RegisterPayload {
//   name: string;
//   email: string;
//   password: string;
//   password_confirmation: string;
//   phoneNumber: string;
//   storeName: string;
//   userRole: number;
//   businessSize: string;
//   region: string;
// }

// interface AuthState {
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   user: any;
//   token: string | null;
//   loading: boolean;
//   error: string | null;
//   isAuthenticated: boolean;
//   stores: { storeId: number; name?: string }[];
// }

// const initialState: AuthState = {
//   user: null,
//   token: null,
//   loading: false,
//   error: null,
//   isAuthenticated: false,
//   stores: [],
// };

// // Login thunk
// export const loginUser = createAsyncThunk(
//   "auth/loginUser",
//   async (
//     { email, password }: { email: string; password: string },
//     thunkAPI
//   ) => {
//     try {
//       const res = await axiosInstance.post("user/login", { email, password });
//       return res.data;
//     } catch (err: any) {
//       // eslint-disable-next-line @typescript-eslint/no-explicit-any
//       return thunkAPI.rejectWithValue(
//         err.response?.data?.message || "Login failed"
//       );
//     }
//   }
// );

// // Register thunk
// export const registerUser = createAsyncThunk(
//   "auth/registerUser",
//   async (formData: RegisterPayload, thunkAPI) => {
//     try {
//       const res = await axiosInstance.post("user/register", formData);
//       return res.data;
//     } catch (err: any) {
//       // eslint-disable-next-line @typescript-eslint/no-explicit-any
//       return thunkAPI.rejectWithValue(
//         err.response?.data?.message || "Registration failed"
//       );
//     }
//   }
// );

// // Update Profile thunk
// export const updateUserPofile = createAsyncThunk(
//   "auth/updateUserPofile",
//   async (
//     { firstName, lastName }: { firstName: any; lastName: any },
//     thunkAPI
//   ) => {
//     try {
//       const res = await axiosInstance.put("dashboard/profile/update-name", {
//         firstName,
//         lastName,
//       });
//       return res.data;
//     } catch (err: any) {
//       // eslint-disable-next-line @typescript-eslint/no-explicit-any
//       return thunkAPI.rejectWithValue(
//         err.response?.data?.message || "Updation failed"
//       );
//     }
//   }
// );

// //Change Email Thunk
// export const updateUserEmail = createAsyncThunk(
//   "auth/updateUserPofile",
//   async (
//     { newEmail, password }: { newEmail: any; password: any },
//     thunkAPI
//   ) => {
//     try {
//       const res = await axiosInstance.post("dashboard/profile/update-email", {
//         newEmail,
//         password,
//       });
//       return res.data;
//     } catch (err: any) {
//       // eslint-disable-next-line @typescript-eslint/no-explicit-any
//       return thunkAPI.rejectWithValue(
//         err.response?.data?.message || "Updation failed"
//       );
//     }
//   }
// );

// // Slice
// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     logout: (state) => {
//       state.user = null;
//       state.token = null;
//       state.isAuthenticated = false;
//       localStorage.removeItem("token");
//       localStorage.removeItem("storeId");
//       localStorage.removeItem("user");
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       // Pending
//       .addCase(loginUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(registerUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })

//       // Fulfilled - login
//       .addCase(loginUser.fulfilled, (state, action) => {
//         state.loading = false;
//         state.user = action.payload.user;
//         state.token = action.payload.token;
//         state.isAuthenticated = true;
//         state.stores = action.payload.stores.map((store: any) => ({
//           storeId: store.id,
//           name: store.name,
//         }));

//         localStorage.setItem("token", action.payload.token);
//         if (action.payload.stores?.length === 1) {
//           localStorage.setItem(
//             "storeId",
//             action.payload.stores[0].id.toString()
//           );
//         }
//       })

//       // Fulfilled - register
//       .addCase(registerUser.fulfilled, (state) => {
//         state.loading = false;
//       })

//       // Rejected
//       .addCase(loginUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//       })
//       .addCase(registerUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//       });
//   },
// });

// export const { logout } = authSlice.actions;
// export default authSlice.reducer;

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
}

// const initialState: AuthState = {
//   user: null,
//   token: null,
//   loading: false,
//   error: null,
//   isAuthenticated: false,
//   // ✅ Rehydrate stores from localStorage on app start (handles page refresh)
//   stores: (() => {
//     try {
//       const saved = localStorage.getItem("availableStores");
//       return saved ? JSON.parse(saved) : [];
//     } catch {
//       return [];
//     }
//   })(),
// };
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

  stores: (() => {
    try {
      const s = localStorage.getItem("availableStores");
      return s ? JSON.parse(s).map((store: any) => ({
        storeId: store.id,
        name: store.name,
      })) : [];
    } catch { return []; }
  })(),

  loading: false,
  error: null,
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
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;

        const mappedStores = action.payload.stores.map((store: any) => ({
          storeId: store.id,
          name: store.name,
        }));
        state.stores = mappedStores;

        // ✅ Save token & user
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("user", JSON.stringify(action.payload.user));

        // ✅ Save stores list for page-refresh rehydration
        localStorage.setItem("availableStores", JSON.stringify(mappedStores));

        // ✅ CRITICAL FIX: NEVER auto-save storeId here.
        // storeId must ONLY be saved when user explicitly selects from store-select page.
        // Always clear any stale storeId from previous sessions.
        localStorage.removeItem("storeId");
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