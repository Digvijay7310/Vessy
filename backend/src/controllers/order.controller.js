import { Order } from "../models/order.model.js";
import { Cart } from "../models/cart.model.js";
import { Product } from "../models/product.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import apiError from "../utils/apiError.js";
import apiResponse from "../utils/apiResponse.js";


// ------------------- CREATE ORDER -------------------
export const createOrder = asyncHandler(async (req, res) => {
    const { shippingAddress } = req.body;

    if (!shippingAddress) throw new apiError(400, "Shipping address required");

    const cart = await Cart.findOne({ userId: req.user._id }).populate("items.productId");
    if (!cart || cart.items.length === 0) throw new apiError(400, "Cart is empty");

    let totalPrice = 0;
    const items = cart.items.map(item => {
        const price = item.productId.price;
        totalPrice += price * item.quantity;
        return {
            productId: item.productId._id,
            quantity: item.quantity,
            price: price,
        };
    });

    const order = await Order.create({
        userId: req.user._id,
        items,
        shippingAddress,
        totalPrice,
        status: "Pending",
        paymentStatus: "Pending",
    });

    // Clear cart after placing order
    await Cart.findOneAndDelete({ userId: req.user._id });

    res.status(201).json(new apiResponse(201, order, "Order placed successfully"));
});


// ------------------- GET MY ORDERS -------------------
export const getMyOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({ userId: req.user._id }).sort({ createdAt: -1 }).populate("items.productId");

    res.status(200).json(new apiResponse(200, orders, "Orders fetched successfully"));
});


// ------------------- GET SINGLE ORDER -------------------
export const getSingleOrder = asyncHandler(async (req, res) => {
    const { orderId } = req.params;

    const order = await Order.findById(orderId).populate("items.productId");

    if (!order) throw new apiError(404, "Order not found");

    if (order.userId.toString() !== req.user._id.toString()) {
        throw new apiError(403, "Not authorized");
    }

    res.status(200).json(new apiResponse(200, order, "Order fetched successfully"));
});


// ------------------- CANCEL ORDER -------------------
export const cancelOrder = asyncHandler(async (req, res) => {
    const { orderId } = req.params;

    const order = await Order.findById(orderId);
    if (!order) throw new apiError(404, "Order not found");

    if (order.userId.toString() !== req.user._id.toString()) {
        throw new apiError(403, "Not authorized");
    }

    if (["Shipped", "Delivered"].includes(order.status)) {
        throw new apiError(400, "Cannot cancel shipped/delivered order");
    }

    order.status = "Cancelled";
    await order.save();

    res.status(200).json(new apiResponse(200, order, "Order cancelled successfully"));
});
