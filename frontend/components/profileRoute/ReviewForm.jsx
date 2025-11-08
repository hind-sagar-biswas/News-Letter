"use client";
import { createReview } from "@/redux/slices/reviewSlice";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const ReviewForm = ({ subscriptionData }) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.reviewData);
  const { data } = useSelector((state) => state.subscriptionData);

  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = async () => {
    const data = {
      rating,
      comment,
    };
    try {
      await dispatch(createReview(data)).unwrap();
      setRating(0);
      setComment("");
      toast.success("Review submitted");
    } catch (err) {
      toast.error(err || "Review submission failed");
    }
  };

  return (
    <div className="border-2 border-white/30 p-6 rounded-xl relative">
      <h2 className="text-xl font-bold text-blue-300">
        GOT THE LATEST NEWSLETTER!
      </h2>
      <p className="mt-2 text-sm">How was it? Leave a rating</p>

      <div className="mt-4">
        <p className="text-sm mb-1">Give Star: {rating}/5</p>
        <div className="text-2xl text-white mb-4 flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              className={`cursor-pointer transition ${
                (hoverRating || rating) >= star
                  ? "text-yellow-400"
                  : "text-gray-400"
              }`}
            >
              ★
            </span>
          ))}
        </div>

        <textarea
          placeholder="Leave a Comment or Suggestion"
          className="w-full p-2 rounded-md bg-transparent border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm resize-none text-white placeholder:text-gray-400"
          rows={4}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></textarea>
      </div>

      {/* Submit Button */}
      <div className="mt-4 flex justify-center lg:justify-end">
        <button
          onClick={handleSubmit}
          disabled={loading || !subscriptionData}
          className={`bg-linear-to-r from-purple-600 to-pink-600 px-6 py-2 rounded-lg text-sm font-semibold text-white hover:opacity-90 transition flex items-center gap-2 cursor-pointer ${
            loading || !subscriptionData ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? (
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"
              ></path>
            </svg>
          ) : (
            "SUBMIT"
          )}
        </button>
      </div>
    </div>
  );
};

export default ReviewForm;
