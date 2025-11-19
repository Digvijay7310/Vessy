import { Product } from '../models/product.model.js'
import apiError from '../utils/apiError.js';
import apiResponse from '../utils/apiResponse.js';
import asyncHandler from '../utils/asyncHandler.js'
import { uploadOnCloudinary } from '../utils/cloudinary.js';
import fs from 'fs'
import {v2 as cloudinary} from 'cloudinary'

export const createProduct = asyncHandler(async (req, res) => {
    if(req.user.role !== 'admin'){
        throw new apiError(403, "Admins only create products")
    }
    const {name, price, description, category} = req.body;
    if(!name || !price || !description || !category) {
        throw new apiError(401, "All fields are required")
    }

    if(!req.files || req.files.length === 0){
        throw new apiError(400, "At least one product image is required")
    }

    const imageUrls = await Promise.all(
        req.files.map(async file => {
            if(!fs.existsSync(file.path)) return null;
            return await uploadOnCloudinary(file.path)
        })
    )

    const product = await Product.create({
        name, 
        price, 
        category,
        description,
        images: imageUrls,
    })

    return res.status(201).json(new apiResponse(201, product, "product created successfull"))
})

export const searchProducts = asyncHandler(async(req, res) => {
    const {q} = req.query;

    if(!q){
        return res.status(400).json(new apiResponse(400, null, "Search query is required"))
    }
    const products = await Product.find({
        $or: [
            {name: {$regex: q, $options: 'i'}},
            {category: {$regex: q, $options: 'i'}}
        ]
    }).sort({createdAt: -1})

    if(products.length === 0){
        return res.status(400).json(new apiResponse(400, null, "No products found"))
    }

    res.status(200).json(
        new apiResponse(201, products, 'Product found')
    )
})

export const getProductsByCategories = asyncHandler(async(req, res) => {
    const categories = ['mens', 'womens', 'bottomwear', 'topwear'];
    const limitPerCategory = 8;

    const productsByCategory = await Promise.all(
        categories.map(async (category) => {
            const products = await Product.find({category: category})
            .limit(limitPerCategory)
            .sort({createdAt: -1})
            return {category, products}
        })
    )

    res.status(200).json(
        new apiResponse(200, productsByCategory, "Products by categories fetched")
    )
})

export const findProductByCategory = asyncHandler(async(req, res) => {
    const {category} = req.params;

    if(!category){
        throw new apiError(400, 'Category is required')
    }

    const [productsCount, products] = await Promise.all([
        Product.countDocuments({category: {$in: [category]}}),
        Product.find({category: {$in: [category]}}).limit(20).sort({createdAt: -1})
    ])
    if(productsCount === 0) {
        return res.status(404).json(
            new apiResponse(404, "No product found")
        )
    }
    res.status(200).json(
        new apiResponse(200 , {productsCount,products}, "products found")
    )
})

export const SingleProduct = asyncHandler(async(req, res) => {
    const {productId} = req.params;

    const product = await Product.findById(productId)
    if(!product) {
        throw new apiError(404, "Product not found")
    }
     res.status(200).json(
        new apiResponse(200, product, "Product found")
     )
})

export const editProduct = asyncHandler(async(req, res) => {
    const {productId}  = req.params;

    const product = await Product.findById(productId)
    if(!product){
        throw new apiError(404, "Product not found")
    }
    if(req.user.role !== 'admin'){
        throw new apiError(403, "Admin can only edit products")
    }

    const {name, price, description, category} = req.body;
    if(name) product.name = name;
    if(price) product.price = price;
    if(description) product.description = description;
    if(category){
        product.category = Array.isArray(category) ? category : [category]
    }

    await product.save()

    res.status(200).json(
        new apiResponse(201, product, "Edit successfull")
    )
})

export const deleteProduct = asyncHandler(async (req, res) => {
    const {productId} = req.params;

    const product = await Product.findById(productId)
    if(!product){
        throw new apiError(404, "Product not found")
    }
    if(req.user.role !== 'admin'){
        throw new apiError(403, "Only admin cand delete the product")
    }

    if(product.images && product.images.length > 0){
        const deletePromises = product.images.map((url) => {
            const parts = url.split("/")
            const filename = parts[parts.length -1];
            const public_id = filename.split(".")[0];
            return cloudinary.uploader.destroy(public_id)
        })
        await Promise.all(deletePromises)
    }

    await Product.findByIdAndDelete(productId)

    res.status(200).json(
        new apiResponse(200, product, "Product deleted successfull")
    )
})
 