import express from 'express'
import { getMyProfile, login, logout, register } from '../controllers/authController.js'
import { loginValidator, registerValidator } from '../validators/authValidator.js'
import { validateRequest } from '../middlewares/validateRequest.js'
import { protect } from '../middlewares/authMiddleware.js'


const router = express.Router()

router.post("/register", registerValidator, validateRequest, register)
router.post("/login", loginValidator, validateRequest, login)
router.post("/logout", logout)
router.post("/my-profile", protect, getMyProfile)

export default router;