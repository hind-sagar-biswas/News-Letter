"use client";
import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "@/redux/slices/modalSlice";
import { loginUser } from "@/redux/slices/authSlice";
import { toast } from "react-toastify";

const LoginModal = ({ onClose }) => {
  const { loading } = useSelector((state) => state.authData);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = (data) => {
    const newErrors = {};

    if (!data.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(data.email)) {
      newErrors.email = "Invalid email address.";
    }

    if (!data.password) {
      newErrors.password = "Password is required.";
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
      const newValidation = validate({ ...formData, [name]: value });
      setErrors(newValidation);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);

    const validationErrors = validate(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    try {
      await dispatch(loginUser(formData)).unwrap();
      toast.success("login successful!");
      onClose()
    } catch (err) {
      toast.error(err || "Login failed, try again later");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-linear-to-br from-white/90 via-blue-100 to-purple-100 border border-gray-200 w-full max-w-md mx-4 p-6 rounded-2xl relative text-black backdrop-blur shadow-lg">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-black cursor-pointer"
          onClick={() => onClose()}
        >
          <RxCross2 size={20} />
        </button>

        {/* Title */}
        <h2 className="text-2xl font-bold text-center mb-6">
          Login to Your Account
        </h2>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block font-medium mb-1">Email</label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className={`w-full border outline-1 px-3 py-2 rounded-md focus:outline-none focus:ring-2 ${
                errors.email
                  ? "border-red-500 focus:ring-red-400 outline-none"
                  : "border-gray-300 focus:ring-purple-500"
              }`}
            />
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block font-medium mb-1">Password</label>
            <input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className={`w-full border outline px-3 py-2 rounded-md focus:outline-none focus:ring-2 ${
                errors.password
                  ? "border-red-500 focus:ring-red-400 outline-none"
                  : "border-gray-300 focus:ring-purple-500"
              }`}
            />
            {errors.password && (
              <p className="text-sm text-red-500 mt-1">{errors.password}</p>
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
                Logging in...
              </>
            ) : (
              "Login"
            )}
          </button>
        </form>

        {/* Links */}
        <div className="mt-6 text-center text-sm text-gray-700">
          <p>
            Don&apos;t have an account?{" "}
            <span
              className="text-purple-700 font-semibold cursor-pointer hover:underline"
              onClick={() => dispatch(openModal({ modalName: "signup" }))}
            >
              Signup here
            </span>
          </p>
          <p className="mt-2">
            <span
              className="text-blue-600 font-semibold cursor-pointer hover:underline"
              onClick={() => dispatch(openModal({modalName: "forgotPassword"}))}
            >
              Forgot password?
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
