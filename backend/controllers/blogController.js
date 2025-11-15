import Blog from "../models/blogModel.js";
import CustomError from "../utils/customErrorClass.js";
import { deleteImageFromCloudinary } from "../utils/deleteFileFromCloudinary.js";
import uploadToCloudinary from "../utils/uploadToCloudinary.js";


// Create a new blog
export const createBlog = async (req, res, next) => {
  try {
    const { title, description, body } = req.body;

    if (!title || !description || !body) {
      return next(new CustomError(400, "title, description and body are required"));
    }

    if (!req.file) {
      return next(new CustomError(400, "Image file is required"));
    }

    // Upload image buffer to Cloudinary
    const result = await uploadToCloudinary(req.file.buffer, "newsLater/blogs-img")

    const blog = await Blog.create({
      title,
      description,
      body,
      img: result.secure_url,
    });

    res.status(201).json({
      status: "success",
      data: { blog },
    });
  } catch (err) {
    next(err);
  }
};

export const getAllBlogs = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 9;
    const skip = (page - 1) * limit;

    const total = await Blog.countDocuments();
    const blogs = await Blog.find()
      .sort({ createdAt: -1 }) // newest first
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      status: "success",
      results: blogs.length,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      data: {
        blogs,
      },
    });
  } catch (err) {
    next(err);
  }
};

// get single blog by id
export const getBlogById = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return next(new CustomError(404, "Blog not found"));
    }

    res.status(200).json({
      status: "success",
      data: {
        blog,
      },
    });
  } catch (err) {
    next(err);
  }
};

// Update blog by ID
export const updateBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return next(new CustomError(404, "Blog not found"));
    }

    const { title, description } = req.body;

    if (title !== undefined) blog.title = title;
    if (description !== undefined) blog.description = description;

    if (req.file) {
      // Upload new image to Cloudinary
      await deleteImageFromCloudinary(blog.img);
      const result = await uploadToCloudinary(req.file.buffer, "newsLater/blogs-img")
      blog.img = result.secure_url;
    }

    await blog.save();

    res.status(200).json({
      status: "success",
      data: { blog },
    });
  } catch (err) {
    next(err);
  }
};

// Delete blog by ID
export const deleteBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return next(new CustomError(404, "Blog not found"));
    }

    console.log(blog.img)

    await deleteImageFromCloudinary(blog.img);

    // Delete blog from DB
    await blog.deleteOne();

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    next(err);
  }
};
