import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/axios";


// Load user from localStorage if available
const userFromStorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

// --------------------
// Initial State
// --------------------
const initialState = {
  user: userFromStorage, // keeps user logged in on refresh
  loading: false,
  error: null,
};

// --------------------
// Async thunk for register
// --------------------
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, thunkAPI) => {
    try {
      const response = await api.post(
        "/api/auth/register/",
        userData
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// --------------------
// Async thunk for login
// --------------------
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, thunkAPI) => {
    try {
      const response = await api.post(
        "/api/auth/login/",
        credentials
      );
      return response.data; // contains access & refresh tokens
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// --------------------
// Slice
// --------------------
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("user");
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
    },
    updateAuthUser: (state, action) => {
      if (!state.user) return;

      state.user = {
        ...state.user,
        ...action.payload,
      };

      // keep localStorage in sync
      localStorage.setItem("user", JSON.stringify(state.user));
    },
  },
  extraReducers: (builder) => {
    builder
      // ----- REGISTER -----
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ----- LOGIN -----
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;

        // Construct minimal user object to store in Redux & localStorage
        const userData = {
          username: action.meta.arg.username,
          access: action.payload.access,
          refresh: action.payload.refresh,
          is_staff: action.payload.is_staff,
        };

        // Update Redux state
        state.user = userData;

        // Store in localStorage
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("access_token", action.payload.access);
        localStorage.setItem("refresh_token", action.payload.refresh);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export logout action
export const { logout, updateAuthUser } = authSlice.actions;

export default authSlice.reducer;
