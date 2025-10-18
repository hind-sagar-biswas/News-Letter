import mongoose from "mongoose";
import Subscription from "../models/subscriptionModel.js";
import User from "../models/userModel.js";
import CustomError from "../utils/customErrorClass.js";
import { deleteUserImageFromCloudinary } from "../utils/deleteFileFromCloudinary.js";
import uploadToCloudinary from "../utils/uploadToCloudinary.js";

export const getMe = async (req, res, next) => {
  try {
    // req.user is set by protect middleware
    const userId = req.user.id;

    const user = await User.findById(userId).select(
      "-password -confirmPassword"
    );
    if (!user) {
      return next(new CustomError(404, "User not found"));
    }

    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const getUserByEmail = async (req, res, next) => {
  try {
    const { email } = req.params;

    if (!email) {
      return next(new CustomError(400, "Email parameter is required"));
    }

    const user = await User.findOne({ email }).select(
      "-password -confirmPassword"
    );
    if (!user) {
      return next(new CustomError(404, "User not found"));
    }

    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const { fullName } = req.body;
    if (!fullName) {
      return next(new CustomError(400, "full name is required"));
    }

    console.log(req.user);

    let imgUrl;
    if (req.file) {
      await deleteUserImageFromCloudinary(req.user.img);
      const response = await uploadToCloudinary(
        req.file.buffer,
        "newsLater/user-profilePic"
      );
      imgUrl = response.secure_url;
    }

    const allowedFields = [
      "fullName",
      "profession",
      "occupation",
      "institute",
      "fieldOfStudy",
      "interests",
      "priorResearchExperience",
      "englishProficiency",
      "preferredDegree",
      "countrypreference",
      "internshipJobPreferences",
      "preferredFieldsofOpportunity",
      "skills",
    ];

    const filteredBody = {};
    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        filteredBody[field] = req.body[field];
      }
    });

    if (imgUrl) {
      filteredBody.img = imgUrl;
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      filteredBody,
      { new: true, runValidators: true }
    ).select("-password -confirmPassword");

    res.status(200).json({
      success: true,
      data: {
        user: updatedUser,
      },
    });
  } catch (err) {
    console.error("Update Profile Error:", err);
    next(err);
  }
};

export const updateSkills = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { skills } = req.body;

    if (!Array.isArray(skills)) {
      return res.status(400).json({ message: "Skills must be an array" });
    }

    if (skills.length > 20) {
      return res
        .status(400)
        .json({ message: "You can add up to 20 skills only" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { skills },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      success: true,
      data: {
        user: updatedUser,
      },
    });
  } catch (error) {
    console.error("Error updating skills:", error);
    next(error);
  }
};

export const updateAdminAccess = async (req, res, next) => {
  try {
    const { userId } = req.params;
    // console.log(req.params);

    if (!userId || userId == "undefined") {
      return next(new CustomError(404, "params is missing"));
    }

    // Prevent self-admin status change
    if (req.user._id.toString() === userId) {
      return next(
        new CustomError(403, "You cannot change your own admin access")
      );
    }

    const user = await User.findById(userId);

    if (!user) {
      return next(new CustomError(404, "User not found"));
    }

    // Prevent removing admin from the last admin
    if (user.isAdmin) {
      const adminCount = await User.countDocuments({ isAdmin: true });
      if (adminCount === 1) {
        return next(
          new CustomError(
            400,
            "At least one admin must exist. You cannot remove admin access from the last admin."
          )
        );
      }
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { isAdmin: !user.isAdmin },
      { new: true }
    );

    res.status(200).json({
      success: true,
      data: {
        message: `Admin access ${
          updatedUser.isAdmin ? "granted" : "removed"
        } successfully.`,
        user: updatedUser,
      },
    });
  } catch (error) {
    console.error("Error updating admin access:", error);
    next(error);
  }
};

export const getAllUser = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 15;
    const skip = (page - 1) * limit;

    const totalUsers = await User.countDocuments();
    const totalPages = Math.ceil(totalUsers / limit);

    if (page > totalPages && totalUsers > 0) {
      return next(
        new CustomError(
          404,
          `Page ${page} does not exist. Only ${totalPages} page(s) available.`
        )
      );
    }

    const users = await User.find({})
      .select("img fullName email isAdmin")
      .skip(skip)
      .limit(limit);

    if (users.length === 0 && totalUsers === 0) {
      return next(new CustomError(404, "No users found in the database."));
    }

    res.status(200).json({
      success: true,
      data: {
        currentPage: page,
        totalPages,
        totalUsers,
        users,
      },
    });
  } catch (err) {
    console.log("error happend", err);
    next(err);
  }
};

export const getAllSubscribers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 15;
    const skip = (page - 1) * limit;

    const pipeline = [
      { $match: { paid: true } },
      { $sort: { createdAt: -1 } },
      {
        $group: {
          _id: "$user",
          latestSubscription: { $first: "$$ROOT" },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "user",
        },
      },
      { $unwind: "$user" },
      {
        $lookup: {
          from: "serviceplans",
          localField: "latestSubscription.servicePlan",
          foreignField: "_id",
          as: "plan",
        },
      },
      { $unwind: "$plan" },
      {
        $project: {
          _id: "$user._id",
          img: "$user.img",
          fullName: "$user.fullName",
          email: "$user.email",
          isAdmin: "$user.isAdmin",
          planTitle: "$plan.title",
        },
      },
    ];

    const result = await Subscription.aggregate(pipeline);
    const paginated = result.slice(skip, skip + limit);

    res.status(200).json({
      success: true,
      data: {
        total: result.length,
        currentPage: page,
        totalPages: Math.ceil(result.length / limit),
        users: paginated,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllActiveSubscribers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 15;
    const skip = (page - 1) * limit;

    const today = new Date();

    const activeSubs = await Subscription.find({
      startingDate: { $lte: today },
      endingDate: { $gte: today },
      paid: true,
    })
      .populate("user", "img fullName email isAdmin")
      .populate("servicePlan", "title")
      .skip(skip)
      .limit(limit);

    const uniqueUsers = new Map();
    for (const sub of activeSubs) {
      if (!sub.user) {
        return res.status(400).json({
          success: false,
          message: "One or more subscriptions have missing user information.",
        });
      }
      const userId = sub.user._id.toString();
      if (!uniqueUsers.has(userId)) {
        uniqueUsers.set(userId, {
          _id: sub.user._id,
          img: sub.user.img,
          fullName: sub.user.fullName,
          email: sub.user.email,
          isAdmin: sub.user.isAdmin,
          planTitle: sub.servicePlan.title,
        });
      }
    }

    const subscriber = Array.from(uniqueUsers.values());

    res.status(200).json({
      success: true,
      data: {
        currentPage: page,
        users: subscriber,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getScholarTrackSubscribers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const result = await getActiveSubscribersByPlanTitle("ScholarTrack.", page);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getCareerCatchSubscribers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const result = await getActiveSubscribersByPlanTitle("CareerCatch.", page);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getOptAllAccessSubscribers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const result = await getActiveSubscribersByPlanTitle(
      "OpT. All-Access",
      page
    );
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllExpiredSubscribers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 15;
    const skip = (page - 1) * limit;

    const expiredSubs = await Subscription.find({
      status: "expired",
      paid: true,
    })
      .populate("user", "img fullName email isAdmin")
      .populate("servicePlan", "title");

    const uniqueUsers = new Map();
    for (const sub of expiredSubs) {
      if (!sub.user) {
        return res.status(400).json({
          success: false,
          message: "One or more subscriptions have missing user information.",
        });
      }
      const userId = sub.user._id.toString();
      if (!uniqueUsers.has(userId)) {
        uniqueUsers.set(userId, {
          _id: sub.user._id,
          img: sub.user.img,
          fullName: sub.user.fullName,
          email: sub.user.email,
          isAdmin: sub.user.isAdmin,
          planTitle: sub.servicePlan.title,
        });
      }
    }

    const data = Array.from(uniqueUsers.values());
    const paginated = data.slice(skip, skip + limit);

    res.status(200).json({
      success: true,
      data: {
        total: data.length,
        currentPage: page,
        totalPages: Math.ceil(data.length / limit),
        users: paginated,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getActiveSubscribersByPlanTitle = async (planTitle, page = 1) => {
  const limit = 15;
  const skip = (page - 1) * limit;

  const today = new Date();

  const activeSubs = await Subscription.find({
    startingDate: { $lte: today },
    endingDate: { $gte: today },
    paid: true,
  })
    .populate("user", "img fullName email isAdmin")
    .populate("servicePlan", "title")
    .skip(skip)
    .limit(limit);

  const filtered = activeSubs.filter(
    (s) => s.servicePlan?.title === planTitle && s.user
  );

  const uniqueUsersMap = new Map();
  for (const sub of filtered) {
    if (!uniqueUsersMap.has(sub.user._id.toString())) {
      uniqueUsersMap.set(sub.user._id.toString(), {
        _id: sub.user._id,
        img: sub.user.img,
        fullName: sub.user.fullName,
        email: sub.user.email,
        isAdmin: sub.user.isAdmin,
        planTitle: sub.servicePlan.title,
      });
    }
  }

  const allUsers = Array.from(uniqueUsersMap.values());

  return {
    currentPage: page,
    users: allUsers,
  };
};

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        status: "fail",
        message: "Invalid or missing user ID",
      });
    }

    // Find user by ID
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        status: "fail",
        message: "User not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: user,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: "error",
      message: "Server error",
    });
  }
};
