import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import aiRoute from "./routes/aiRoute.js";
import "dotenv/config.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:5173", // frontend local
      "http://localhost:5174", // admin local
      "https://chefai-7d20.onrender.com", // frontend prod
      "https://chefai-dashboard.onrender.com", // admin prod
    ],
    credentials: true,
  })
);

// Serve static files (for uploaded images)
app.use("/images", express.static("uploads"));

// DB Connection
connectDB();
// Api Endpoints
app.use("/api/food", foodRouter);
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.use("/api/ai", aiRoute);

// Connect host
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
