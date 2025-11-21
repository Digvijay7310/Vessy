import express from 'express'
import { adminLoginSchema, adminRegisterSchema } from '../validations/admin.validation.js'
import { adminLogin, adminLogout, adminRegister, getMyProfile, searchUsers, totalUsers } from '../controllers/admin.controller.js'
import { validate } from '../middlewares/validate.middleware.js'
import { verifyAdmin } from '../middlewares/verify.middleware.js'


const router = express.Router()
router.get("/", verifyAdmin, searchUsers)

router.post("/signup", validate(adminRegisterSchema), adminRegister)
router.post("/login", validate(adminLoginSchema), adminLogin)
router.post("/my-profile", verifyAdmin, getMyProfile)
router.post("/dashboard", verifyAdmin, totalUsers)
router.post("/logout", verifyAdmin, adminLogout)


export default router
