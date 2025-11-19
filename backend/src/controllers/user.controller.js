import { User } from "../models/user.model.js";
import apiError from "../utils/apiError.js";
import apiResponse from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";


export const userRegister = asyncHandler(async(req, res) => {
    const {email, fullName, password} = req.body;

    if(!email || !password || !fullName) {
        throw new apiError(403, "All fields are required")
    }

    const existing = await User.findOne({email})
    if(existing){
        throw new apiError(409, "admin with this email already exist")
    }

    const user = await User.create({email, fullName, password})

    const accessToken = user.generateAccessToken()
    const refreshToken = user.generateRefreshToken()

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
        new apiResponse(201, user, 'User register successfully')
    )


})

export const userLogin = asyncHandler(async(req, res) => {
    const {email, password} = req.body;

    if(!email || !password){
        throw new apiError(403, "all fields are required")
    }

    const user = await User.findOne({email})
    if(!user) {
        throw new apiError(404, "Invalid Credentials")
    }

    const isMatch = await user.isPasswordCorrect(password)
    if(!isMatch) {
        return res.status(401).json(new apiResponse(401, null, "Invalid emai and password"))
    }

    const accessToken = user.generateAccessToken()
    const refreshToken = user.generateRefreshToken()

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
        new apiResponse(200, user, "User login successfull")
    )
})

export const userLogout = asyncHandler(async (req, res) => {
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