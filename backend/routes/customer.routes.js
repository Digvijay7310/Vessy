import express from "express"
import { customerLogin, customerLogout, customerRegistration } from "../controllers/customer.controller.js"
import { isUser, verifyCustomer } from "../middlewares/isUser.middleware.js"

const router = express.Router()


router.post("/register", customerRegistration)
router.post("/login", customerLogin)
router.post("/logout", isUser, verifyCustomer, customerLogout)

export default router