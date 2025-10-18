
import api from "@/lib/client-axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Fetch all users
export const getAllUsers = createAsyncThunk(
  "user/getAllUsers",
  async (page, thunkAPI) => {
    try {
      const response = await api.get(`/user/all/all?page=${page}`);
      console.log(response.data)
      return response.data.data.users;
    } catch (error) {
      const message = error.response?.data?.message || error.message || "Failed to fetch users";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Fetch subscribed users
export const getAllSubscribers = createAsyncThunk(
  "user/getSubscribedUsers",
  async (page, thunkAPI) => {
    try {
      const response = await api.get(`/user/subscribed/all?page=${page}`);
      return response.data.data.users;
    } catch (error) {
      const message = error.response?.data?.message || error.message || "Failed to fetch subscribed users";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const fetchActiveSubscribers = createAsyncThunk(
  "subscribers/fetchActive",
  async (page = 1, thunkAPI) => {
    try {
      const res = await api.get(`/user/subscribed/active?page=${page}`);
      return res.data.data.users;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to fetch active subscribers");
    }
  }
);

export const fetchScholarTrackSubscribers = createAsyncThunk(
  "subscribers/fetchScholarTrack",
  async (page = 1, thunkAPI) => {
    try {
      const res = await api.get(`/user/subscribed/active/scholar-track.?page=${page}`);
      return res.data.data.users;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to fetch ScholarTrack subscribers");
    }
  }
);

export const fetchCareerCatchSubscribers = createAsyncThunk(
  "subscribers/fetchCareerCatch",
  async (page = 1, thunkAPI) => {
    try {
      const res = await api.get(`/user/subscribed/active/career-catch?page=${page}`);
      return res.data.data.users;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to fetch CareerCatch subscribers");
    }
  }
);

export const fetchAllAccessSubscribers = createAsyncThunk(
  "subscribers/fetchAllAccess",
  async (page = 1, thunkAPI) => {
    try {
      const res = await api.get(`/user/subscribed/active/all-access?page=${page}`);
      return res.data.data.users;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to fetch All-Access subscribers");
    }
  }
);

export const fetchExpiredSubscribers = createAsyncThunk(
  "subscribers/fetchExpired",
  async (page = 1, thunkAPI) => {
    try {
      const res = await api.get(`/user/subscribed/expired?page=${page}`);
      return res.data.data.users;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to fetch expired subscribers");
    }
  }
);

export const updateUserAdminStatus = createAsyncThunk(
  "user/updateAdminStatus",
  async ({ userId }, thunkAPI) => {
    try {
      const response = await api.put(`/user/admin-access/${userId}`, {}, {
        headers: {"Content-Type": "application/json"}
      });
      return response.data.data.user;
    } catch (error) {
      const message = error.response?.data?.message || error.message || "Failed to update admin status";
      return thunkAPI.rejectWithValue(message);
    }
  }
);


const initialState = {
  users: null,
  loading: false,
  error: null,
};

const usersSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder

        // Get all users
      .addCase(getAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get subscribed users
      .addCase(getAllSubscribers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllSubscribers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(getAllSubscribers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

       .addCase(fetchActiveSubscribers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchActiveSubscribers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchActiveSubscribers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Handle fetchScholarTrackSubscribers
      .addCase(fetchScholarTrackSubscribers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchScholarTrackSubscribers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchScholarTrackSubscribers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Handle fetchCareerCatchSubscribers
      .addCase(fetchCareerCatchSubscribers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCareerCatchSubscribers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchCareerCatchSubscribers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Handle fetchAllAccessSubscribers
      .addCase(fetchAllAccessSubscribers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllAccessSubscribers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchAllAccessSubscribers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Handle fetchExpiredSubscribers
      .addCase(fetchExpiredSubscribers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchExpiredSubscribers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchExpiredSubscribers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});


export default usersSlice.reducer;
