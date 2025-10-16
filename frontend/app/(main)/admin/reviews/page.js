"use client";

import { fetchAllReview } from "@/redux/slices/reviewSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { FaStar } from "react-icons/fa";
import { openModal } from "@/redux/slices/modalSlice";

const ReviewList = () => {
  const dispatch = useDispatch();
  const { reviews } = useSelector((state) => state.reviewData);

  useEffect(() => {
    const getReview = async () => {
      try {
        await dispatch(fetchAllReview()).unwrap();
      } catch (err) {
        toast.error(err || "Fetch review failed");
      }
    };
    getReview();
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 rounded-2xl text-white p-6">
      <h2 className="text-2xl font-bold mb-6 text-green-400">User Reviews</h2>

      <div className="space-y-6">
        {reviews?.map((review) => (
          <div
            key={review?.id}
            className="bg-gray-900 border border-white/10 p-4 rounded-xl flex flex-col gap-3"
          >
            {/* Reviewer Info */}
            <div className="flex items-center gap-3 w-10 h-10 rounded-full">
              <img
                src={review?.user?.img || "/images/userprofile.png"}
                alt={review?.user?.fullName || "User"}
                className="w-10 h-10 rounded-full object-cover border border-white/20"
              />
              <span className="text-sm font-medium text-white">
                {review?.user?.fullName || "Anonymous"}
              </span>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  size={18}
                  className={
                    i < review.rating
                      ? "text-yellow-400"
                      : "text-gray-600"
                  }
                />
              ))}
              <span className="ml-2 text-sm text-gray-400">
                ({review?.rating})
              </span>
            </div>

            {/* Comment */}
            <p className="text-sm text-gray-300">{review?.comment}</p>

            {/* Action */}
            <div className="flex justify-end">
              <button
                onClick={() => dispatch(openModal({modalName: "deleteReview", data: review._id}))}
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-sm font-medium cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewList;
