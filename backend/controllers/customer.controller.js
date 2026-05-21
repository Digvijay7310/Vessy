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

    customer.refreshToken = refreshToken
    await customer.save({validateBeforeSave: false})

    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
    })

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
    })

    return res.status(201).json(
        new apiResponse(201, customer, "Customer created")
    )
})

export const customerLogin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    

    if (!email || !password) {
        throw new apiError(402, "All fields are required");
    }

    const customer = await Customer.findOne({ email });
    if (!customer) {
        throw new apiError(404, "Invalid email");
    }

    const isMatch = await customer.matchedPassword(password);
    if (!isMatch) {
        throw new apiError(404, "Invalid password");
    }

    const accessToken = customer.generateAccessToken();
    const refreshToken = customer.generateRefreshToken();

    customer.refreshToken = refreshToken;
    await customer.save({ validateBeforeSave: false });

    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
    });

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
    });
        console.log("customer login token: ", accessToken);

    return res.status(200).json({
        success: true,
        message: "Login successful",
        customer
    });
});

export const customerLogout = asyncHandler(async (req, res) => {

    console.log(req.user)
    console.log("The users ----------------");
    
    res.clearCookie("accessToken", {
        httpOnly: true,
        sameSite: "lax",
        secure: false,
    })
    res.clearCookie("refreshToken", {
        httpOnly: true,
        sameSite: "lax",
        secure: false,
    })

    return res.status(200).json({
        success: true,
        message: "Logout successfully"
    })
})

export const customerProfile = asyncHandler(async (req, res) => {
    if(!req.user){
        throw new apiError(401, "Not authenticated")
    }
    const customer = await Customer.findById(req.user._id).select("-password -refreshToken")
    if(!customer){
        throw new apiError(404, "Customer not found")
    }
    return res.status(200).json(
        new apiResponse(200, customer, "Profile fetched successfully")
    )
})

