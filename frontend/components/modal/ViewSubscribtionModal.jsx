"use client";
import { RxCross2 } from "react-icons/rx";
import { useSelector } from "react-redux";

const ViewSubscriptionModal = ({ onClose }) => {
  const { data } = useSelector((state) => state.subscriptionData);
  const { startingDate, endingDate, servicePlan, price } = data || {};

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
          Subscription Details
        </h2>
        <p className="text-center text-sm text-gray-800 mb-4">
          Your Current Active Subscription
        </p>

        {/* Subscription Info */}
        <div className="text-gray-800 text-sm space-y-2">
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
          <p>
            <strong>Subscribed Package:</strong> {servicePlan?.title || "N/A"}
          </p>
          <p>
            <strong>Price:</strong> ${price ?? "N/A"}
          </p>
        </div>

        <div className="mt-6 flex justify-center">
          <button
            onClick={onClose}
            className="bg-linear-to-r from-pink-500 via-purple-500 to-blue-500 text-white font-semibold py-2 px-6 rounded-md hover:opacity-90 transition cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewSubscriptionModal;
