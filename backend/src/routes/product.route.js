import express from 'express'
import upload from "../middlewares/multer.middeware.js";
import { createProduct, deleteProduct, editProduct, findProductByCategory, getProductsByCategories, SingleProduct } from "../controllers/product.controller.js";
import { verifyAdmin } from "../middlewares/verify.middleware.js";
import { validateProduct } from '../middlewares/validate.middleware.js';
import { productSchema } from '../validations/product.validation.js';

const router = express.Router()

// Admin routes
router.post("/create", verifyAdmin, upload.array("images"), validateProduct(productSchema), createProduct)
router.put("/edit-product/:productId", verifyAdmin, editProduct)
router.delete("/delete-product/:productId", verifyAdmin, deleteProduct)

// Public routes
router.get("/", getProductsByCategories)
router.get("/:productId", SingleProduct)
router.get("/category/:category", findProductByCategory)

export default router