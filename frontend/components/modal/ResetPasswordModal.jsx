"use client";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RxCross2 } from "react-icons/rx";
import { resetPassword } from "@/redux/slices/authSlice";
import { toast } from "react-toastify";

const ResetPasswordModal = ({onClose, data}) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.authData);
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  console.log(data)

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { password, confirmPassword } = formData;
    const newErrors = {};

    if (!password || password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    try {
        console.log("request")
      await dispatch(resetPassword({ newPassword: password, confirmPassword, ...data })).unwrap();
      toast.success("Password reset successful");
    //   dispatch(closeModal());
    onClose()
    } catch (err) {
      toast.error(err);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-linear-to-br from-white/90 via-blue-100 to-purple-100 border border-gray-200 w-full max-w-md mx-4 p-6 rounded-2xl relative text-black backdrop-blur shadow-lg">
        <button className="absolute top-4 right-4 cursor-pointer" onClick={() => onClose()}>
          <RxCross2 size={20} />
        </button>
        <h2 className="text-2xl font-bold text-center mb-6">Reset Password</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">New Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter new password"
              className={`w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 ${
                errors.password ? "border-red-500 focus:ring-red-400" : "border-gray-300 focus:ring-purple-500"
              }`}
            />
            {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password}</p>}
          </div>
          <div>
            <label className="block mb-1 font-medium">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm new password"
              className={`w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 ${
                errors.confirmPassword ? "border-red-500 focus:ring-red-400" : "border-gray-300 focus:ring-purple-500"
              }`}
            />
            {errors.confirmPassword && <p className="text-sm text-red-500 mt-1">{errors.confirmPassword}</p>}
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-linear-to-r from-pink-500 via-purple-500 to-blue-500 text-white font-semibold py-2 rounded-md hover:opacity-90 transition flex justify-center items-center gap-2 disabled:opacity-70 cursor-pointer"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                </svg>
                Resetting...
              </>
            ) : (
              "Reset Password"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordModal;