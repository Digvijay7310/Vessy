import asyncHandler from "../utils/asyncHandler.js";
import apiError from "../utils/apiError.js";
import apiResponse from "../utils/apiResponse.js";
import { Customer } from "../models/customer.model.js";
import jwt from 'jsonwebtoken'


// export const isUser = asyncHandler(async(req, res, next) => {
//     if (req.user?.role !== "users") {
//       throw new apiError(403, "users only")
// }
// next()
// })


export const verifyCustomer = asyncHandler(async (req, res, next) => {

    try {

        const token = req.cookies?.accessToken;

        if (!token) {
            throw new apiError(401, "Unauthorized request");
        }

        const decoded = jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET
        );

        const customer = await Customer
            .findById(decoded.id)
            .select("-password -refreshToken");

        if (!customer) {
            throw new apiError(401, "Invalid token");
        }

        req.user = customer;

        next();

    } catch (error) {

        throw new apiError(401, "Invalid or expired token");

    }

});