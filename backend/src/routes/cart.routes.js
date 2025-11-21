import { Router } from "express";
import { verifyUser } from "../middlewares/verify.middleware.js";
import { addToCart, clearCart, decreaseQuantity, getMyCart, increaseQuantity, removeFromCart } from "../controllers/cart.controller.js";

const router = Router()

router.get("/", verifyUser, getMyCart)
router.post("/add", verifyUser, addToCart)
router.delete("/remove/:productId", verifyUser, removeFromCart)
router.put("/increase/:productId", verifyUser, increaseQuantity)
router.put("/decrease/:productId", verifyUser, decreaseQuantity)
router.delete("/clear", verifyUser, clearCart)

export default router