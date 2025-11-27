import { SignJWT } from "jose";

const generateToken = async (userId) => {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const token = await new SignJWT({ userId })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("15d")
    .sign(secret);
  return token;
};

export default generateToken;
