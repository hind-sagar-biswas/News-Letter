"use client";
import { createBlog } from "@/redux/slices/blogSlice";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const BlogForm = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.blogData);

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log({ image, title, description });

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("img", image);

    try {
      await dispatch(createBlog(formData)).unwrap();
      toast.success("New Blog created");
      setImage(null);
      setPreview(null);
      setTitle("");
      setDescription("");
    } catch (err) {
      toast.error(err || "Blog creation failed.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 rounded-2xl text-white flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 p-8 rounded-2xl shadow-lg max-w-lg w-full space-y-6 border border-white/10"
      >
        <h2 className="text-2xl font-bold text-center text-red-400">
          Submit a New Blog
        </h2>

        {/* Image Upload */}
        <div>
          <label className="block mb-2 text-sm font-semibold">Blog Image</label>
          <input
            type="file"
            required
            accept="image/*"
            onChange={handleImageChange}
            className="w-full bg-gray-800 text-sm p-2 rounded-lg border border-white/20 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-red-500 file:text-white file:cursor-pointer hover:file:bg-red-600 cursor-pointer"
          />
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="mt-4 rounded-lg max-h-48 object-cover border border-white/20"
            />
          )}
        </div>

        {/* Title Input */}
        <div>
          <label className="block mb-2 text-sm font-semibold">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter blog title"
            className="w-full p-3 rounded-lg bg-gray-800 border border-white/20 placeholder-gray-400"
            required
          />
        </div>

        {/* Description Input */}
        <div>
          <label className="block mb-2 text-sm font-semibold">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Write your blog description..."
            rows={5}
            className="w-full p-3 rounded-lg bg-gray-800 border border-white/20 placeholder-gray-400"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-lg font-semibold transition cursor-pointer ${
            loading
              ? "bg-red-400 cursor-not-allowed"
              : "bg-red-500 hover:bg-red-600"
          }`}
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
              Submitting...
            </div>
          ) : (
            "Submit Blog"
          )}
        </button>
      </form>
    </div>
  );
};

export default BlogForm;
