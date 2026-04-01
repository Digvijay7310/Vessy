import { Category } from "../models/category.model.js";
import { SubCategory } from "../models/subCategory.model.js";
import apiError from "../utils/apiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import apiResponse from "../utils/apiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

export const getAllCategories = asyncHandler(async (req, res) => {
    const categories = await Category.find().select("name")
    return res.status(200).json(new apiResponse(200, categories, "fetched categories"))
})

export const totalCategoryAndSubCategory = asyncHandler(async(req, res) => {
    const category = await Category.find().select("name")
    const subCategory = await SubCategory.find().select("name image")

    if(!category.length){
        throw new apiError(404, "No Category found")
    }
    if(!subCategory.length){
        throw new apiError(404, "No SubCategory")
    }

    const responseData = {
        totalCategories: category.length,
        totalSubCategory: subCategory.length,
        categoryName: category,
        subCategoryName: subCategory
    }
    

    res.status(200).json(
        new apiResponse(200, responseData, "Fetched Success"  )
    )
})

export const createCategory = asyncHandler(async(req, res) => {
    const {name} = req.body;

    if(!name){
        throw new apiError(400, "Category name is required")
    }

    const existing = await Category.findOne({name});
    if(existing){
        throw new apiError(400, "Category already exists");
    }

    const category = await Category.create({name});

    return res.status(201).json({
        success: true,
        data: category
    })
})


export const deleteCategory = asyncHandler(async(req, res) => {
    const {id} = req.params;

    const category = await Category.findById(id);
    if(!category){
        throw new apiError(404, "Category not found");
    }

    await SubCategory.deleteMany({category: id});

    await category.deleteOne();

    return res.status(200).json({
        success: true,
        message: "Category and related subcategories deleted"
    })
})


// Sub Category
export const createSubCategory = asyncHandler(async (req, res) => {
    const { name, parentCategoryId } = req.body; // use _id now

    if (!name || !parentCategoryId) {
        throw new apiError(400, "SubCategory name and Parent Category are required");
    }

    const category = await Category.findById(parentCategoryId);
    if (!category) {
        throw new apiError(404, "Parent Category not found");
    }

    if (!req.file?.path) {
        throw new apiError(400, "Image is required");
    }

    const uploadImage = await uploadOnCloudinary(req.file.path);

    const subCategory = await SubCategory.create({
        name,
        category: category._id,
        image: uploadImage,
    });

    return res.status(201).json({
        success: true,
        data: subCategory,
    });
});

export const deleteSubCategory = asyncHandler(async(req, res) => {
    const {id} = req.params;

    const subCategory = await SubCategory.findById(id);
    if(!subCategory) {
        throw new apiError(404, "SubCategory not found");
    }

    if(subCategory.image?.public_id){
        await uploadOnCloudinary.uploader.destroy(subCategory.image.public_id);
    }


    await subCategory.deleteOne();

    return res.status(200).json({
        success: true,
        message: "SubCategory deleted"
    })
})