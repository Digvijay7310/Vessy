import express from "express";
import {
  adminLoginSchema,
  adminRegisterSchema,
} from "../validations/admin.validation.js";
import {
  adminLogin,
  adminLogout,
  adminRegister,
  adminStats,
  changeAdminPassword,
  deleteUser,
  getAllUsers,
  getMyProfile,
  getSingleUser,
  refreshAccessToken,
  searchUsers,
  toggleBlockUser,
  updateAdminProfile,
} from "../controllers/admin.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import { verifyAdmin } from "../middlewares/verify.middleware.js";

const router = express.Router();
router.get("/", verifyAdmin, searchUsers);

router.post("/register", validate(adminRegisterSchema), adminRegister);
router.post("/login", validate(adminLoginSchema), adminLogin);
router.post("/logout", verifyAdmin, adminLogout);
router.get("/refresh-token", refreshAccessToken);

// Profile
router.get("/me", verifyAdmin, getMyProfile);
router.put("/me/update", verifyAdmin, updateAdminProfile);
router.put("/me/change-password", verifyAdmin, changeAdminPassword);

// User management
router.get("/users", verifyAdmin, getAllUsers);
router.get("/users/search", verifyAdmin, searchUsers);
router.get("/users/:userId", verifyAdmin, getSingleUser);
router.delete("/users/:userId", verifyAdmin, deleteUser);
router.put("/users/block/:userId", verifyAdmin, toggleBlockUser);

// Dashboard
router.get("/stats", verifyAdmin, adminStats);

export default router;
