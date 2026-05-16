import asyncHandler from "../utils/asyncHandler.js";
import apiResponse from "../utils/apiResponse.js";
import { Cart } from "../models/cart.model.js";
import { Order } from "../models/order.model.js";


// Preview Checkout
export const previewCheckout = asyncHandler(async (req, res) => {

    const cart = await Cart.findOne({
        owner: req.user._id
    }).populate("items.product");

    if (!cart || cart.items.length === 0) {
        return res.status(400).json({
            message: "Cart is empty"
        });
    }

    const totalPrice = cart.items.reduce(
        (acc, item) => acc + item.product.price * item.quantity,
        0
    );

    const platformCharge = 10;

    const deliveryCharge = totalPrice < 199 ? 60 : 0;

    const finalAmount =
        totalPrice +
        platformCharge +
        deliveryCharge;

    return res.status(200).json(
        new apiResponse(
            200,
            {
                items: cart.items,
                totalPrice,
                platformCharge,
                deliveryCharge,
                finalAmount
            },
            "Checkout preview fetched"
        )
    );
});

export const checkoutOrder = asyncHandler(async (req, res) => {

    const { paymentMethod } = req.body;

    // ONLY COD ALLOWED FOR NOW

    if (paymentMethod !== "COD") {

        return res.status(400).json({success: false, message: "Please select Cash on Delivery for now" });
    }

    // GET USER CART

    const cart = await Cart.findOne({owner: req.user._id }).populate("items.product");

    // EMPTY CART CHECK

    if (!cart || cart.items.length === 0) {

        return res.status(400).json({
            success: false,
            message: "Cart is empty"
        });
    }

    // CALCULATE PRICES

    const totalPrice = cart.items.reduce(
        (acc, item) =>
            acc + (
                item.product.price *
                item.quantity
            ),
        0
    );

    // PLATFORM CHARGE

    const platformCharge = 10;

    // DELIVERY CHARGE

    const deliveryCharge =
        totalPrice < 199 ? 60 : 0;

    // FINAL AMOUNT

    const finalAmount = totalPrice + platformCharge + deliveryCharge;

    // CREATE ORDER ITEMS

    const orderItems = cart.items.map(item => ({

        product: item.product._id,

        quantity: item.quantity,

        price: item.product.price

    }));

    // EXPECTED DELIVERY DATE

    const expectedDelivery = new Date();

    expectedDelivery.setDate(
        expectedDelivery.getDate() + 7
    );

    for (const item of cart.items) {
    if (item.quantity > item.product.stock) {
        return res.status(400).json({
            success: false,
            message: `${item.product.name} out of stock`
        });
    }
}
    // CREATE ORDER

    const order = await Order.create({

        customer: req.user._id,

        items: orderItems,

        totalPrice,

        platformCharge,

        deliveryCharge,

        finalAmount,

        paymentMethod: "COD",

        paymentStatus: "Pending",

        orderStatus: "Pending",

        expectedDelivery

    });

    // CLEAR USER CART

    await Cart.findOneAndUpdate(
        {
            owner: req.user._id
        },
        {
            $set: {
                items: []
            }
        }
    );

    // GET POPULATED ORDER

    const populatedOrder =
        await Order.findById(order._id)
        .populate("items.product");

    // FORMATTED RESPONSE

    const response = {

        orderId: populatedOrder._id,

        items: populatedOrder.items.map(item => ({

            productId: item.product._id,

            name: item.product.name,

            image: item.product.image,

            description:
                item.product.description,

            quantity: item.quantity,

            price: item.price

        })),

        totalPrice:
            populatedOrder.totalPrice,

        platformCharge:
            populatedOrder.platformCharge,

        deliveryCharge:
            populatedOrder.deliveryCharge,

        finalAmount:
            populatedOrder.finalAmount,

        paymentMethod:
            populatedOrder.paymentMethod,

        paymentStatus:
            populatedOrder.paymentStatus,

        orderStatus:
            populatedOrder.orderStatus,

        expectedDelivery:
            populatedOrder.expectedDelivery,

        createdAt:
            populatedOrder.createdAt

    };
    for (const item of cart.items) {
    await Product.findByIdAndUpdate(
        item.product._id,
        {
            $inc: {
                stock: -item.quantity
            }
        }
    );
}

    return res.status(201).json(

        new apiResponse(
            201,
            response,
            "Order placed successfully"
        )
    );
});

// Get current user's orders
export const getMyOrders = asyncHandler(async (req, res) => {

    const orders = await Order.find({
        customer: req.user._id
    })
    .populate("items.product")
    .sort({ createdAt: -1 });

    const response = orders.map(order => ({

        orderId: order._id,

        items: order.items.map(item => ({

            _id: item._id,

            productId: item.product?._id,

            name: item.product?.name,

            image: item.product?.image || [],

            description: item.product?.description,

            price: item.price,

            quantity: item.quantity

        })),

        totalPrice: order.totalPrice,

        platformCharge: order.platformCharge,

        deliveryCharge: order.deliveryCharge,

        finalAmount: order.finalAmount,

        paymentMethod: order.paymentMethod,

        paymentStatus: order.paymentStatus,

        orderStatus: order.orderStatus,

        expectedDelivery: order.expectedDelivery,

        createdAt: order.createdAt

    }));

    return res.status(200).json(
        new apiResponse(
            200,
            response,
            "User orders fetched successfully"
        )
    );
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