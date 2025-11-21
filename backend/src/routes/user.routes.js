import express from "express";
import { validate } from "../middlewares/validate.middleware.js";
import {
  userLoginSchema,
  userRegisterSchema,
} from "../validations/user.validation.js";
import {
    addAddress,
  changeUserPassword,
  deleteAddress,
  deleteMyAccount,
  getMyAddresses,
  getMyProfile,
  refreshUserAccessToken,
  updateUserProfile,
  userLogin,
  userLogout,
  userRegister,
} from "../controllers/user.controller.js";
import { verifyUser } from "../middlewares/verify.middleware.js";

const router = express.Router();

router.post("/register", validate(userRegisterSchema), userRegister);
router.post("/login", validate(userLoginSchema), userLogin);
router.post("/logout", verifyUser, userLogout);
router.get("/refresh-token", refreshUserAccessToken);

// Profile
router.get("/me", verifyUser, getMyProfile);
router.put("/me", verifyUser, updateUserProfile);
router.put("/me/password", verifyUser, changeUserPassword);
router.delete("/me", verifyUser, deleteMyAccount);

// Address
router.post("/me/address", verifyUser, addAddress)
router.get("/me/address", verifyUser, getMyAddresses)
router.delete("/me/address/:index", verifyUser, deleteAddress)

export default router;
