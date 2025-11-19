import { Admin } from "../models/admin.model.js";
import { User } from "../models/user.model.js";
import apiError from "../utils/apiError.js";
import apiResponse from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import jwt from 'jsonwebtoken'


export const verifyAdmin = asyncHandler(async(req, res, next) => {
    try {
        const token = req.cookies?.accessToken;
        if(!token){
            throw new apiError(401, "Access token not found")
        }
    
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    
        const admin = await Admin.findById(decoded._id).select("-password")
        if(!admin){
            throw new apiError(404, "admin with this id not found")
        }
        if(admin.role !== 'admin'){
            throw new apiError(403, "Admin only")
        }
        req.user = admin;
        next()
    } catch (error) {
     console.log(error)
     return res.status(401).json({
        success: false,
        message: "Invalid or expires token"
     }) 
    }

})


export const verifyUser = asyncHandler(async(req, res, next) => {
    try {
        const token = req.cookies?.accessToken;
        if(!token){
            throw new apiError(401, "Access token not found")
        }
    
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    
        const user = await User.findById(decoded._id).select("-password")
        if(!user){
            throw new apiError(404, "admin with this id not found")
        }
        if(user.role !== 'user'){
            throw new apiError(403, "User only")
        }
        req.user = user;
        next()
    } catch (error) {
     console.log(error)
     return res.status(401).json({
        success: false,
        message: "Invalid or expires token"
     }) 
    }

})

