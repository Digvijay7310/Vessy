import express from "express"
import { verifyCustomer } from "../middlewares/isUser.middleware.js"
import { checkoutOrder, getAllOrders, getMyOrders, getOrderById, previewCheckout } from "../controllers/order.controller.js"
import { isAdmin, verifyAdmin } from "../middlewares/isAdmin.middleware.js"


const router = express.Router()

// Customers
router.get("/preview-checkout", verifyCustomer, previewCheckout)
router.post("/checkout", verifyCustomer, checkoutOrder)
router.get("/my-orders", verifyCustomer, getMyOrders)
router.get("/:orderId", verifyCustomer, getOrderById)


// Admin
router.get("/", verifyAdmin, isAdmin, getAllOrders)

export default router