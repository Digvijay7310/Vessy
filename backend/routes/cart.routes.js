import express from "express"
import { getCart } from "../controllers/cart.controller.js"
import { isUser } from "../middlewares/isUser.middleware.js"
import { isAdmin } from "../middlewares/isAdmin.middleware.js"

const router = express.Router()

router.get("/", getCart)


export default router