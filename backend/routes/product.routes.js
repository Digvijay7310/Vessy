import express from "express"
import { isAdmin, verifyAdmin } from "../middlewares/isAdmin.middleware.js"
import {verifyCustomer} from '../middlewares/isUser.middleware.js'
import { createProduct, deleteProduct, getProductById, getProducts, getProductsByCategoryName, getWishList, searchProducts, updateProduct, wishlistToggle } from "../controllers/product.controller.js"
import { upload } from "../middlewares/multer.middleware.js"

const router = express.Router()

router.get('/', searchProducts)
router.get("/get-products", getProducts)
router.get("/product/:id", getProductById)
router.get("/by-category", verifyAdmin, getProductsByCategoryName)

router.get("/wishlist", verifyCustomer, getWishList)
router.post("/wishlist/toggle", verifyCustomer, wishlistToggle)

router.post("/create-product", verifyAdmin, upload.single("image"), createProduct)
router.put("/product/:id", verifyAdmin, upload.single("image"), updateProduct);
router.delete("/product/:id", verifyAdmin, deleteProduct)



export default router