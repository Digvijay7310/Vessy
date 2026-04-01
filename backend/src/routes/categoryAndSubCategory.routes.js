import express from 'express'
import { verifyAdmin } from '../middlewares/verify.middleware.js'
import upload from '../middlewares/multer.middeware.js';
import { createCategory, createSubCategory, deleteCategory, deleteSubCategory, getAllCategories, totalCategoryAndSubCategory } from '../controllers/categoryAndSubCategory.controller.js';




const router = express.Router()

router.get("/all", verifyAdmin, getAllCategories)
router.get("/all-category-and-sub-category", verifyAdmin, totalCategoryAndSubCategory)
router.post('/category', verifyAdmin, createCategory)
router.delete("/category/:id", verifyAdmin, deleteCategory)

router.post("/subcategory", verifyAdmin, 
    upload.single("image"), createSubCategory
);
router.delete("/subcategory/:id", verifyAdmin, deleteSubCategory)

export default router