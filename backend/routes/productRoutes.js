import express from 'express'
import multer from 'multer'
import { createProduct, deleteProduct, getProducts, updateProduct } from '../controllers/productController.js'
import { adminOnly, protect } from '../middlewares/authMiddleware.js'
import { createProductValidator } from '../validators/productValidator.js'
import { validateRequest } from '../middlewares/validateRequest.js'


const router = express.Router()
const upload = multer({dest: "upload/"})

router.route("/")
.get(getProducts)
.post(protect, adminOnly, upload.single("image"), createProductValidator, validateRequest, createProduct)

router.route("/:id")
.put(protect,adminOnly, upload.single("image"), updateProduct)
.delete(protect, adminOnly, deleteProduct)

export default router