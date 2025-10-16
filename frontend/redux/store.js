import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import servicePlanReducer from "./slices/servicePlanSlice";
import usersReducer from './slices/usersSlice';
import blogReducer from './slices/blogSlice';
import modalReducer from "./slices/modalSlice";
import reviewReducer from "./slices/reviewSlice";
import subscriptionReducer from "./slices/subscriptionSlice";
import brevoReducer from "./slices/blogSlice";
import manualSubscriptionReducer from "./slices/manualSubscriptionSlice";

export const store = configureStore({
    reducer: {
    authData: authReducer,
    servicePlanData: servicePlanReducer,
    usersData: usersReducer,
    blogData: blogReducer,
    modal: modalReducer,
    reviewData: reviewReducer,
    subscriptionData: subscriptionReducer,
    brevoSlice: brevoReducer,
    manualSubscriptionSlice: manualSubscriptionReducer
  },
})
