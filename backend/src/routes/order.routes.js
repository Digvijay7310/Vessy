import { Router } from "express";
import { verifyUser } from "../middlewares/verify.middleware";
import { cancelOrder, createOrder, getMyOrders, getSingleOrder } from "../controllers/order.controller";

const router = Router()

router.post("/", verifyUser, createOrder)
router.get("/", verifyUser, getMyOrders)
router.get("/:orderId", verifyUser, getSingleOrder)
router.put("/cancel/:orderId", verifyUser, cancelOrder)

export default router