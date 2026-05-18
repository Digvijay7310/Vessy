import asyncHandler from '../utils/asyncHandler.js'
import apiResponse from '../utils/apiResponse.js'
import apiError from '../utils/apiError.js'
import { Admin } from '../models/admin.model.js';
import { Category, SubCategory } from '../models/category.model.js'
import { Product } from '../models/product.model.js'
import {Order} from '../models/order.model.js'

export const adminRegistration = asyncHandler(async (req, res) => {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
        throw new apiError(400, "All fields required");
    }

    const existing = await Admin.findOne({ email });
    if (existing) {
        throw new apiError(400, "Admin already exists");
    }

    const admin = await Admin.create({ fullName, email, password });

    const accessToken = admin.generateAccessToken();
    const refreshToken = admin.generateRefreshToken();

    admin.refreshToken = refreshToken
    await admin.save({validateBeforeSave: false})
    
    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        withCredentials: true
    });

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        withCredentials: true
    });

    res.status(201).json({
        success: true,
        admin,
    });
});


export const adminLogin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });

    if (!admin) {
        throw new apiError(400, "Invalid email");
    }

    const isMatch = await admin.matchPassword(password);

    if (!isMatch) {
        throw new apiError(400, "Invalid password");
    }

    const accessToken = admin.generateAccessToken();
    const refreshToken = admin.generateRefreshToken();

    admin.refreshToken = refreshToken
    await admin.save({validateBeforeSave: false})

    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        withCredentials: true
    });

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        withCredentials: true
    });

    return res.status(200).json({
        success: true,
        admin,
    });
});


export const getMyProfile = asyncHandler(async (req, res) => {
    const admin = await Admin.findById(req.user._id).select(
        "fullName email role createdAt updatedAt"
    )

    if(!admin) {
        throw new apiError(404, "Admin not found")
    }
    res.status(200).json(admin)
})

export const adminLogout = asyncHandler(async (req, res) => {
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");

    return res.status(200).json({
        success: true,
        message: "Logged out successfully",
    });
});


// Produucts

export const getAllData = asyncHandler(async (req, res) => {
    const totalCategory = await Category.countDocuments()
    const totalSubCategory = await SubCategory.countDocuments()
    const totalProducts = await Product.countDocuments()
    const totalOrder = await Order.countDocuments()

    if(!totalCategory || !totalSubCategory || !totalProducts || !totalOrder){
        throw new apiError(404, "No data found")
    }
    res.status(200).json(
        new apiResponse(200, {totalCategory, totalSubCategory, totalProducts, totalOrder}, "data fetched")
    )
})

export const AllOrder = asyncHandler(async (req, res) => {

    const orders = await Order.find(); // ✅ get all orders

   const pendingOrders = await Order.countDocuments({ orderStatus: "pending" });
const confirmedOrders = await Order.countDocuments({ orderStatus: "confirmed" });
const processingOrders = await Order.countDocuments({ orderStatus: "processing" });
const shippedOrders = await Order.countDocuments({ orderStatus: "shipped" });
const outForDelivery = await Order.countDocuments({ orderStatus: "outForDelivery" });
const deliveredOrders = await Order.countDocuments({ orderStatus: "delivered" });
const returnedOrders = await Order.countDocuments({ orderStatus: "returned" });

    res.status(200).json(
        new apiResponse(
            200,
            {
                totalOrders: orders.length,
                pendingOrders: pendingOrders.length,
                confirmedOrders: confirmedOrders.length,
                processingOrders: processingOrders.length,
                shippedOrders: shippedOrders.length,
                outForDelivery: outForDelivery.length,
                deliveredOrders: deliveredOrders.length,
                returnedOrders: returnedOrders.length,
            },
            "Orders with status fetched"
        )
    );
});