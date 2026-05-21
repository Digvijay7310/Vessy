import asyncHandler from "../utils/asyncHandler.js";
import apiError from "../utils/apiError.js";
import jwt from "jsonwebtoken";
import { Admin } from "../models/admin.model.js";

export const isAdmin = asyncHandler(async (req, res, next) => {
    if (req.user?.role !== "admin") {
        throw new apiError(403, "Admin only access");
    }
    next();
});



export const verifyAdmin = asyncHandler(async (req, res, next) => {
    const token = req.cookies?.accessToken;

    if (!token) {
        throw new apiError(401, "Unauthorized request");
    }

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const admin = await Admin.findById(decoded.id).select("-password");

    if (!admin) {
        throw new apiError(401, "Invalid token");
    }

    req.user = admin;
    next();
});