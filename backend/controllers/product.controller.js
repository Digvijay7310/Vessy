import asyncHandler from '../utils/asyncHandler.js'
import apiResponse from '../utils/apiError.js'
import apiError from '../utils/apiError.js';
import { Product } from '../models/product.model.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';
import mongoose from 'mongoose';
import { Category, SubCategory } from '../models/category.model.js';
import { v2 as cloudinary } from "cloudinary";


export const createProduct = asyncHandler(async (req, res) => {
    const { name, price, description, category, subCategory } = req.body;

    // Validate ObjectIds
    if (!mongoose.Types.ObjectId.isValid(category)) {
        throw new apiError(400, "Invalid category ID");
    }

    if (!mongoose.Types.ObjectId.isValid(subCategory)) {
        throw new apiError(400, "Invalid subCategory ID");
    }

    // Check existence
    const categoryExists = await Category.findById(category);
    if (!categoryExists) throw new apiError(404, "Category not found");

    const subCategoryExists = await SubCategory.findById(subCategory);
    if (!subCategoryExists) throw new apiError(404, "SubCategory not found");

    // Ensure subCategory belongs to category
    if (subCategoryExists.parentCategory.toString() !== category) {
        throw new apiError(400, "SubCategory does not belong to this category");
    }

    // Image validation
    if (!req.file) throw new apiError(400, "Image is required");

    if (!req.file.mimetype.startsWith("image/")) {
        throw new apiError(400, "Only image files are allowed");
    }

    // Check duplicate product
    const exist = await Product.findOne({ name });
    if (exist) throw new apiError(400, "Product already exists");

    // Upload image
    const filePath = req.file.path;
    const upload = await uploadOnCloudinary(filePath);

    if (!upload?.secure_url) {
        throw new apiError(500, "Image upload failed");
    }

    // Create product
    const product = await Product.create({
        name,
        price,
        description,
        image: [upload.secure_url], // ✅ FIXED
        category,
        subCategory,
        createdBy: req.user._id, // ✅ FIXED
    });

    res.status(201).json(
        new apiResponse(201, product, "Product created")
    );
});


export const updateProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new apiError(400, "Invalid product ID");
    }

    const product = await Product.findById(id);
    if (!product) throw new apiError(404, "Product not found");

    const updateData = {};
    const { name, price, description, category, subCategory } = req.body;

    if (name !== undefined) updateData.name = name;
    if (price !== undefined) updateData.price = price;
    if (description !== undefined) updateData.description = description;
    if (category !== undefined) updateData.category = category;
    if (subCategory !== undefined) updateData.subCategory = subCategory;

    // ✅ If new image uploaded
    if (req.file) {
        // Delete old image from Cloudinary
        if (product.image?.length > 0) {
            const oldPublicId = product.image[0].public_id;

            if (oldPublicId) {
                await cloudinary.uploader.destroy(oldPublicId);
            }
        }

        // Upload new image
        const upload = await uploadOnCloudinary(req.file.path);

        if (!upload?.secure_url) {
            throw new apiError(500, "Image upload failed");
        }

        updateData.image = [{
            url: upload.secure_url,
            public_id: upload.public_id
        }];
    }

    const updatedProduct = await Product.findByIdAndUpdate(
        id,
        updateData,
        { new: true }
    );

    res.json(updatedProduct);
});


export const deleteProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new apiError(400, "Invalid product ID");
    }

    const product = await Product.findById(id);
    if (!product) throw new apiError(404, "Product not found");

    // ✅ Delete image from Cloudinary
    if (product.image?.length > 0) {
        const publicId = product.image[0].public_id;

        if (publicId) {
            await cloudinary.uploader.destroy(publicId);
        }
    }

    await product.deleteOne();

    res.json({ message: "Product and image deleted successfully" });
});