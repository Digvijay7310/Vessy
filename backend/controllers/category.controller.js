import { Category } from "../models/category.model.js";
import apiError from "../utils/apiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import apiResponse from '../utils/apiResponse.js'
import { SubCategory } from "../models/category.model.js";
import { Product } from "../models/product.model.js";
import { v2 as cloudinary } from "cloudinary";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import mongoose from "mongoose";


export const allCategory = asyncHandler(async(req, res) => {
    const category = await Category.find()
    res.json(category)
})

export const allSubCategory = asyncHandler(async(req, res) => {
    const subcategory = await SubCategory.find().populate("parentCategory", "id name")
    res.json(subcategory)
})

export const createCategory = asyncHandler(async (req, res) => {
    const { name } = req.body;

    const exist = await Category.findOne({ name });

    if (exist) {
        throw new apiError(400, "Category exists");
    }

    const category = await Category.create({
        name,
        createdBy: req.user._id,
    });

    res.json(category);
});


export const deleteCategory = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const category = await Category.findById(id);
    if (!category) throw new apiError(404, "Not found");

    const subCategories = await SubCategory.find({ parentCategory: id });

    const subIds = subCategories.map(sub => sub._id);

    await Product.deleteMany({ subCategory: { $in: subIds } });

    await SubCategory.deleteMany({ parentCategory: id });

    await Category.findByIdAndDelete(id);

    res.json({ message: "Deleted successfully" });
});

// Sub category
export const createSubCategory = asyncHandler(async (req, res) => {
    const { name, parentCategory } = req.body;

    // Validate category ID
    if (!mongoose.Types.ObjectId.isValid(parentCategory)) {
        throw new apiError(400, "Invalid category ID");
    }

    const category = await Category.findById(parentCategory);
    if (!category) throw new apiError(404, "Category not found");

    if (!req.file) throw new apiError(400, "Image is required");

    // Optional: check MIME type
    if (!req.file.mimetype.startsWith("image/")) {
        throw new apiError(400, "Only image files are allowed");
    }

    const filePath = req.file.path;

    // Upload image
    const uploaded = await uploadOnCloudinary(filePath);

if (!uploaded?.secure_url) {
    throw new apiError(500, "Image upload failed");
}
    // Create subcategory
    const subCategory = await SubCategory.create({
        name,
        image: uploaded.secure_url,
        public_id: uploaded.public_id,
        parentCategory: category._id,
        createdBy: req.user._id,
    });

    res.json(subCategory);
});


export const deleteSubCategory = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const sub = await SubCategory.findById(id);

    if (!sub) throw new apiError(404, "Subcategory not found");

    // delete image from cloudinary
    if(sub.public_id){
        try {
            await cloudinary.uploader.destroy(sub.public_id);
        } catch (error) {
            console.log("Cloudinary delete error: ", error)
            throw new apiError(500, "Failed to delete image form cloudinary")
        }
    }

    // Delete all product 
    await Product.deleteMany({ subCategory: id });

    // Delete sub category
    await sub.deleteOne();

    res.json({ message: "Deleted successfully" });
});