import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api  from "../api/axios";
// --------------------------------------------------------
// 1️⃣ FETCH ALL USERS (ADMIN CRUD)
// --------------------------------------------------------
export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/api/adminpanel/users/");

      if (Array.isArray(res.data)) return res.data;
      if (Array.isArray(res.data.results)) return res.data.results;

      return [];
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error fetching users");
    }
  }
);

// --------------------------------------------------------
// 2️⃣ CREATE USER (ADMIN)
// --------------------------------------------------------
export const createUserThunk = createAsyncThunk(
  "users/createUser",
  async (userData, { rejectWithValue }) => {
    try {
      const res = await api.post("/api/adminpanel/users/", userData);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error creating user");
    }
  }
);

// --------------------------------------------------------
// 3️⃣ UPDATE USER (ADMIN)
// --------------------------------------------------------
export const updateUserThunk = createAsyncThunk(
  "users/updateUser",
  async ({ id, userData }, { rejectWithValue }) => {
    try {
      const res = await api.put(`/api/adminpanel/users/${id}/`, userData);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error updating user");
    }
  }
);

// --------------------------------------------------------
// 4️⃣ DELETE USER (ADMIN)
// --------------------------------------------------------
export const deleteUserThunk = createAsyncThunk(
  "users/deleteUser",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/api/adminpanel/users/${id}/`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error deleting user");
    }
  }
);

// --------------------------------------------------------
// 5️⃣ FETCH LOGGED-IN USER PROFILE
// --------------------------------------------------------
export const fetchProfileThunk = createAsyncThunk(
  "users/fetchProfile",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/api/users/profile/");
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error fetching profile");
    }
  }
);

// --------------------------------------------------------
// 6️⃣ UPDATE LOGGED-IN USER PROFILE
// --------------------------------------------------------
export const updateProfileThunk = createAsyncThunk(
  "users/updateProfile",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await api.put("/api/users/profile/", formData);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error updating profile");
    }
  }
);

// --------------------------------------------------------
// Slice
// --------------------------------------------------------
const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    profile: null,   
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // -------------------------
      // FETCH ALL USERS
      // -------------------------
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // CREATE USER
      .addCase(createUserThunk.fulfilled, (state, action) => {
        state.users.push(action.payload);
      })
      .addCase(createUserThunk.rejected, (state, action) => {
        state.error = action.payload;
      })

      // UPDATE USER
      .addCase(updateUserThunk.fulfilled, (state, action) => {
        const index = state.users.findIndex(
          (u) => u.id === action.payload.id
        );
        if (index !== -1) state.users[index] = action.payload;
      })
      .addCase(updateUserThunk.rejected, (state, action) => {
        state.error = action.payload;
      })

      // DELETE USER
      .addCase(deleteUserThunk.fulfilled, (state, action) => {
        state.users = state.users.filter((u) => u.id !== action.payload);
      })
      .addCase(deleteUserThunk.rejected, (state, action) => {
        state.error = action.payload;
      })

      // -------------------------
      // FETCH PROFILE
      // -------------------------
      .addCase(fetchProfileThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProfileThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.profile = action.payload;
      })
      .addCase(fetchProfileThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // -------------------------
      // UPDATE PROFILE
      // -------------------------
      .addCase(updateProfileThunk.fulfilled, (state, action) => {
        state.profile = action.payload; // instantly update redux
      })
      .addCase(updateProfileThunk.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
