import api from "@/lib/client-axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const getManualSubscriptions = createAsyncThunk(
  "manualSubscription/getManualSubscriptions",
  async (page = 1, { rejectWithValue }) => {
    try {
      const res = await api.get(`/subscription/manual/valid?page=${page}`);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch subscriptions"
      );
    }
  }
);

export const cancelManualSubscription = createAsyncThunk(
  "manualSubscription/cancelManualSubscription",
  async (subscriptionId, { rejectWithValue }) => {
    try {
      const res = await api.patch(`/subscription/manual/cancel/${subscriptionId}`);
      console.log(res.data)
      return res.data.data; // return the cancelled ID
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to cancel subscription");
    }
  }
);

const manualSubscriptionSlice = createSlice({
  name: "manualSubscription",
  initialState: {
    requestType: "",
    servicePlanId: null,
    price: null,
    subscriptionId: null,
    subscriptions: [],
    loading: false,
    error: null,
  },
  reducers: {
    setSubscriptionData: (state, action) => {
      state.requestType = action.payload.requestType;
      state.servicePlanId = action.payload.servicePlanId || null;
      state.price = action.payload.price;
      state.subscriptionId = action.payload.subscriptionId || null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch subscriptions
      .addCase(getManualSubscriptions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getManualSubscriptions.fulfilled, (state, action) => {
        state.loading = false;
        state.subscriptions = action.payload;
      })
      .addCase(getManualSubscriptions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(cancelManualSubscription.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(cancelManualSubscription.fulfilled, (state, action) => {
        state.loading = false;
        // Remove canceled subscription from the list
        state.subscriptions = state.subscriptions.filter(
          (sub) => sub._id !== action.payload._id
        );
      })
      .addCase(cancelManualSubscription.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setSubscriptionData } = manualSubscriptionSlice.actions;
export default manualSubscriptionSlice.reducer;
