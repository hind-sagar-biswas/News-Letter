"use client";

import {
  deleteBlog,
  fetchAllBlogs,
  updateBlog,
} from "@/redux/slices/blogSlice";
import { openModal } from "@/redux/slices/modalSlice";
import Image from "next/image";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

// const dummyBlogs = [
//   {
//     id: 1,
//     title: "Understanding React Server Components",
//     description:
//       "React Server Components let you build modern user interfaces while keeping performance in mind...",
//     image: "/blog1.jpg",
//   },
//   {
//     id: 2,
//     title: "Mastering Tailwind CSS",
//     description:
//       "Tailwind CSS provides utility-first classes that enable fast and consistent styling across your web apps...",
//     image: "/blog2.jpg",
//   },
//   // Add more dummy blogs here
// ];

const BlogList = () => {
  const { blogs } = useSelector((state) => state.blogData);
  const dispatch = useDispatch();

  const handleUpdate = async (blog) => {
    dispatch(openModal({ modalName: "updateBlog", data: blog }));
  };

  const handleDelete = async (id) => {
    dispatch(openModal({ modalName: "deleteBlog", data: id }));
  };

  useEffect(() => {
    const getBlogs = async () => {
      try {
        await dispatch(fetchAllBlogs()).unwrap();
      } catch (err) {
        toast.error(err || "Fetch blogs failed");
      }
    };
    getBlogs();
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-950 rounded-2xl text-white p-6">
      <h2 className="text-2xl font-bold mb-6 text-red-400">All Blogs</h2>

      <div className="space-y-6">
        {blogs?.map((blog) => (
          <div
            key={blog?._id}
            className="bg-gray-900 border border-white/10 p-4 rounded-xl flex flex-col md:flex-row gap-4 items-start"
          >
            {/* Image */}
            <div className="relative w-full md:w-48 h-32">
              <Image
                src={blog?.img || "/images/default-blog.jpg"}
                alt={blog?.title}
                fill
                className="object-cover rounded-lg border border-white/10"
              />
            </div>

            {/* Content */}
            <div className="flex-1">
              <h3 className="text-xl font-semibold mb-2">{blog?.title}</h3>
              <p className="text-sm text-gray-300 line-clamp-3">
                {blog?.description}
              </p>
            </div>

            {/* Actions */}
            <div className="flex gap-3 mt-4  md:flex-col ">
              <button
                onClick={() => handleUpdate(blog)}
                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm font-medium cursor-pointer"
              >
                Update
              </button>
              <button
                onClick={() => handleDelete(blog._id)}
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-sm font-medium cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogList;
