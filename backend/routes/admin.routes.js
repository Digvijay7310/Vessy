import express from "express";
import { adminLogin, adminLogout, adminRegistration, AllOrder, getAllData, getMyProfile } from "../controllers/admin.controller.js";
import { isAdmin, verifyAdmin } from "../middlewares/isAdmin.middleware.js";

const router = express.Router();


router.post("/register", adminRegistration);
router.post("/login", adminLogin);
router.get("/get-profile", verifyAdmin, isAdmin, getMyProfile);
router.post("/logout", verifyAdmin, isAdmin, adminLogout);

router.get("/all-data", verifyAdmin, getAllData)
router.get("/all-orders", verifyAdmin, AllOrder)

export default router;