import express from "express";
import {
    createCategory,
    deleteCategory,
    createSubCategory,
    deleteSubCategory,
    allCategory,
    allSubCategory,
    categoryWithSubCategory,
    productsWithSubCategories,
} from "../controllers/category.controller.js";
import {isAdmin, verifyAdmin} from '../middlewares/isAdmin.middleware.js'
import { upload } from "../middlewares/multer.middleware.js";

const router = express.Router();


router.get('/all-category', verifyAdmin, isAdmin, allCategory)
router.post("/", verifyAdmin, isAdmin, createCategory);
router.delete("/:id", verifyAdmin, isAdmin, deleteCategory);

router.get('/all-sub-category', verifyAdmin, isAdmin, allSubCategory)
router.post("/sub", verifyAdmin, isAdmin, upload.single("image"), createSubCategory);
router.delete("/sub/:id", verifyAdmin, isAdmin, deleteSubCategory);

router.get("/category-with-sub-category", categoryWithSubCategory)
router.get("/sub-category/:id", productsWithSubCategories)

export default router;