import express from "express";
import { adminLogin, adminLogout, adminRegistration, getAllData, getAllOrderStats, getMyProfile, getOrdersByStatus, updateOrderStatus } from "../controllers/admin.controller.js";
import { isAdmin, verifyAdmin } from "../middlewares/isAdmin.middleware.js";

const router = express.Router();


router.post("/register", adminRegistration);
router.post("/login", adminLogin);
router.get("/get-profile", verifyAdmin, isAdmin, getMyProfile);
router.post("/logout", verifyAdmin, isAdmin, adminLogout);

router.get("/all-data", verifyAdmin, getAllData)
router.get("/all-orders", verifyAdmin, getAllOrderStats)
router.get("/:status", verifyAdmin, getOrdersByStatus)


router.put("/:orderId/status", verifyAdmin, updateOrderStatus)

export default router;