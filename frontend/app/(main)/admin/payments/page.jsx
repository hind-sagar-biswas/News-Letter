"use client"

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cancelManualSubscription, getManualSubscriptions } from "@/redux/slices/manualSubscriptionSlice";
import SubscriptionTable from "./subscriptionsTable";
import LoadingSpinner from "@/components/helper/LoadingSpinner";

const ManualSubscriptionPage = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);

  const { subscriptions, loading, error } = useSelector(
    (state) => state.manualSubscriptionSlice
  );

  useEffect(() => {
    dispatch(getManualSubscriptions(page));
  }, [dispatch, page]);

  const handleCancel = (subscriptionId) => {
    if (!confirm("Are you sure you want to cancel this subscription?")) return;
    dispatch(cancelManualSubscription(subscriptionId));
  };

  return (
    <div className="p-6 bg-gray-950 min-h-screen">
      <h1 className="text-2xl font-bold text-white mb-4">Manual Subscriptions</h1>

      {loading && subscriptions.length === 0 ? (
        <LoadingSpinner message="Loading subscriptions..." /> 
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <>
          <SubscriptionTable
            subscriptions={subscriptions}
            handleCancel={handleCancel}
            loading={loading}
          />

          <div className="flex justify-between items-center mt-6">
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page <= 1}
              className="px-4 py-2 bg-fuchsia-600 text-white rounded-lg disabled:opacity-50"
            >
              Previous
            </button>
            <span className="text-white font-bold">Page {page}</span>
            <button
              onClick={() => setPage((prev) => prev + 1)}
              className="px-4 py-2 bg-fuchsia-600 text-white rounded-lg"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ManualSubscriptionPage;