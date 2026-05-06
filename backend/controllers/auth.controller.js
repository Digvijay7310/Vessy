import jwt from 'jsonwebtoken'
import asyncHandler from '../utils/asyncHandler.js'
import apiError from '../utils/apiError.js'
import { Customer } from '../models/customer.model.js'


export const refreshAccessToken = asyncHandler(async (req, res) => {

    const incomingRefreshToken = req.cookies.refreshToken

    if (!incomingRefreshToken) {
        throw new apiError(401, "No refresh Token")
    }

    const decoded = jwt.verify(
        incomingRefreshToken,
        process.env.REFRESH_TOKEN_SECRET
    )

    const user = await Customer.findById(decoded.id)

    if (!user || user.refreshToken !== incomingRefreshToken) {
        throw new apiError(401, "Invalid refresh Token")
    }

    // Generate new tokens
    const newAccessToken = user.generateAccessToken()
    const newRefreshToken = user.generateRefreshToken()

    // Save new refresh token
    user.refreshToken = newRefreshToken
    await user.save({ validateBeforeSave: false })

    res.cookie("accessToken", newAccessToken, {
        httpOnly: true,
        secure: false,
        sameSite: "lax"
    })

    res.cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: "lax"
    })

    res.status(200).json({
        success: true,
        message: "Token refreshed"
    })
})