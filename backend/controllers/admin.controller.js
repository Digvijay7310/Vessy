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

// Orders


export const AllOrder = asyncHandler(async (req, res) => {

    const orders = await Order.find(); // ✅ get all orders
    const totalOrders = await Order.countDocuments()

    const pendingOrders = await Order.countDocuments({ orderStatus: "Pending" });
    const confirmedOrders = await Order.countDocuments({ orderStatus: "Confirmed" });
    const processingOrders = await Order.countDocuments({ orderStatus: "Processing" });
    const shippedOrders = await Order.countDocuments({ orderStatus: "Shipped" });
    const outForDelivery = await Order.countDocuments({ orderStatus: "OutForDelivery" });
    const deliveredOrders = await Order.countDocuments({ orderStatus: "Delivered" });
    const returnedOrders = await Order.countDocuments({ orderStatus: "Returned" });

    res.status(200).json(
        new apiResponse(
            200,{
                orders, totalOrders,
                 pendingOrders, confirmedOrders,
                processingOrders, shippedOrders, outForDelivery,
                deliveredOrders, returnedOrders
            },
            "Orders with status fetched"
        )
    );
});

export const getOrdersByStatus = asyncHandler(async (req, res) => {

    let { status } = req.params;

    // normalize
    status = status
        .replace(/-/g, " ")
        .replace(/\b\w/g, (l) => l.toUpperCase());

    const orders = await Order.find(
        status ? { orderStatus: status } : {}
    )
    .populate("customer", "name email")
    .sort({ createdAt: -1 });

    res.status(200).json(
        new apiResponse(200, orders, "Orders fetched successfully")
    );
});