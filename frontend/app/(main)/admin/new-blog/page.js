"use client";
import { createBlog } from "@/redux/slices/blogSlice";
import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import CSEditor from "@/components/CSEditor";

const BlogForm = () => {
  const editorRef = useRef(null);

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

    // Get CKEditor data
    const content = editorRef.current?.getData() || "";
    console.log(content);

    if (!content.trim()) {
      toast.error("Body cannot be empty.");
      return;
    }

    if (!image) {
      toast.error("Please upload an image.");
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
    formData.append("body", content);
    formData.append("img", image);

    try {
      await dispatch(createBlog(formData)).unwrap();
      toast.success("New Blog created!");

      setImage(null);
      setPreview(null);
      setTitle("");
      setDescription("");
      editorRef.current?.setData(""); // Reset CKEditor
    } catch (err) {
      toast.error(err || "Blog creation failed.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 rounded-2xl text-white flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 p-8 rounded-2xl shadow-lg max-w-7xl w-full space-y-6 border border-white/10"
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
            className="w-full bg-gray-800 text-sm p-2 rounded-lg border border-white/20 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-red-500 file:text-white hover:file:bg-red-600 cursor-pointer"
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
        <div>
          <label className="block mb-2 text-sm font-semibold">Title</label>
          <input
            type="text"
            value={title}
            required
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter blog title"
            className="w-full p-3 rounded-lg bg-gray-800 border border-white/20 placeholder-gray-400"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block mb-2 text-sm font-semibold">Description</label>
          <textarea
            value={description}
            required
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter blog description"
            className="w-full p-3 rounded-lg bg-gray-800 border border-white/20 placeholder-gray-400"
          />
        </div>

        {/* CKEditor */}
        <div>
          <label className="block mb-2 text-sm font-semibold">Body</label>
          <article className="prose lg:prose-xl !max-w-none prose-invert">
            <CSEditor
              onReady={(editor) => {
                editorRef.current = editor;
              }}
            />
          </article>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-lg font-semibold transition ${loading
            ? "bg-red-400 cursor-not-allowed"
            : "bg-red-500 hover:bg-red-600"
            }`}
        >
          {loading ? "Submitting..." : "Submit Blog"}
        </button>
      </form>
    </div>
  );
};

export default BlogForm;

