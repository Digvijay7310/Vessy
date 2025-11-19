import express from 'express'
import { validate } from '../middlewares/validate.middleware.js'
import { userLoginSchema, userRegisterSchema } from '../validations/user.validation.js'
import { userLogin, userLogout, userRegister } from '../controllers/user.controller.js'
import { verifyUser } from '../middlewares/verify.middleware.js'

const router = express.Router()

router.post("/signup", validate(userRegisterSchema), userRegister)
router.post("/login", validate(userLoginSchema), userLogin)
router.post("/logout", verifyUser, userLogout)

export default router