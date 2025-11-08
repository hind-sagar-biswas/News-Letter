"use client";

import { RxCross2 } from "react-icons/rx";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { logoutUser } from "@/redux/slices/authSlice";

const LogoutModal = ({ onClose }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logoutUser());
    toast.info("logout successful")
    onClose();
    router.push("/");
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
        <h2 className="text-2xl font-bold text-center mb-4">Confirm Logout</h2>

        {/* Message */}
        <p className="text-center text-gray-700 mb-6">
          Are you sure you want to logout from your account?
        </p>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4">
          <button
            onClick={handleLogout}
            className="px-6 py-2 bg-linear-to-r from-pink-500 via-purple-500 to-blue-500 text-white rounded-md font-semibold hover:opacity-90 transition cursor-pointer"
          >
            Yes, Logout
          </button>
          <button
            onClick={() => onClose()}
            className="px-6 py-2 border border-gray-400 text-gray-700 rounded-md hover:bg-gray-100 transition cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
