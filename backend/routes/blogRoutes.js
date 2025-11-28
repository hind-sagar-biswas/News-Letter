import express from "express";
import {
  createBlog,
  updateBlog,
  deleteBlog,
  getAllBlogs,
  getBlogById,
  getLatestBlogsExcludingId,
} from "../controllers/blogController.js";
import { upload } from "../middleware/fileUpload.js";
import adminProtect from "../middleware/adminProtect.js";

const router = express.Router();

router.get("/", getAllBlogs);     // Create blog
router.get("/:id", getBlogById);         // Get blog by ID
router.get("/:id/latest", getLatestBlogsExcludingId); // Get latest blogs excluding specific ID

router.post("/", adminProtect, upload.single("img"), createBlog);
router.put("/:id", adminProtect, upload.single("img"), updateBlog);      // Update blog by ID
router.delete("/:id", adminProtect, deleteBlog);   // Delete blog by ID

export default router;
