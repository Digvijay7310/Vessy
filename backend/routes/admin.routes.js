import express from "express";
import { adminLogin, adminLogout, adminRegistration, getMyProfile } from "../controllers/admin.controller.js";
import { isAdmin, verifyAdmin } from "../middlewares/isAdmin.middleware.js";

const router = express.Router();


router.post("/register", adminRegistration);
router.post("/login", adminLogin);
router.get("/get-profile", verifyAdmin, isAdmin, getMyProfile);
router.post("/logout", verifyAdmin, isAdmin, adminLogout);

export default router;