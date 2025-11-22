import express from 'express'
import upload from "../middlewares/multer.middeware.js";
import { addProductImages, createProduct, deleteProduct, deleteProductImages, editProduct, getAllProducts, getProductsByCategories, getSingleProduct, searchProducts } from "../controllers/product.controller.js";
import { verifyAdmin, verifyUser } from "../middlewares/verify.middleware.js";
import { validateProduct } from '../middlewares/validate.middleware.js';
import { productSchema } from '../validations/product.validation.js';

const router = express.Router()

// Product routes
router.post("/create", verifyAdmin, upload.array("images"), validateProduct(productSchema), createProduct)

router.get("/", getAllProducts)
router.get("/search", searchProducts)
router.get("/category/:category", getProductsByCategories)
router.get("/:productId", getSingleProduct)

// Admin actions
router.put("/:productId", verifyAdmin, editProduct)
router.put("/:productId/images", verifyAdmin, upload.array("images", 5), addProductImages)
router.delete("/:productId/images/:imageId", verifyAdmin, deleteProductImages)
router.delete("/:productId", verifyAdmin, deleteProduct)


export default router