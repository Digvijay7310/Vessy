import Product from "../models/productModel.js";
import asyncHandler from '../utils/asyncHandler.js'
import cloudinary from "../config/cloudinary.js";
import fs from 'fs'

export const createProduct = asyncHandler(async (req, res) => {
    const {name, description, price, category} = req.body;

    let imageData = {};
    if(req.file){
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: 'ecommerce/products',
            format: 'webp',
            transformation: [{width: 500, quality: 'auto'}],
        });
        imageData = {public_id: result.public_id, url: res.secure_url}

        // Delte local file
        fs.unlink(req.file.path, (err) => {
            if(err) console.error("Failed to delete local file: ", err)
        })
    }

    const product = await Product.create({name, description, price, category, image: imageData})
    res.status(201).json(product)
})

export const getProducts = asyncHandler(async(req, res) => {
    const products = await Product.find().sort({createdAt: -1})
    res.json(products)
})

export const updateProduct = asyncHandler(async(req, res) => {
    const product = await Product.findById(req.params.id);
    if(!product) return res.status(404).json({message: "Product not found"})

    if(req.file){
        await cloudinary.uploader.destroy(product.image.public_id);
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: 'ecommerce/products',
            format: 'webp',
            transformation: [{width: 500, quality: 'auto'}],
        })
        product.image = {public_id: result.public_id, url: result.secure_url}
    }

    product.name = req.body.name || product.name;
    product.description = req.body.description || product.description;
    product.price = req.body.price || product.price;
    product.category = req.body.category || product.category;

    await product.save();
    res.json(product)
})

export const deleteProduct = asyncHandler(async(req, res) => {
    const product = await Product.findById(req.params.id)
    if(!product) return res.status(404).json({message: "Product not found"})

        await cloudinary.uploader.destroy(product.image.public_id)
        await product.deleteOne();
        res.json({message: "Product deleted successfully"})
})