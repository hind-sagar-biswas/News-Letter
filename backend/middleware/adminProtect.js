import { jwtVerify } from "jose";
import User from "../models/userModel.js";
import CustomError from "../utils/customErrorClass.js";

const adminProtect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized, no token'
      });
    }

    const token = authHeader.split(' ')[1];

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);

    if (!payload) {
      return next(new CustomError(401, "unothorized , invalid token"));
    }

    const user = await User.findById(payload.userId);

    if (!user) {
      return next(new CustomError(404, "User not found"));
    }

    if (!user.isVerified) {
      return next(
        new CustomError(403, "Account not verified. Please verify your email.")
      );
    }

    if (!user.isAdmin) {
      return next(new CustomError(403, "Access denied. Admins only."));
    }

    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};

export default adminProtect;
