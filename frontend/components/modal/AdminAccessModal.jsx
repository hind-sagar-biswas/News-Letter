"use client";

import { RxCross2 } from "react-icons/rx";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  updateUserAdminStatus,
  getAllUsers,
  getAllSubscribers,
  fetchActiveSubscribers,
  fetchExpiredSubscribers,
} from "@/redux/slices/usersSlice";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FaSpinner } from "react-icons/fa";

const AdminAccessModal = ({ user, onClose, page }) => {
  const dispatch = useDispatch();
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    setLoading(true);
    try {
      await dispatch(
        updateUserAdminStatus({ userId: user._id })
      ).unwrap();
      toast.success(
        `User ${user.fullName} is now ${
          user.isAdmin ? "not an Admin" : "an Admin"
        }`
      );
      // Refetch users to update UI
      if (pathname === "/admin/users/subscriber") {
        dispatch(getAllSubscribers(page));
      } else if(pathname === "/admin/users/all") {
        dispatch(getAllUsers(page));
      } else if(pathname === "/admin/users/active"){
        dispatch(fetchActiveSubscribers(page))
      } else if(pathname === "/admin/users/expired"){
        dispatch(fetchExpiredSubscribers(page))
      }
      
      onClose();
    } catch (error) {
      toast.error(error || "Failed to update admin access");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-linear-to-br from-white/90 via-blue-100 to-purple-100 border border-gray-200 w-full max-w-md mx-4 p-6 rounded-2xl relative text-black backdrop-blur shadow-lg">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-black cursor-pointer"
          onClick={onClose}
        >
          <RxCross2 size={20} />
        </button>

        {/* Title */}
        <h2 className="text-2xl font-bold text-center mb-4">
          Confirm Admin Access
        </h2>

        {/* Message */}
        <p className="text-center text-gray-700 mb-6">
          Are you sure you want to{" "}
          <span
            className={
              user.isAdmin
                ? "text-red-600 font-semibold"
                : "text-green-600 font-semibold"
            }
          >
            {user.isAdmin ? "remove" : "grant"}
          </span>{" "}
          admin access to{" "}
          <span className="font-semibold text-blue-800">{user.fullName}</span>?
        </p>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4">
          <button
            onClick={handleConfirm}
            disabled={loading}
            className={`px-6 py-2 flex items-center justify-center gap-2 bg-linear-to-r from-pink-500 via-purple-500 to-blue-500 text-white rounded-md font-semibold transition cursor-pointer ${
              loading ? "opacity-70 cursor-not-allowed" : "hover:opacity-90"
            }`}
          >
            {loading && <FaSpinner className="animate-spin" />}
            {loading ? "Processing..." : "Yes, Confirm"}
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

export default AdminAccessModal;
