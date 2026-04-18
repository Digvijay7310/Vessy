import asyncHandler from '../utils/asyncHandler.js'
import apiError from '../utils/apiError.js'
import { Customer } from '../models/customer.model.js';
import apiResponse from '../utils/apiResponse.js';



export const customerRegistration = asyncHandler(async (req, res) => {
    const {fullName, email, phone, password} = req.body;

    if(!fullName || !email || !phone || !password){
        throw new apiError(401, "all fields are required")
    }

    const existEmail = await Customer.findOne({email})
    const phoneExist = await Customer.findOne({phone})
    if(existEmail || phoneExist){
        throw new apiError(401, "Already exists")
    }

    const customer = await Customer.create({ fullName, email, phone, password })

    const accessToken = customer.generateAccessToken()
    const refreshToken = customer.generateRefreshToken()

    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: lax,
        withCredentials: true
    })

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: lax,
        withCredentials: true
    })

    return res.status(201).json(
        new apiResponse(201, customer, "Customer created")
    )
})


export const customerLogin = asyncHandler(async (req, res) => {
    const {email, password} = req.body;

    if(!email || !password){
        throw new apiError(402, "All fields are required")
    }

    const customer = await Customer.findOne({email})
    if(!existing) {
        throw new apiError(404, "Invalid password")
    }

    const isMatch = await customer.matchedPassword(password)
    if(!isMatch){
        throw new apiError(404, "Invalid password")
    }
    
    const accessToken = customer.generateAccessToken()
    const refreshToken = customer.generateRefreshToken()

    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: lax,
        withCredentials: true
    })

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: lax,
        withCredentials: true
    })

    return res.status(201).json(
        new apiResponse(201, customer, "Customer created")
    )
})


export const customerLogout = asyncHandler(async (req, res) => {
    res.clearCookie("accessToken")
    res.clearCookie("refreshToken")

    return res.status(200).json({
        success: true,
        message: "Logout successfully"
    })
})