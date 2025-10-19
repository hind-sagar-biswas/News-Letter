import api from "@/lib/client-axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Signup thunk
export const signupUser = createAsyncThunk(
  "user/signupUser",
  async (userData, thunkAPI) => {
    try {
      const response = await api.post("/auth/signup", userData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return null;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || "Signup failed";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// verify user
export const verifyUser = createAsyncThunk(
  "user/verifyUser",
  async (data, thunkAPI) => {
    try {
      const response = await api.post("/auth/verify-user", data, {
        headers: { "Content-Type": "application/json" },
      }); // { email, otp }

      const token = response.data.data.token;
      localStorage.setItem('token', token);

      return response.data.data.user; // return full user after verification
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "User verification failed";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Login thunk
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (data, thunkAPI) => {
    try {
      const response = await api.post("/auth/login", data);
      
      // Save token to localStorage
      const token = response.data.data.token;
      localStorage.setItem('token', token);
      
      // Return user data
      return response.data.data.user;

    } catch (error) {
      const message =
        error.response?.data?.message || error.message || "Login failed";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "user/logout",
  async (_, thunkAPI) => {
    try {
      // Remove token from localStorage
      localStorage.removeItem('token');
      
      return null
    } catch (err) {
      const message =
        err.response?.data?.message || err.message || "Logout failed";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updatePassword = createAsyncThunk(
  "user/updatePassword",
  async (data, thunkAPI) => {
    try {
      const response = await api.post("/auth/update-password", data, {
        headers: { "Content-Type": "application/json" },
      });
      return response.data.message;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "update password failed";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// export const checkAuth = createAsyncThunk(
//   "user/checkAuth",
//   async (_, thunkAPI) => {
//     try {
//       const token = localStorage.getItem('token');
      
//       if (!token) {
//         return thunkAPI.rejectWithValue('No token found');
//       }
      
//       // Optional: Verify token with backend
//       const response = await api.get('/auth/me'); // Your "get current user" endpoint
      
//       return response.data.data.user;
//     } catch (error) {
//       localStorage.removeItem('token');
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

export const updateUserProfile = createAsyncThunk(
  "user/updateUser",
  async (data, thunkAPI) => {
    try {
      const response = await api.patch("/user", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data.data.user;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || "Update failed";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Send OTP to email
export const forgotPassword = createAsyncThunk(
  "user/forgotPassword",
  async (email, thunkAPI) => {
    try {
      const response = await api.post(
        "/auth/forgot-password",
        { email },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      return response.data.message;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || "Failed to send OTP";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Verify OTP
export const verifyOtp = createAsyncThunk(
  "user/verifyOtp",
  async (data, thunkAPI) => {
    try {
      const response = await api.post("/auth/verify-otp", data, {
        headers: { "Content-Type": "application/json" },
      }); // { email, otp }
      return response.data.message;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "OTP verification failed";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Reset Password
export const resetPassword = createAsyncThunk(
  "user/resetPassword",
  async (data, thunkAPI) => {
    try {
      const response = await api.post("/auth/reset-password", data, {
        headers: { "Content-Type": "application/json" },
      }); // { email, otp, newPassword, confirmPassword }

      const token = response.data.data.token;
      localStorage.setItem('token', token);

      return response.data.data.user;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Password reset failed";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (password, thunkAPI) => {
    try {
      const response = await api.delete("/auth/", {
        data: { password },
        headers: { "Content-Type": "application/json" },
      });

      localStorage.removeItem('token');

      return null; // or just return null
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Delete account failed";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateSkills = createAsyncThunk(
  "profile/updateSkills",
  async (skills, { rejectWithValue }) => {
    try {
      const response = await api.put("/user/update-skills", {skills}, {
        headers: { "Content-Type": "application/json" },
      });

      return response.data.data.user;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update skills"
      );
    }
  }
);

const storedUser =
  typeof window !== "undefined" ? localStorage.getItem("user") : null;

let parsedUser = null;
try {
  if (storedUser && storedUser !== "undefined") {
    parsedUser = JSON.parse(storedUser);
  }
} catch (err) {
  console.error("Failed to parse stored user:", err);
  parsedUser = null;
}

const initialState = {
  user: parsedUser,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    // logoutUser: (state) => {
    //   state.user = null;
    //   localStorage.removeItem("user");
    // },
  },
  extraReducers: (builder) => {
    builder
      // Signup
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Verify User (new)
      .addCase(verifyUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        localStorage.setItem("user", JSON.stringify(action.payload));
      })
      .addCase(verifyUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        localStorage.setItem("user", JSON.stringify(action.payload));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //logout
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        localStorage.removeItem("user");
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //update password
      .addCase(updatePassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(updatePassword.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updatePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //update profile
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        localStorage.setItem("user", JSON.stringify(action.payload));
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Forgot Password
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Verify OTP
      .addCase(verifyOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyOtp.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //reset password
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        localStorage.setItem("user", JSON.stringify(action.payload));
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete user
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        localStorage.removeItem("user");
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // update skills
      .addCase(updateSkills.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateSkills.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.user = action.payload;
        localStorage.setItem("user", JSON.stringify(action.payload));
      })
      .addCase(updateSkills.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export default authSlice.reducer;
