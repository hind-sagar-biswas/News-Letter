"use client";

import { deleteBlog } from "@/redux/slices/blogSlice";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const DeleteBlogModal = ({ onClose, blogId }) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.blogData);

  const handleDelete = async () => {
    try {
      await dispatch(deleteBlog(blogId)).unwrap();
      toast.success("Blog deleted successfully");
      onClose();
    } catch (error) {
      toast.error(error || "Blog deletion failed");
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
        <h2 className="text-2xl font-bold text-center mb-4">Delete Blog</h2>

        {/* Message */}
        <p className="text-center text-gray-700 mb-6">
          Are you sure you want to delete this blog? This action cannot be
          undone.
        </p>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4">
          <button
            onClick={handleDelete}
            className={`px-6 py-2 ${
              loading
                ? "bg-linear-to-r from-red-400 via-pink-400 to-purple-400 cursor-not-allowed"
                : "bg-linear-to-r from-red-500 via-pink-500 to-purple-500"
            }  text-white rounded-md font-semibold hover:opacity-90 transition cursor-pointer`}
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
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
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>
                Deleteing...
              </div>
            ) : (
              "Yes, Delete"
            )}
          </button>
          <button
            onClick={onClose}
            className="px-6 py-2 border border-gray-400 text-gray-700 rounded-md hover:bg-gray-100 transition cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteBlogModal;
