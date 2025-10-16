import jwt from "jsonwebtoken";

const generateTokenAndSetToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });

  console.log("NODE_ENV:", process.env.NODE_ENV);
  console.log("Cookie options:", {
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
  });

  res.cookie("jwt", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // only true in production
    sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax", // None only in prod
  });
};

export default generateTokenAndSetToken;
