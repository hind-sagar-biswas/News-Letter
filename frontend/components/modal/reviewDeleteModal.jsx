"use client";

import { deleteReview } from "@/redux/slices/reviewSlice";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const DeleteReviewModal = ({ onClose, reviewId }) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.reviewData);

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteReview(id)).unwrap();
      toast.success("Review deleted successfully");
      onClose();
    } catch (err) {
      toast.error("Action failed");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-linear-to-br from-white/90 via-red-100 to-pink-100 border border-gray-200 w-full max-w-md mx-4 p-6 rounded-2xl relative text-black backdrop-blur shadow-lg">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-black cursor-pointer"
          onClick={onClose}
          disabled={loading}
        >
          <RxCross2 size={20} />
        </button>

        {/* Title */}
        <h2 className="text-2xl font-bold text-center mb-4 text-red-600">
          Confirm Delete
        </h2>

        {/* Message */}
        <p className="text-center text-gray-700 mb-6">
          Are you sure you want to delete this review? This action cannot be undone.
        </p>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4">
          <button
            onClick={() => handleDelete(reviewId)}
            disabled={loading}
            className="px-6 py-2 bg-linear-to-r from-red-500 via-pink-500 to-orange-400 text-white rounded-md font-semibold hover:opacity-90 transition cursor-pointer flex items-center justify-center gap-2 min-w-[130px]"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              "Yes, Delete"
            )}
          </button>
          <button
            onClick={onClose}
            disabled={loading}
            className="px-6 py-2 border border-gray-400 text-gray-700 rounded-md hover:bg-gray-100 transition cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteReviewModal;
