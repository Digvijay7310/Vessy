import asyncHandler from '../utils/asyncHandler.js'
import apiResponse from '../utils/apiResponse.js'
import apiError from '../utils/apiError.js'
import { Admin } from '../models/admin.model.js';

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
    
})

export const adminLogout = asyncHandler(async (req, res) => {
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");

    return res.status(200).json({
        success: true,
        message: "Logged out successfully",
    });
});