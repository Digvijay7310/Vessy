import { Admin } from "../models/admin.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import apiError from "../utils/apiError.js";
import apiResponse from "../utils/apiResponse.js";
import {User} from '../models/user.model.js'
import jwt from 'jsonwebtoken'

export const adminRegister = asyncHandler(async(req, res) => {
    const {email, fullName, password} = req.body;

    if(!email || !password || !fullName) {
        throw new apiError(403, "All fields are required")
    }

    const existing = await Admin.findOne({email})
    if(existing){
        throw new apiError(409, "admin with this email already exist")
    }

    const admin = await Admin.create({email, fullName, password})

    const accessToken = admin.generateAccessToken()
    const refreshToken = admin.generateRefreshToken()

    res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV = 'production',
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000 
    })

    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV = 'production',
        sameSite: 'lax',
        maxAge: 10 * 24 * 60 * 60 * 1000 
    })

    res.status(201).json(
        new apiResponse(201, admin, 'Admin register successfully')
    )


})

export const adminLogin = asyncHandler(async(req, res) => {
    const {email, password} = req.body;

    if(!email || !password){
        throw new apiError(403, "All fields are required")
    }

    const admin = await Admin.findOne({email})
    if(!admin) {
        throw new apiError(404, "Invalid Credentials")
    }

    const isMatch = await admin.isPasswordCorrect(password)
    if(!isMatch) {
        throw new apiError(401, "Invalid email or password")
    }

    const accessToken = admin.generateAccessToken()
    const refreshToken = admin.generateRefreshToken()

    res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000
    })

    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 10 * 24 * 60 * 60 * 1000
    })

    res.status(200).json(
        new apiResponse(200, admin, "User login successfull")
    )
})

export const getMyProfile = asyncHandler(async (req, res) => {
    const loggedInAdmin = req.user;

    const admin = await Admin.findOne({email: loggedInAdmin.email}).select("-password")
    if(!admin) {
        throw new apiError(404, "Amin not found")
    }
    res.status(200).json(
        new apiResponse(200, admin, "Admin found")
    )
})

export const refreshAccessToken = asyncHandler(async (req, res) => {
    const {refreshToken} = req.cookies;

    if(!refreshToken) {
        throw new apiError(401, "No refresh token")
    }

    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)

    const admin = await Admin.findById(decoded._id)
    if(!admin) {
        throw new apiError(404, "Admin not found")
    }
    const newAccessToken = admin.generateAccessToken()

    res.cookie("accessToken", newAccessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax'
    })

    res.status(200).json(
        new apiResponse(200, newAccessToken, 'token refreshed')
    )
})

export const updateAdminProfile = asyncHandler(async(req, res) => {
    const {fullName} = req.body;

    const admin = await Admin.findById(req.user._id)
    if(!admin) {
        throw new apiError(404, "Admin not found")
    }

    await admin.save()

    res.status(200).json(new apiResponse(200, admin, "Profile updated"))
})

export const changeAdminPassword = asyncHandler(async(req, res) => {
    const {oldPassword, newPassword} = req.body;

    if(!oldPassword || !newPassword){
        throw new apiError(400, "Both fields are required")
    }

    const admin = await Admin.findById(req.user._id)
    if(!admin){
        throw new apiError(404, "ADmin not found")
    }

    const isMatch = await admin.isPasswordCorrect(oldPassword)
    if(!isMatch){
        throw new apiError(401, "Old password incorrect")
    }

    admin.password = newPassword;
    await admin.save()

    res.status(200).json(
        new apiResponse(200, null, "Password updated")
    )
})

export const adminLogout = asyncHandler(async (req, res) => {
    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax'
    })
    res.clearCookie("accessToken", {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax'
    })
})

export const getAllUsers = asyncHandler(async (req, res) => {
    const {page= 1, limit=20} = req.query;

    const users = await User.find()
    .select("-password")
    .skip((page -1) * limit)
    .limit(Number(limit))

    const total = await User.countDocuments()

    res.status(200).json(
        new apiResponse(200, {total, page, limit, users}, "Usres fetched")
    )
})

export const searchUsers = asyncHandler(async (req, res) => {
    const {q} = req.query;

    if(!q) {
            throw new apiError(400, "query missing")
    }
    const users = await User.find({email: {$regex: q, $options: 'i'}})
    .select("-password")
    if(users.length === 0){
        return res.status(400).json(
            new apiResponse(404, null, 'No users found')
        )
    } 

    res.status(200).json(new apiResponse(200, users, "users found"))
})

export const getSingleUser = asyncHandler(async(req, res) => {
    const {userId} = req.params;

    const user = await User.findById(userId).select("-password")
    if(!user){
        throw new apiError(404, "User not found")
    }
    res.status(200).json(
        new apiResponse(200, user, 'User fetched')
    )
})


export const deleteUser = asyncHandler(async(req, res) => {
    const {userId} = req.params;

    const user = await User.findById(userId)
    if(!user) {throw new apiError(404, "USer not found")}

    await User.findByIdAndDelete(user)

    res.status(200).json(
        new apiResponse(200, user, "user deleted")
    )
})


export const toggleBlockUser = asyncHandler(async(req, res) => {
    const {userId} = req.params;

    const user = await User.findById(userId);

    if(!user){
        throw new apiError(404, "User not found")
    }

    user.isBlocked = !user.isBlocked;
    await user.save()

    res.status(200)
    .json(new apiResponse(200, user, `User ${user.isBlocked ? "Blocked": "unBlocked"}`))
})

export const adminStats = asyncHandler(async(req, res) => {
    const [totalAdmins, totalUsers] = await Promise.all(
         User.countDocuments(),
         Admin.countDocuments()
    )

    res.status(200).json(
        new apiResponse(200, {totalUsers, totalAdmins},"Dashboard stats")
    )
})