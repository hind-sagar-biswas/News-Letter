"use client";

import { updateBlog } from "@/redux/slices/blogSlice";
import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { RxCross2 } from "react-icons/rx";
import CSEditor from "@/components/CSEditor";

const UpdateBlogModal = ({ blogData, onClose }) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.blogData);
  const editorRef = useRef(null);

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(blogData?.img || "");
  const [title, setTitle] = useState(blogData?.title || "");
  const [description, setDescription] = useState(blogData?.description || "");

  useEffect(() => {
    if (blogData) {
      setTitle(blogData.title);
      setDescription(blogData.description);
      setPreview(blogData.img);
      // Set editor content after a delay to ensure editor is ready
      setTimeout(() => {
        if (editorRef.current && blogData.body) {
          editorRef.current.setData(blogData.body);
        }
      }, 100);
    }
  }, [blogData]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Get CKEditor data
    const body = editorRef.current?.getData() || "";

    if (!body.trim()) {
      toast.error("Body cannot be empty.");
      return;
    }

    if (!title) {
      toast.error("Please enter a title.");
      return;
    }

    if (!description) {
      toast.error("Please enter a description.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("body", body);
    if (image) formData.append("img", image);

    try {
      await dispatch(updateBlog({ id: blogData._id, formData })).unwrap();
      toast.success("Blog updated successfully");
      onClose();
    } catch (err) {
      toast.error(err || "Blog update failed");
    }
  };

  return (
    <div className="fixed inset-0 bg-transparent bg-opacity-60 flex items-center justify-center z-50 p-4 overflow-y-auto hide-scrollbar">
      <form
        onSubmit={handleSubmit}
        className="relative bg-gray-900 p-6 rounded-2xl shadow-lg w-full max-w-lg border border-white/10 max-h-[90vh] overflow-y-auto hide-scrollbar"
      >
        {/* Close Button */}
        <button type="button" onClick={onClose} className="absolute top-4 right-4 text-white text-xl cursor-pointer">
          <RxCross2 />
        </button>

        <h2 className="text-2xl font-bold text-center text-red-400 mb-6">
          Update Blog
        </h2>

        {/* Blog Image Upload */}
        <div className="mb-4">
          <label className="block mb-2 text-sm font-semibold">Blog Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full bg-gray-800 text-sm p-2 rounded-lg border border-white/20 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-red-500 file:text-white file:cursor-pointer hover:file:bg-red-600"
          />
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="mt-4 rounded-lg max-h-48 object-cover border border-white/20"
            />
          )}
        </div>

        {/* Title */}
        <div className="mb-4">
          <label className="block mb-2 text-sm font-semibold">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-800 border border-white/20 placeholder-gray-400"
            required
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block mb-2 text-sm font-semibold">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="w-full p-3 rounded-lg bg-gray-800 border border-white/20 placeholder-gray-400"
            required
          />
        </div>

        {/* Body */}
        <div className="mb-6">
          <label className="block mb-2 text-sm font-semibold">Body</label>
          <article className="prose lg:prose-xl !max-w-none prose-invert">
            <CSEditor
              onReady={(editor) => {
                editorRef.current = editor;
                // Set initial content after editor is ready
                if (blogData?.body) {
                  editor.setData(blogData.body);
                }
              }}
            />
          </article>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-lg font-semibold transition cursor-pointer ${loading ? "bg-red-400 cursor-not-allowed" : "bg-red-500 hover:bg-red-600"
            }`}
        >
          {loading ? "Updating..." : "Update Blog"}
        </button>
      </form>
    </div>

  );
};

export default UpdateBlogModal;
