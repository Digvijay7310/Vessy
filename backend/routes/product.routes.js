import express from "express"
import { isAdmin, verifyAdmin } from "../middlewares/isAdmin.middleware.js"
import { createProduct, deleteProduct, updateProduct } from "../controllers/product.controller.js"
import { upload } from "../middlewares/multer.middleware.js"

const router = express.Router()

router.post("/create-product", verifyAdmin, isAdmin, upload.single("image"), createProduct)
router.put("/product/:id", verifyAdmin, isAdmin, upload.single("image"), updateProduct);
router.delete("/product/:id", verifyAdmin, isAdmin, deleteProduct)

export default router