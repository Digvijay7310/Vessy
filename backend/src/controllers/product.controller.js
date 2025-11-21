import { Product } from '../models/product.model.js'
import apiError from '../utils/apiError.js';
import apiResponse from '../utils/apiResponse.js';
import asyncHandler from '../utils/asyncHandler.js'
import { uploadOnCloudinary } from '../utils/cloudinary.js';
import fs from 'fs'
import {v2 as cloudinary} from 'cloudinary'

export const createProduct = asyncHandler(async (req, res) => {
    if(req.user.role !== 'admin'){
        throw new apiError(403, "Only admin can create products")
    }
    const {name, price, description, category} = req.body;
    if(!name || !price || !description || !category) {
        throw new apiError(401, "All fields are required")
    }

    // upload images
    let imagesUrls = []
    if(req.files && req.files.length > 0) {
        imagesUrls = await Promise.all(
            req.files.map(async (file) => {
                if(!fs.existsSync(file.path)) return null;
                const upload = await uploadOnCloudinary(file.path)
                return upload?.secure_url;
            })
        );
    }

    const product = await Product.create({
        name,
        price,
        description,
        category,
        images: imagesUrls
    })

    return res.status(201).json(new apiResponse(201, product, "product created successfull"))
})

export const getAllProducts = asyncHandler(async (req, res) => {
    const {page=1, limit=20, category, search} = req.query;

    const filter = {};
    if(category) filter.category = category;

    if (search) {
        filter.$or = [
            { name: { $regex: search, $options: "i" } },
            { description: { $regex: search, $options: "i" } }
        ];
    }

    const products = await Product.find(filter)
    .sort({createdAt: -1})
    .skip((page-1) * limit)
    .limit(Number(limit))

    const total = await Product.countDocuments(filter)

    res.status(200).json(
        new apiResponse(200, {total, page, limit, products}, "Product fetched")
    )
})

export const searchProducts = asyncHandler(async(req, res) => {
    const {q} = req.query;

    if(!q){
        throw new apiError(400, 'Search query is required')
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
    const {category} = req.params

    if(!category) {
        throw new apiError(400, "Category is required")
    }

    const products = await Product.find({category}).sort({createdAt: -1});

    res.status(200).json(new apiResponse(200, products, "Category products fetched"))
})



export const getSingleProduct = asyncHandler(async(req, res) => {
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
    if(req.user.role !== 'admin'){
        throw new apiError(403, "Only admin can edit products")
    }

    const {productId} = req.params;

    const {name, price, description, category} = req.body;

    const product = await Product.findById(productId)
    if(!product) {
        throw new apiError(404, "Product not found")
    }

    if(name) product.name = name;
    if(price) product.price = price;
    if(description) product.description = description
    if(category) product.category = category

    await product.sace()

    res.status(200).json(
        new apiResponse(200, product, "Product updated")
    )
})

export const addProductImages = asyncHandler(async(req, res) => {
    if(req.user.role !== 'admin'){
        throw new apiError(403, "Only admin can add images")
    }

    const {productId} = req.params;

    const product = await Product.findById(productId)
    if(!product) {
        throw new apiError(404, "Product not fount")
    }
    let imagesUrls = []

    if(req.files && req.files.length >0){
        imagesUrls = await Promise.all(
            req.files.map(async (file) => {
                if(!fs.existsSync(file.path)) return null;
                const upload = await uploadOnCloudinary(file.path)
                return upload?.secure_url;
            })
        )
    }

    product.images.push(...imagesUrls);
    await product.save()

    res.status(200).json(new apiResponse(200, product, "Images added"))
})

export const deleteProductImages = asyncHandler(async(req, res) => {
    if(req.user.role !== 'admin'){
        throw new apiError(403, "Only admin can delete images")
    }

    const {productId, imageId} = req.params;

    const product = await Product.findById(productId)
    if(!product) {
        throw new apiError(404, "Product not found")
    }

    const imageUrl = product.images[imageId];
    const publicId = imageUrl.split("/").pop().split(".")[0]

    await cloudinary.uploader.destroy(publicId)

    product.images.splice(imageId, 1)
    await product.save()

    res.status(200).json(new apiResponse(200, product, "image deleted"))
})

export const deleteProduct = asyncHandler(async (req, res) => {
    if(req.user.role !== 'admin'){
        throw new apiError(403, "Only admin can delete products")
    }
    
    const {productId} = req.params;

    const product = await Product.findById(productId)
    if(!product){
        throw new apiError(404, "Product not found")
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
 