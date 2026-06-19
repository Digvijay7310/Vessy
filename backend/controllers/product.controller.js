import asyncHandler from '../utils/asyncHandler.js'
import apiResponse from '../utils/apiResponse.js'
import apiError from '../utils/apiError.js';
import { Product } from '../models/product.model.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';
import mongoose from 'mongoose';
import { Category, SubCategory } from '../models/category.model.js';
import { v2 as cloudinary } from "cloudinary";
import { Customer } from '../models/customer.model.js';


export const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find().sort({ createdAt: -1 });

    const totalProducts = await Product.countDocuments()

    if (products.length === 0) {
        throw new apiError(404, "Products not found");
    }

    res.status(200).json({
        products,
        totalProducts
    });
});

export const searchProducts = asyncHandler(async (req, res) => {
    let { search = "", page = 1, limit = 10 } = req.query;

    page = parseInt(page);
    limit = parseInt(limit);
    const skip = (page - 1) * limit;

    const matchStage = search.trim()
        ? {
              $or: [
                  { name: { $regex: search, $options: "i" } },
                  { description: { $regex: search, $options: "i" } }
              ]
          }
        : {};

    // COUNT total products FIRST (important fix)
    const totalProducts = await Product.countDocuments(matchStage);

    const products = await Product.aggregate([
        {
            $lookup: {
                from: "categories",
                localField: "category",
                foreignField: "_id",
                as: "categoryData"
            }
        },
        {
            $lookup: {
                from: "subcategories",
                localField: "subCategory",
                foreignField: "_id",
                as: "subCategoryData"
            }
        },

        // safer than unwind (prevents missing data loss)
        {
            $addFields: {
                categoryData: { $arrayElemAt: ["$categoryData", 0] },
                subCategoryData: { $arrayElemAt: ["$subCategoryData", 0] }
            }
        },

        ...(search.trim() ? [{ $match: matchStage }] : []),

        { $sort: { createdAt: -1 } },
        { $skip: skip },
        { $limit: limit }
    ]);

    if (!products.length) {
        return res.status(200).json({
            totalProducts: 0,
            currentPage: page,
            totalPages: 0,
            products: []
        });
    }

    res.status(200).json({
        totalProducts,
        currentPage: page,
        totalPages: Math.ceil(totalProducts / limit),
        products
    });
});

export const searchSuggestions = asyncHandler(async (req, res) => {
  const { q = "" } = req.query;

  if (!q.trim()) {
    return res.json({
      products: [],
      categories: [],
      subCategories: [],
    });
  }

  const regex = new RegExp(`^${q}`, "i");

  const [products, categories, subCategories] = await Promise.all([
    Product.find(
      {
        name: regex,
      },
      {
        name: 1,
        image: 1,
      }
    ).limit(5),

    Category.find(
      {
        name: regex,
      },
      {
        name: 1,
      }
    ).limit(5),

    SubCategory.find(
      {
        name: regex,
      },
      {
        name: 1,
      }
    ).limit(5),
  ]);

  res.status(200).json({
    products,
    categories,
    subCategories,
  });
});

export const wishlistToggle = asyncHandler(async (req, res) => {
  const customer = await Customer.findById(req.user.id);

  if (!customer) {
    throw new apiError(404, "Customer not found");
  }

  const productId = req.params.productId;

  const exists = customer.wishlist.some(
    (id) => id.toString() === productId
  );

  if (exists) {
    customer.wishlist = customer.wishlist.filter(
      (id) => id.toString() !== productId
    );
  } else {
    customer.wishlist.push(productId);
  }

  await customer.save();

  return res.status(200).json(
    new apiResponse(
      200,
      { wishlist: customer.wishlist },
      "Wishlist updated successfully"
    )
  );
});

export const getWishList = asyncHandler(async (req, res) => {
  const customer = await Customer.findById(req.user.id)
    .populate("wishlist");

  if (!customer) {
    throw new apiError(404, "Customer not found");
  }

  return res.status(200).json(
    new apiResponse(
      200,
      { wishlist: customer.wishlist },
      "Wishlist fetched successfully"
    )
  );
});

export const getProductById = asyncHandler(async (req, res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        throw new apiError(404, "Invalid Id")
    }

    const product = await Product.findById(id)
    const otherProducts = await Product.find({category: product.category}).limit(10)
    const otherCategoryProducts = await Product.find({category: {$ne: product.category}}).limit(10)
    
    if(!product){
        throw new apiError(404, "Product not found") 
    }   
    res.status(200).json({
        product,
        otherProducts,
        otherCategoryProducts
    })
})

export const getProductsByCategoryName = asyncHandler(async (req, res) => {
    const { categoryName, page = 1, limit = 10 } = req.query;

    const skip = (page - 1) * limit;

    const products = await Product.aggregate([
        {
            $lookup: {
                from: "categories",
                localField: "category",
                foreignField: "_id",
                as: "categoryData"
            }
        },
        { $unwind: "$categoryData" },
        {
            $match: {
                "categoryData.name": { $regex: categoryName, $options: "i" }
            }
        },
        { $sort: { createdAt: -1 } },
        { $skip: skip },
        { $limit: parseInt(limit) }
    ]);

    const totalProducts = await Product.aggregate([
        {
            $lookup: {
                from: "categories",
                localField: "category",
                foreignField: "_id",
                as: "categoryData"
            }
        },
        { $unwind: "$categoryData" },
        {
            $match: {
                "categoryData.name": { $regex: categoryName, $options: "i" }
            }
        },
        { $count: "total" }
    ]);

    res.status(200).json({
        totalProducts: totalProducts[0]?.total || 0,
        currentPage: parseInt(page),
        totalPages: Math.ceil((totalProducts[0]?.total || 0) / limit),
        products
    });
});

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

    res.status(201).json(product);
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
