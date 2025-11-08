"use client";
import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "@/redux/slices/modalSlice";
import { toast } from "react-toastify";
import { updatePassword } from "@/redux/slices/authSlice";

const UpdatePasswordModal = ({ onClose }) => {
  const { loading } = useSelector((state) => state.authData);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = (data) => {
    const newErrors = {};

    if (!data.currentPassword) {
      newErrors.currentPassword = "Current password is required.";
    }
    if (!data.newPassword || data.newPassword.length < 6) {
      newErrors.newPassword = "New password must be at least 6 characters.";
    }
    if (data.newPassword !== data.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (submitted) {
      setErrors(validate({ ...formData, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);

    const validationErrors = validate(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    try {
      const res = await dispatch(updatePassword(formData)).unwrap();
      toast.success(res);
      dispatch(closeModal());
    } catch (err) {
      toast.error(err || "Failed to update password.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-linear-to-br from-white/90 via-blue-100 to-purple-100 border border-gray-200 w-full max-w-md mx-4 p-6 rounded-2xl relative text-black backdrop-blur shadow-lg">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-black cursor-pointer"
          onClick={() => dispatch(onClose())}
        >
          <RxCross2 size={20} />
        </button>

        {/* Title */}
        <h2 className="text-2xl font-bold text-center mb-6">
          Update Your Password
        </h2>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Current Password */}
          <div>
            <label className="block font-medium mb-1">Current Password</label>
            <input
              type="password"
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
              className={`w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 ${
                errors.currentPassword
                  ? "border-red-500 focus:ring-red-400"
                  : "border-gray-300 focus:ring-purple-500"
              }`}
              placeholder="Enter current password"
            />
            {errors.currentPassword && (
              <p className="text-sm text-red-500 mt-1">
                {errors.currentPassword}
              </p>
            )}
          </div>

          {/* New Password */}
          <div>
            <label className="block font-medium mb-1">New Password</label>
            <input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              className={`w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 ${
                errors.newPassword
                  ? "border-red-500 focus:ring-red-400"
                  : "border-gray-300 focus:ring-purple-500"
              }`}
              placeholder="Enter new password"
            />
            {errors.newPassword && (
              <p className="text-sm text-red-500 mt-1">{errors.newPassword}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block font-medium mb-1">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 ${
                errors.confirmPassword
                  ? "border-red-500 focus:ring-red-400"
                  : "border-gray-300 focus:ring-purple-500"
              }`}
              placeholder="Re-enter new password"
            />
            {errors.confirmPassword && (
              <p className="text-sm text-red-500 mt-1">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-linear-to-r from-pink-500 via-purple-500 to-blue-500 text-white font-semibold py-2 rounded-md hover:opacity-90 transition flex justify-center items-center gap-2 disabled:opacity-70 cursor-pointer"
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
                Updating...
              </>
            ) : (
              "Update Password"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdatePasswordModal;
