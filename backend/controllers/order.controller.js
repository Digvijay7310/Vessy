import asyncHandler from "../utils/asyncHandler.js";
import apiResponse from "../utils/apiResponse.js";
import { Cart } from "../models/cart.model.js";
import { Order } from "../models/order.model.js";

// Checkout Order
export const checkoutOrder = asyncHandler(async (req, res) => {
    const cart = await Cart.findOne({ owner: req.user._id }).populate("items.product");
    if (!cart || cart.items.length === 0) {
        return res.status(400).json({ message: "Cart is empty" });
    }

    const totalPrice = cart.items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
    const platformCharge = 5 + Math.floor(Math.random() * 6); // 5-10 Rs
    const deliveryCharge = totalPrice < 199 ? 60 : 0;
    const finalAmount = totalPrice + platformCharge + deliveryCharge;

    const orderItems = cart.items.map(item => ({
        product: {
            _id: item.product._id,
            name: item.product.name,
            image: item.product.image,          // image array
            description: item.product.description,
            price: item.product.price
        },
        quantity: item.quantity,
        price: item.product.price
    }));

    const order = await Order.create({
        customer: req.user._id,
        items: orderItems,
        totalPrice,
        platformCharge,
        deliveryCharge,
        finalAmount,
        paymentMethod: "Online",
        paymentStatus: "Pending",
        orderStatus: "Pending"
    });

    // Clear cart
    cart.items = [];
    await cart.save();

    // Return structured order response
    return res.status(201).json(
        new apiResponse(201, {
            orderId: order._id,
            items: order.items,
            totalPrice: order.totalPrice,
            platformCharge: order.platformCharge,
            deliveryCharge: order.deliveryCharge,
            finalAmount: order.finalAmount,
            paymentMethod: order.paymentMethod,
            paymentStatus: order.paymentStatus,
            orderStatus: order.orderStatus,
            createdAt: order.createdAt
        }, "Order created successfully")
    );
});

// Get current user's orders
export const getMyOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({ customer: req.user._id }).sort({ createdAt: -1 });

    const response = orders.map(order => ({
        orderId: order._id,
        items: order.items.map(item => ({
            _id: item._id,
            productId: item.product._id,
            name: item.product.name,
            image: item.product.image,      // keep as array
            description: item.product.description,
            price: item.product.price,
            quantity: item.quantity
        })),
        totalPrice: order.totalPrice,
        platformCharge: order.platformCharge,
        deliveryCharge: order.deliveryCharge,
        finalAmount: order.finalAmount,
        paymentMethod: order.paymentMethod,
        paymentStatus: order.paymentStatus,
        orderStatus: order.orderStatus,
        createdAt: order.createdAt
    }));

    return res.status(200).json(new apiResponse(200, response, "User orders fetched successfully"));
});

// GET single order by ID (for the logged-in customer)
export const getOrderById = asyncHandler(async (req, res) => {
    const { orderId } = req.params;

    // Find order and ensure it belongs to logged-in customer
    const order = await Order.findOne({ _id: orderId, customer: req.user._id });

    if (!order) {
        throw new apiError(404, "Order not found");
    }

    // Prepare professional response
    const response = {
        orderId: order._id,
        items: order.items.map(item => ({
            _id: item.product._id,
            name: item.product.name,
            image: item.product.image,
            description: item.product.description,
            price: item.product.price,
            quantity: item.quantity
        })),
        totalPrice: order.totalPrice,
        platformCharge: order.platformCharge,
        deliveryCharge: order.deliveryCharge,
        finalAmount: order.finalAmount,
        paymentMethod: order.paymentMethod,
        paymentStatus: order.paymentStatus,
        orderStatus: order.orderStatus,
        createdAt: order.createdAt
    };

    return res.status(200).json(
        new apiResponse(200, response, "Order fetched successfully")
    );
});

// Admin: All Orders
export const getAllOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find().populate('customer').populate('items.product');
    return res.status(200).json(
        new apiResponse(200, orders, "All orders fetched successfully")
    );
});