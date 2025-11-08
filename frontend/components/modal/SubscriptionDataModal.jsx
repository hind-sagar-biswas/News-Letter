"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import {
  subscribeUser,
  updatePackageForFree,
  updatePackageWithCharge,
} from "@/redux/slices/subscriptionSlice";
import { setSubscriptionData } from "@/redux/slices/manualSubscriptionSlice";
import LoadingSpinner from "../helper/LoadingSpinner";



const SubscriptionDataModal = ({ data: modalData, onClose }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { _id, startingDate, endingDate, servicePlan, price } =
    modalData.activeSubscription || {};
  const clickedServicePrice = modalData.clickedServicePrice;
  const clickedServiceId = modalData.clickedServiceId;
  // console.log(clickedServicePrice)

  const [loadingRenew, setLoadingRenew] = useState(false);
  const [loadingUpdate, setLoadingUpdate] = useState(false);

  const isAnyLoading = loadingRenew || loadingUpdate;

  const handleAddOneMonth = async () => {
    setLoadingRenew(true);
    dispatch(
      setSubscriptionData({
        requestType: "subscribe",
        servicePlanId: servicePlan._id,
        price,
      })
    );
    router.push("/payment-options");
    // setLoadingRenew(true);
    // try {
    //   const result = await dispatch(
    //     subscribeUser({ price, servicePlanId: servicePlan._id })
    //   ).unwrap();

    //   if (result) {
    //     window.location.replace(result); // result is the URL
    //   }
    // } catch (err) {
    //   toast.error(err || "Subscription failed");
    // } finally {
    //   setLoadingRenew(false);
    // }
    setLoadingRenew(false);
  };

  const handleUpdate = async () => {
    setLoadingUpdate(true);
    const newPlanId = clickedServiceId;
    const newPrice = clickedServicePrice;

    const currentPrice = price;
    const subscriptionId = _id;

    try {
      if (newPrice === currentPrice || newPrice < currentPrice) {
        await dispatch(
          updatePackageForFree({
            subscriptionId,
            servicePlanId: newPlanId,
            price: newPrice,
          })
        ).unwrap();
        toast.success("Package updated successfully for free.");
        onClose();
      } else {
        const priceDifference = newPrice - currentPrice;
        dispatch(
          setSubscriptionData({
            requestType: "update",
            servicePlanId: newPlanId,
            price: priceDifference,
            subscriptionId
          })
        );
        router.push("/payment-options");
        // const result = await dispatch(
        //   updatePackageWithCharge({
        //     price: priceDifference,
        //     servicePlanId: newPlanId,
        //     subscriptionId,
        //   })
        // ).unwrap();

        // if (result) {
        //   window.location.replace(result);
        // }
      }
    } catch (err) {
      toast.error(err || "Update failed");
    } finally {
      setLoadingUpdate(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-linear-to-br from-white/90 via-blue-100 to-purple-100 border border-gray-200 w-full max-w-md mx-4 p-6 rounded-2xl relative text-black backdrop-blur shadow-lg">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black cursor-pointer"
        >
          <RxCross2 size={20} />
        </button>

        {/* Title */}
        <h2 className="text-2xl font-bold text-center mb-4 text-blue-700">
          Subscription Info
        </h2>
        <p className="text-center text-sm text-gray-800 mb-4">
          Your Already Have An Active Subscription
        </p>

        {/* Info */}
        <div className="text-gray-800 text-sm space-y-2 mb-4">
          <p>
            <strong>Starting Date:</strong>{" "}
            {startingDate
              ? new Date(startingDate).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })
              : "N/A"}
          </p>
          <p>
            <strong>Ending Date:</strong>{" "}
            {endingDate
              ? new Date(endingDate).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })
              : "N/A"}
          </p>

          <p className="border-b border-b-black pb-2">
            <strong>Subscribed package:</strong> {servicePlan.title}
          </p>
          <p>
            <strong>Selected Package Price:</strong> ${price}
          </p>
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          {/* Renew */}
          <button
            onClick={handleAddOneMonth}
            disabled={isAnyLoading}
            className="w-full bg-linear-to-r from-pink-500 via-purple-500 to-blue-500 text-white font-semibold py-2 rounded-md hover:opacity-90 transition flex justify-center items-center gap-2 disabled:opacity-70 cursor-pointer"
          >
            {loadingRenew ? (
              <LoadingSpinner message="Processing..." />
            ) : (
              "One month more"
            )}
          </button>

          {/* Update */}
          <button
            onClick={handleUpdate}
            disabled={isAnyLoading}
            className="w-full bg-linear-to-r from-pink-500 via-purple-500 to-blue-500 text-white font-semibold py-2 rounded-md hover:opacity-90 transition flex justify-center items-center gap-2 disabled:opacity-70 cursor-pointer"
          >
            {loadingUpdate ? (
              <LoadingSpinner message="Processing..." />
            ) : (
              "Update Package"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionDataModal;
