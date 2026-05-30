import express from "express";
import { verifyCustomer } from "../middlewares/isUser.middleware.js";

import {
    addAddress,
    checkoutOrder,
    getAddresses,
    getAllOrders,
    getMyOrders,
    getOrderById,
    previewCheckout,
    setDefaultAddress
} from "../controllers/order.controller.js";
import { isAdmin, verifyAdmin } from "../middlewares/isAdmin.middleware.js";

const router = express.Router();


// ========================
// CHECKOUT
// ========================
router.get("/preview-checkout", verifyCustomer, previewCheckout);
router.post("/checkout", verifyCustomer, checkoutOrder);


// ========================
// ORDERS (CUSTOMER)
// ========================
router.get("/my-orders", verifyCustomer, getMyOrders);
router.get("/order/:orderId", verifyCustomer, getOrderById);


// ========================
// ADDRESSES
// ========================
router.get("/addresses", verifyCustomer, getAddresses);
router.post("/addresses", verifyCustomer, addAddress);
router.patch("/addresses/:id", verifyCustomer, setDefaultAddress);


router.get("/orders", verifyAdmin, isAdmin, getAllOrders)

export default router;