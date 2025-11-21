import { User } from "../models/user.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import apiError from "../utils/apiError.js";
import apiResponse from "../utils/apiResponse.js";
import jwt from "jsonwebtoken";


// ------------------------ REGISTER USER ------------------------
export const userRegister = asyncHandler(async (req, res) => {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
        throw new apiError(400, "All fields are required");
    }

    const exists = await User.findOne({ email });
    if (exists) throw new apiError(409, "User already exists");

    const user = await User.create({ fullName, email, password });

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
    });

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
    });

    res.status(201).json(new apiResponse(201, user, "User registered"));
});


// ------------------------ LOGIN USER ------------------------
export const userLogin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password)
        throw new apiError(400, "All fields are required");

    const user = await User.findOne({ email });
    if (!user) throw new apiError(404, "Invalid credentials");

    const isMatch = await user.isPasswordCorrect(password);
    if (!isMatch) throw new apiError(401, "Invalid email or password");

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
    });

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
    });

    res.status(200).json(new apiResponse(200, user, "Login successful"));
});


// ------------------------ GET MY PROFILE ------------------------
export const getMyProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id).select("-password");

    if (!user) throw new apiError(404, "User not found");

    res.status(200).json(new apiResponse(200, user, "Profile fetched"));
});


// ------------------------ REFRESH TOKEN ------------------------
export const refreshUserAccessToken = asyncHandler(async (req, res) => {
    const { refreshToken } = req.cookies;

    if (!refreshToken) throw new apiError(401, "No refresh token provided");

    const decoded = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET
    );

    const user = await User.findById(decoded._id);
    if (!user) throw new apiError(404, "User not found");

    const newAccessToken = user.generateAccessToken();

    res.cookie("accessToken", newAccessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
    });

    res
        .status(200)
        .json(new apiResponse(200, newAccessToken, "Token refreshed"));
});


// ------------------------ UPDATE PROFILE ------------------------
export const updateUserProfile = asyncHandler(async (req, res) => {
    const { fullName } = req.body;

    const user = await User.findById(req.user._id);
    if (!user) throw new apiError(404, "User not found");

    if (fullName) user.fullName = fullName;

    await user.save();

    res.status(200).json(new apiResponse(200, user, "Profile updated"));
});


// ------------------------ CHANGE PASSWORD ------------------------
export const changeUserPassword = asyncHandler(async (req, res) => {
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword)
        throw new apiError(400, "All fields are required");

    const user = await User.findById(req.user._id);
    if (!user) throw new apiError(404, "User not found");

    const isMatch = await user.isPasswordCorrect(oldPassword);
    if (!isMatch) throw new apiError(401, "Old password incorrect");

    user.password = newPassword;
    await user.save();

    res.status(200).json(new apiResponse(200, null, "Password updated"));
});


// ------------------------ LOGOUT USER ------------------------
export const userLogout = asyncHandler(async (req, res) => {
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");

    res.status(200).json(new apiResponse(200, null, "Logged out"));
});


// ------------------------ ADD ADDRESS ------------------------
export const addAddress = asyncHandler(async (req, res) => {
    const { street, city, state, pinCode, country } = req.body;

    if (!street || !city || !state || !pinCode || !country)
        throw new apiError(400, "All fields are required");

    const user = await User.findById(req.user._id);
    if (!user) throw new apiError(404, "User not found");

    user.address.push({ street, city, state, pinCode, country });
    await user.save();

    res.status(201).json(new apiResponse(201, user.address, "Address added"));
});


// ------------------------ DELETE ADDRESS ------------------------
export const deleteAddress = asyncHandler(async (req, res) => {
    const { index } = req.params;

    const user = await User.findById(req.user._id);
    if (!user) throw new apiError(404, "User not found");

    if (!user.address[index])
        throw new apiError(404, "Address not found");

    user.address.splice(index, 1);
    await user.save();

    res.status(200).json(new apiResponse(200, user.address, "Address removed"));
});


// ------------------------ GET MY ADDRESSES ------------------------
export const getMyAddresses = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id).select("address");

    if (!user) throw new apiError(404, "User not found");

    res.status(200).json(new apiResponse(200, user.address, "Addresses fetched"));
});


// ------------------------ DELETE USER ACCOUNT (optional) ------------------------
export const deleteMyAccount = asyncHandler(async (req, res) => {
    await User.findByIdAndDelete(req.user._id);

    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");

    res.status(200).json(new apiResponse(200, null, "Account deleted"));
});
