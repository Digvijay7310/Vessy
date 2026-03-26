import { Category } from "../models/category.model.js";
import { SubCategory } from "../models/subCategory.model.js";
import apiError from "../utils/apiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import apiResponse from "../utils/apiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";


export const totalCategoryAndSubCategory = asyncHandler(async(req, res) => {
    const category = await Category.find().select("name")
    const subCategory = await SubCategory.find().select("name")

    if(!category.length){
        throw new apiError(404, "No Category found")
    }
    if(!subCategory.length){
        throw new apiError(404, "No SubCategory")
    }

    const responseData = {
        totalCategories: category.length,
        totalSubCategory: subCategory.length,
        categoryName: category.map(cat => cat.name),
        subCategoryName: subCategory.map(cat => cat.name)
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

export const createSubCategory = asyncHandler(async(req, res) => {
    const {name, categoryId} = req.body;

    if(!name || !categoryId){
        throw new apiError(400, "Name and categoryId are required");
    }

    const category = await Category.findById(categoryId);
    if(!category){
        throw new apiError(404, "Category not found");
    }

    const file = req.file?.path;
    if(!file){
        throw new apiError(400, "Image is required")
    }

    const uploadImage = await uploadOnCloudinary(file);

    const subCategory = await SubCategory.create({
        name,
        category: categoryId,
        image: uploadImage
    });

    return res.status(201).json({
        success: true,
        data: subCategory
    })
})


export const deleteSubCategory = asyncHandler(async(req, res) => {
    const {id} = req.params;

    const subCategory = await SubCategory.findById(id);
    if(!subCategory) {
        throw new apiError(404, "SubCategory not found");
    }

    await subCategory.deleteOne();

    return res.status(200).json({
        success: true,
        message: "SubCategory deleted"
    })
})