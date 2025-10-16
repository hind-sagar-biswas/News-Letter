import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const manualSubscriptionSlice = createSlice({
  name: "manualSubscription",
  initialState: {
    requestType: "",
    servicePlanId: null,
    price: null,
    subscriptionId: null,
  },
  reducers: {
    setSubscriptionData: (state, action) => {
      state.requestType = action.payload.requestType;
      state.servicePlanId = action.payload.servicePlanId || null;
      state.price = action.payload.price;
      state.subscriptionId = action.payload.subscriptionId || null;
    },
  },
});

export const { setSubscriptionData } = manualSubscriptionSlice.actions;
export default manualSubscriptionSlice.reducer;
