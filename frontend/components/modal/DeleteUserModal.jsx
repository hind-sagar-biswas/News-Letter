"use client";
import { deleteUser } from "@/redux/slices/authSlice";
import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function DeleteUserModal({ onClose }) {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.authData);

  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!password.trim()) {
      newErrors.password = "Password is required.";
    }
    return newErrors;
  };

  const errors = submitted ? validate() : {};

  const handleDelete = async () => {
    setSubmitted(true);
    if (Object.keys(errors).length > 0) return;

    try {
      await dispatch(deleteUser(password)).unwrap();
      toast.success("Account deleted successfully.");
      onClose();
    } catch(err) {
      toast.error(err || "profile delete failed");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-linear-to-br from-white/90 via-red-100 to-pink-100 border border-gray-200 w-full max-w-md mx-4 p-6 rounded-2xl relative text-black backdrop-blur shadow-lg">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-black cursor-pointer"
          onClick={onClose}
          aria-label="Close modal"
        >
          <RxCross2 size={20} />
        </button>

        {/* Title */}
        <h2 className="text-2xl font-bold text-center mb-6 text-red-600">
          Delete Account
        </h2>

        {/* Instruction */}
        <p className="mb-4 text-center text-gray-700">
          Enter your password to confirm deletion:
        </p>

        {/* Password Input */}
        <div className="mb-4">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Your password"
            className={`w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 ${
              errors.password
                ? "border-red-500 focus:ring-red-400"
                : "border-gray-300 focus:ring-pink-500"
            }`}
            disabled={loading}
          />
          {errors.password && (
            <p className="text-sm text-red-500 mt-1">{errors.password}</p>
          )}
          {error && !errors.password && (
            <p className="text-sm text-red-600 mt-1">{error}</p>
          )}
        </div>

        {/* Delete Button */}
        <button
          onClick={handleDelete}
          disabled={loading}
          className="w-full bg-linear-to-r from-pink-500 via-red-600 to-pink-700 text-white font-semibold py-2 rounded-md hover:opacity-90 transition flex justify-center items-center gap-2 disabled:opacity-70 cursor-pointer"
        >
          {loading ? (
            <>
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
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                />
              </svg>
              Deleting...
            </>
          ) : (
            "Delete Account"
          )}
        </button>

        {/* Cancel Button */}
        <button
          onClick={onClose}
          disabled={loading}
          className="mt-4 w-full bg-transparent border border-gray-300 text-gray-700 py-2 rounded-md hover:bg-gray-100 transition disabled:opacity-70"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
