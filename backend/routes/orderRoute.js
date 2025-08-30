import express from "express";
import authMiddleware from "../middlewares/auth.js";
import {
  placeOrder,
  userOrders,
  listOrders,
  updateStatus,
} from "../controllers/orderController.js";

const orderRouter = express.Router();

orderRouter.post("/place", authMiddleware, placeOrder);
orderRouter.post("/user-orders", authMiddleware, userOrders);
orderRouter.get("/list", listOrders);
orderRouter.patch("/update-status", updateStatus);

export default orderRouter;
