import express from "express"
import { customerLogin, customerLogout, customerProfile, customerRegistration } from "../controllers/customer.controller.js"
import { verifyCustomer } from "../middlewares/isUser.middleware.js"
import { refreshAccessToken } from "../controllers/auth.controller.js"

const router = express.Router()

router.post("/refresh-token", refreshAccessToken)

router.post("/register", customerRegistration)
router.post("/login", customerLogin)
router.get("/me", verifyCustomer, customerProfile)
router.post("/logout", verifyCustomer, customerLogout)

export default router