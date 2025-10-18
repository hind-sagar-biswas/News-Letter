import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import {
  getAllActiveSubscribers,
  getAllUser,
  getAllExpiredSubscribers,
  getMe,
  getAllSubscribers,
  getUserByEmail,
  updateAdminAccess,
  updateProfile,
  updateSkills,
  getScholarTrackSubscribers,
  getCareerCatchSubscribers,
  getOptAllAccessSubscribers,
  getUserById,
} from "../controllers/userController.js";
import { upload } from "../middleware/fileUpload.js";
import adminProtect from "../middleware/adminProtect.js";

const router = express.Router();

router.get("/", protectRoute, getMe);
router.get("/:email", protectRoute, getUserByEmail);
router.get("/all/all", adminProtect, getAllUser);
router.get("/subscribed/all", adminProtect, getAllSubscribers);
router.get("/subscribed/active", adminProtect, getAllActiveSubscribers);
router.get(
  "/subscribed/active/scholar-track.",
  adminProtect,
  getScholarTrackSubscribers
);
router.get(
  "/subscribed/active/career-catch",
  adminProtect,
  getCareerCatchSubscribers
);
router.get(
  "/subscribed/active/all-access",
  adminProtect,
  getOptAllAccessSubscribers
);
router.get("/subscribed/expired", adminProtect, getAllExpiredSubscribers);
router.patch("/", protectRoute, upload.single("img"), updateProfile);
router.put("/update-skills", protectRoute, updateSkills);
router.put("/admin-access/:userId", adminProtect, updateAdminAccess);

router.get("/user-all-data/:id", adminProtect, getUserById);

export default router;
