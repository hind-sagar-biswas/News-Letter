import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors"
import connectToMongoDB from "./db/mongoDbConnection.js";
import CustomError from "./utils/customErrorClass.js";
import globalErrorHandler from "./controllers/errorController.js";
import servicePlanRoutes from "./routes/servicePlanRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import subscriptionRoutes from "./routes/subscriptionRoutes.js";
import brevoRoute from "./routes/brevoRoutes.js";


dotenv.config();

import "./cron/subscriptionCron.js";

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL, 
  credentials: true                
}));

console.log("frontend url is ",process.env.FRONTEND_URL)


app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());


app.use("/api/service-plans", servicePlanRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/blog", blogRoutes);
app.use("/api/review", reviewRoutes);
app.use("/api/subscription", subscriptionRoutes);
app.use("/api/brevo", brevoRoute);


app.use((req, res, next) => {
  const err = new CustomError(
    404,
    `Cant find the url ${req.originalUrl} on the server`
  );
  next(err);
});

app.use(globalErrorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  connectToMongoDB();
  console.log("server started");
  // console.log(`server started at http://localhost:${PORT}`);
}); 