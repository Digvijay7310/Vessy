import asyncHandler from '../utils/asyncHandler.js'
import apiError from '../utils/apiError.js'
import { Customer } from '../models/customer.model.js';
import { Order } from '../models/order.model.js';
import { Cart } from '../models/cart.model.js';
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
        maxAge: 24 * 60 * 60 * 1000
    })

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000
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
        maxAge: 24 * 60 * 60 * 1000
    });

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000
    });
        // console.log("customer login token: ", accessToken);

    return res.status(200).json({
        success: true,
        message: "Login successful",
        customer
    });
});

export const customerLogout = asyncHandler(async (req, res) => {
    
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

    if (!req.user) {
        throw new apiError(401, "Not authenticated");
    }

    // CUSTOMER

    const customer = await Customer.findById(req.user._id)
        .select("-password -refreshToken")

    if (!customer) {
        throw new apiError(404, "Customer not found");
    }

    // CART

    const cart = await Cart.findOne({
        owner: req.user._id
    }).populate("items.product");

    // ORDERS

    const orders = await Order.find({
        customer: req.user._id
    })
    .sort({ createdAt: -1 })
    .populate("items.product");

    // STATS

    const deliveredOrders = orders.filter(
        order => order.orderStatus === "Delivered"
    );

    const cancelledOrders = orders.filter(
        order => order.orderStatus === "Cancelled"
    );

    const returnedOrders = orders.filter(
        order => order.orderStatus === "Returned"
    );

    const pendingOrders = orders.filter(order =>
        [
            "Pending",
            "Confirmed",
            "Processing",
            "Shipped",
            "Out for Delivery"
        ].includes(order.orderStatus)
    );

    // MONEY SPENT

    const totalSpent = deliveredOrders.reduce(
        (acc, order) => acc + order.finalAmount,
        0
    );

    // PRODUCTS PURCHASED

    const totalProductsPurchased = deliveredOrders.reduce(
        (acc, order) => {

            const orderQty = order.items.reduce(
                (sum, item) => sum + item.quantity,
                0
            );

            return acc + orderQty;

        },
        0
    );

    // RESPONSE

    return res.status(200).json({

        success: true,

        customer,

        cart: {
            totalItems: cart?.items?.length || 0,
            items: cart?.items || []
        },

        stats: {

            totalOrders: orders.length,

            deliveredOrders: deliveredOrders.length,

            cancelledOrders: cancelledOrders.length,

            returnedOrders: returnedOrders.length,

            pendingOrders: pendingOrders.length,

            totalSpent,

            totalProductsPurchased

        },

        recentOrders: orders.slice(0, 5)

    });

});
