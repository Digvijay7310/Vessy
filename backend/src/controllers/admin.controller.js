import { Admin } from "../models/admin.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import apiError from "../utils/apiError.js";
import apiResponse from "../utils/apiResponse.js";
import {User} from '../models/user.model.js'

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
        throw new apiError(403, "all fields are required")
    }

    const admin = await Admin.findOne({email})
    if(!admin) {
        throw new apiError(404, "Invalid Credentials")
    }

    const isMatch = await admin.isPasswordCorrect(password)
    if(!isMatch) {
        return res.status(401).json(new apiResponse(401, null, "Invalid emai and password"))
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

    const admin = await Admin.findOne({email: loggedInAdmin.email})
    if(!admin) {
        throw new apiError(404, "Amin not found")
    }
    res.status(200).json(
        new apiResponse(200, admin, "Admin found")
    )
})

export const totalUsers = asyncHandler(async (req, res) => {
    const [usersCount] = await Promise.all([
        User.countDocuments()
    ])
    res.status(200).json(new apiResponse(200, usersCount, "User counts fetched"))
})

export const searchUsers = asyncHandler(async (req, res) => {
    const {email} = req.query;

    if(!email) {
        return res.status(400).json(
            new apiResponse(400, null, "Email query is required")
        )
    }
    const users = await User.find({email: {$regex: email, $options: 'i'}})
    if(users.length === 0){
        return res.status(400).json(
            new apiResponse(404, null, 'No users found')
        )
    } 

    res.status(200).json(new apiResponse(200, users, "users found"))
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