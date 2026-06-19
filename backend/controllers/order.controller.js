import mongoose from "mongoose";
import asyncHandler from "../utils/asyncHandler.js";
import apiResponse from "../utils/apiResponse.js";
import { Cart } from "../models/cart.model.js";
import { Order } from "../models/order.model.js";
import { Customer } from "../models/customer.model.js";
import { Product } from "../models/product.model.js";
import apiError from "../utils/apiError.js";

// Preview Checkout
export const previewCheckout = asyncHandler(async (req, res) => {
    const cart = await Cart.findOne({ owner: req.user._id })
        .populate("items.product");

    if (!cart || cart.items.length === 0) {
        throw new apiError(400, "Cart is empty");
    }

    const totalPrice = cart.items.reduce(
        (acc, item) => acc + item.product.price * item.quantity,
        0
    );

    const platformCharge = 5;
    const deliveryCharge = totalPrice < 99 ? 30 : 0;
    const finalAmount = totalPrice + platformCharge + deliveryCharge;

    return res.status(200).json(
        new apiResponse(200, {
            items: cart.items,
            totalPrice,
            platformCharge,
            deliveryCharge,
            finalAmount
        }, "Checkout preview fetched")
    );
});

export const checkoutOrder = asyncHandler(async (req, res) => {

    const { paymentMethod } = req.body;

    if (paymentMethod !== "COD") {
        throw new apiError(400, "Only COD allowed for now");
    }

    const customer = await Customer.findById(req.user._id);

    if (!customer) {
        throw new apiError(404, "Customer not found");
    }

    const defaultAddress = customer.shippingAddresses.find(
        (a) => a.isDefault
    );

    if (!defaultAddress) {
        throw new apiError(400, "Add delivery address");
    }

    const cart = await Cart.findOne({ owner: req.user._id })
        .populate("items.product");

    if (!cart || cart.items.length === 0) {
        throw new apiError(400, "Cart is empty");
    }

    const totalPrice = cart.items.reduce(
        (acc, item) =>
            acc + item.product.price * item.quantity,
        0
    );

    const platformCharge = 5;
    const deliveryCharge = totalPrice < 99 ? 30 : 0;
    const finalAmount = totalPrice + platformCharge + deliveryCharge;

    const orderItems = cart.items.map((item) => ({
        product: item.product._id,
        quantity: item.quantity,
        price: item.product.price,
    }));

    const expectedDelivery = new Date();
    expectedDelivery.setDate(expectedDelivery.getDate() + 7);

    const order = await Order.create({
        customer: req.user._id,
        shippingAddress: defaultAddress,
        items: orderItems,
        totalPrice,
        platformCharge,
        deliveryCharge,
        finalAmount,
        paymentMethod: "COD",
        paymentStatus: "Pending",
        orderStatus: "Pending",
        expectedDelivery,
    });

    // stock update
    for (const item of cart.items) {
        await Product.findByIdAndUpdate(
            item.product._id,
            { $inc: { stock: -item.quantity } }
        );
    }

    await Cart.findOneAndUpdate(
        { owner: req.user._id },
        { $set: { items: [] } }
    );

    const populatedOrder = await Order.findById(order._id)
        .populate("items.product");

    return res.status(201).json(
        new apiResponse(201, populatedOrder, "Order placed successfully")
    );
});

// Get current user's orders
export const getMyOrders = asyncHandler(async (req, res) => {

    const orders = await Order.find({ customer: req.user._id })
        .populate("items.product")
        .sort({ createdAt: -1 });

    const response = orders.map(order => ({
        orderId: order._id,

        items: order.items.map(item => ({
            _id: item._id,
            name: item.product?.name,

            // ✅ SAFE IMAGE NORMALIZATION (IMPORTANT)
            image: Array.isArray(item.product?.image)
                ? item.product.image[0]
                : item.product?.image || null,

            price: item.price,
            quantity: item.quantity
        })),

        totalPrice: order.totalPrice,
        finalAmount: order.finalAmount,
        paymentStatus: order.paymentStatus,
        orderStatus: order.orderStatus,
        createdAt: order.createdAt
    }));

    return res.status(200).json(
        new apiResponse(200, response, "Orders fetched successfully")
    );
});

// GET single order by ID (for the logged-in customer)
export const getOrderById = asyncHandler(async (req, res) => {
    const { orderId } = req.params;

    // ✅ FIXED POPULATE SYNTAX
    const order = await Order.findOne({
        _id: orderId,
        customer: req.user._id
    }).populate({
        path: "items.product",
        select: "name image price description"
    });

    if (!order) {
        throw new apiError(404, "Order not found");
    }

    // =========================
    // RESPONSE NORMALIZATION
    // =========================
    const response = {
        orderId: order._id,

        items: order.items.map((item) => ({
            _id: item._id,

            product: item.product
                ? {
                    _id: item.product._id,
                    name: item.product.name,

                    // ✅ SAFE IMAGE HANDLING
                    image: Array.isArray(item.product.image)
                        ? item.product.image
                        : item.product.image
                        ? [item.product.image]
                        : [],

                    description: item.product.description,
                    price: item.product.price,
                }
                : null,

            price: item.price,
            quantity: item.quantity,
        })),

        totalPrice: order.totalPrice,
        platformCharge: order.platformCharge,
        deliveryCharge: order.deliveryCharge,
        finalAmount: order.finalAmount,

        paymentMethod: order.paymentMethod,
        paymentStatus: order.paymentStatus,
        orderStatus: order.orderStatus,

        expectedDelivery: order.expectedDelivery,
        createdAt: order.createdAt,
    };

    return res.status(200).json(
        new apiResponse(200, response, "Order fetched successfully")
    );
});


export const addAddress = asyncHandler(async (req, res) => {
    const user = await Customer.findById(req.user._id);

    if (!user) {
        throw new apiError(404, "User not found");
    }

    const newAddress = req.body;

    if (user.shippingAddresses.length === 0) {
        newAddress.isDefault = true;
    }

    if (newAddress.isDefault) {
        user.shippingAddresses.forEach((addr) => {
            addr.isDefault = false;
        });
    }

    user.shippingAddresses.push(newAddress);

    await user.save();

    return res.status(200).json(
        new apiResponse(
            200,
            user.shippingAddresses,
            "Address added successfully"
        )
    );
});



export const getAddresses = asyncHandler(async (req, res) => {
    const user = await Customer.findById(req.user._id);

    if (!user) {
        throw new apiError(404, "User not found");
    }

    return res.status(200).json(
        new apiResponse(
            200,
            user.shippingAddresses,
            "Addresses fetched successfully"
        )
    );
});

export const setDefaultAddress = asyncHandler(async (req, res) => {
    const user = await Customer.findById(req.user._id);

    if (!user) {
        throw new apiError(404, "User not found");
    }

    user.shippingAddresses.forEach((addr) => {
        addr.isDefault = addr._id.toString() === req.params.id;
    });

    await user.save();

    return res.status(200).json(
        new apiResponse(
            200,
            user.shippingAddresses,
            "Default address updated"
        )
    );
});


// Admin: All Orders
export const getAllOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find().populate('customer').populate('items.product');
    return res.status(200).json(
        new apiResponse(200, orders, "All orders fetched successfully")
    );
});