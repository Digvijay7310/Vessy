import express from "express"
import { addToCart, decreaseQty, getCart, removeFromCart } from "../controllers/cart.controller.js"
import { verifyCustomer } from "../middlewares/isUser.middleware.js"
import { isAdmin } from "../middlewares/isAdmin.middleware.js"

const router = express.Router()

router.get("/", verifyCustomer, getCart)
router.post("/add-cart", verifyCustomer, addToCart)
router.post("/decrease-cart", verifyCustomer, decreaseQty)
router.post("/remove-cart", verifyCustomer, removeFromCart)



export default router