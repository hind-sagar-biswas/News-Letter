"use client";

import { openModal } from "@/redux/slices/modalSlice";
import { signupUser } from "@/redux/slices/authSlice";
import { useState, useRef, useEffect } from "react";
import { FaUserPlus } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const SignupModal = ({ onClose }) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.authData);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    termsAccepted: false,
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewFileUrl, setPreviewFileUrl] = useState(null);

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const fileInputRef = useRef();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const updatedValue = type === "checkbox" ? checked : value;

    setFormData((prev) => ({
      ...prev,
      [name]: updatedValue,
    }));

    if (submitted) {
      validateField(name, updatedValue);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewFileUrl(URL.createObjectURL(file));
      if (submitted) validateField("profileImage", selectedFile);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!selectedFile) newErrors.profileImage = "Profile image is required.";
    if (!formData.fullName.trim())
      newErrors.fullName = "Full name is required.";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!formData.password) newErrors.password = "Password is required.";
    else if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters.";
    if (formData.confirmPassword !== formData.password)
      newErrors.confirmPassword = "Passwords do not match.";
    if (!formData.termsAccepted)
      newErrors.termsAccepted = "You must accept the terms and conditions.";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const validateField = (name, value) => {
    let message = "";

    switch (name) {
      case "profileImage":
        if (!value) message = "Profile image is required.";
        break;
      case "fullName":
        if (!value.trim()) message = "Full name is required.";
        break;
      case "email":
        if (!value.trim()) message = "Email is required.";
        else if (!/^\S+@\S+\.\S+$/.test(value))
          message = "Please enter a valid email address.";
        break;
      case "password":
        if (!value) message = "Password is required.";
        else if (value.length < 6)
          message = "Password must be at least 6 characters.";
        break;
      case "confirmPassword":
        if (value !== formData.password) message = "Passwords do not match.";
        break;
      case "termsAccepted":
        if (!value) message = "You must accept the terms and conditions.";
        break;
      default:
        break;
    }

    setErrors((prev) => ({
      ...prev,
      [name]: message,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);

    if (!validateForm()) return;

    // Create FormData object to send multipart/form-data
    const data = new FormData();
    data.append("fullName", formData.fullName);
    data.append("email", formData.email);
    data.append("password", formData.password);
    data.append("confirmPassword", formData.confirmPassword);
    data.append("img", selectedFile);

    // Dispatch signup async thunk
    try {
      await dispatch(signupUser(data)).unwrap();
      dispatch(openModal({ modalName: "verifyUser", data: formData.email }));
      toast.success("Verification mail send");
    } catch (err) {
      toast.error(err || "Signup failed.");
    }
  };

  useEffect(() => {
    return () => {
      if (previewFileUrl) {
        URL.revokeObjectURL(previewFileUrl);
      }
    };
  }, [previewFileUrl]);

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="text-black bg-linear-to-br from-white/90 via-blue-100 to-purple-100 border border-gray-200 w-full max-w-md rounded-2xl p-8 shadow-2xl relative backdrop-blur">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-black text-xl font-bold hover:text-red-500 cursor-pointer"
        >
          ×
        </button>

        <h2 className="text-2xl font-bold text-center mb-6">
          Create Your Account
        </h2>

        {/* Profile Image Picker */}
        <div className="flex justify-center mb-4 flex-col items-center">
          <div
            className="w-20 h-20 rounded-full bg-gray-200 cursor-pointer border-2 border-gray-400 overflow-hidden flex items-center justify-center"
            onClick={() => fileInputRef.current.click()}
          >
            {previewFileUrl ? (
              <img
                src={previewFileUrl}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <FaUserPlus className="text-gray-500 text-2xl" /> // <- Make sure to import this icon
            )}
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              className="hidden"
              onChange={handleImageChange}
            />
          </div>
          {errors.profileImage && (
            <p className="text-sm text-red-600 mt-2">{errors.profileImage}</p>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              className={`w-full px-4 py-2 border outline-1 rounded-md focus:outline-none focus:ring-2 ${
                errors.fullName
                  ? "border-red-500 focus:ring-red-400 outline-none"
                  : "border-gray-300 focus:ring-purple-500"
              }`}
            />

            {errors.fullName && (
              <p className="text-red-600 text-sm mt-1">{errors.fullName}</p>
            )}
          </div>

          <div>
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-2 border outline-1 rounded-md focus:outline-none focus:ring-2 ${
                errors.email
                  ? "border-red-500 focus:ring-red-400 outline-none"
                  : "border-gray-300 focus:ring-purple-500"
              }`}
            />

            {errors.email && (
              <p className="text-red-600 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <input
              type="password"
              name="password"
              placeholder="Create Password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full px-4 py-2 border outline-1 rounded-md focus:outline-none focus:ring-2 ${
                errors.password
                  ? "border-red-500 focus:ring-red-400 outline-none"
                  : "border-gray-300 focus:ring-purple-500"
              }`}
            />
            {errors.password && (
              <p className="text-red-600 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          <div>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`w-full px-4 py-2 border outline-1 rounded-md focus:outline-none focus:ring-2 ${
                errors.confirmPassword
                  ? "border-red-500 focus:ring-red-400 outline-none"
                  : "border-gray-300 focus:ring-purple-500"
              }`}
            />
            {errors.confirmPassword && (
              <p className="text-red-600 text-sm mt-1">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          <div>
            <label className="flex items-start gap-2 text-sm text-gray-700">
              <input
                type="checkbox"
                name="termsAccepted"
                checked={formData.termsAccepted}
                onChange={handleChange}
                className="mt-1 cursor-pointer"
              />
              <span>
                By clicking the box, you are accepting all terms and conditions
                of <strong>OPT. National</strong>. You must need to accept this
                to create your profile.
              </span>
            </label>
            {errors.termsAccepted && (
              <p className="text-red-600 text-sm mt-1">
                {errors.termsAccepted}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-linear-to-r from-pink-500 via-purple-500 to-blue-500 text-white font-bold py-2 rounded-md hover:opacity-90 transition cursor-pointer flex items-center justify-center gap-2 disabled:opacity-70"
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
                Registering...
              </>
            ) : (
              "Register"
            )}
          </button>
        </form>

        <p className="text-sm text-center mt-4 text-gray-600">
          Have an account?{" "}
          <button
            onClick={() => dispatch(openModal({ modalName: "login" }))}
            className="text-blue-600 hover:underline cursor-pointer"
          >
            Login here
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignupModal;
