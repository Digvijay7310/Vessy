import mongoose from "mongoose";
import asyncHandler from "../utils/asyncHandler.js";
import apiResponse from "../utils/apiResponse.js";
import { Cart } from "../models/cart.model.js";
import { Order } from "../models/order.model.js";
import { Customer } from "../models/customer.model.js";
import { Product } from "../models/product.model.js";


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

    const session = await mongoose.startSession();

    try {

        session.startTransaction();

        const { paymentMethod } = req.body;

        if (paymentMethod !== "COD") {
            throw new Error("Only COD allowed for now");
        }

        // GET CUSTOMER
        const customer = await Customer.findById(req.user._id);

        if (!customer) {
            throw new Error("Customer not found");
        }

        // GET DEFAULT ADDRESS
        const defaultAddress = customer.shippingAddresses?.find(
            address => address.isDefault
        );

        if (!defaultAddress) {
            throw new Error("Please add and select a delivery address");
        }

        // GET CART
        const cart = await Cart.findOne({ owner: req.user._id })
            .populate("items.product")
            .session(session);

        if (!cart || cart.items.length === 0) {
            throw new Error("Cart is empty");
        }

        // STOCK CHECK
        for (const item of cart.items) {

            if (!item.product) {
                throw new Error("Product not found in cart");
            }

            if (item.quantity > item.product.stock) {
                throw new Error(
                    `${item.product.name} is out of stock`
                );
            }

        }

        // PRICE CALCULATION
        const totalPrice = cart.items.reduce(
            (acc, item) =>
                acc + item.product.price * item.quantity,
            0
        );

        const platformCharge = 10;
        const deliveryCharge = totalPrice < 199 ? 60 : 0;
        const finalAmount =
            totalPrice + platformCharge + deliveryCharge;

        // ORDER ITEMS
        const orderItems = cart.items.map(item => ({
            product: item.product._id,
            quantity: item.quantity,
            price: item.product.price
        }));

        // DELIVERY DATE
        const expectedDelivery = new Date();
        expectedDelivery.setDate(expectedDelivery.getDate() + 7);

        // CREATE ORDER
        const [order] = await Order.create(
            [
                {
                    customer: req.user._id,

                    shippingAddress: {
                        name: defaultAddress.name,
                        phone: defaultAddress.phone,
                        street: defaultAddress.street,
                        city: defaultAddress.city,
                        state: defaultAddress.state,
                        pincode: defaultAddress.pincode
                    },

                    items: orderItems,

                    totalPrice,
                    platformCharge,
                    deliveryCharge,
                    finalAmount,

                    paymentMethod: "COD",
                    paymentStatus: "Pending",
                    orderStatus: "Pending",

                    expectedDelivery
                }
            ],
            { session }
        );

        // UPDATE STOCK
        for (const item of cart.items) {

            await Product.findByIdAndUpdate(
                item.product._id,
                {
                    $inc: { stock: -item.quantity }
                },
                { session }
            );

        }

        // CLEAR CART
        await Cart.findOneAndUpdate(
            { owner: req.user._id },
            { $set: { items: [] } },
            { session }
        );

        await session.commitTransaction();

        session.endSession();

        const populatedOrder = await Order.findById(order._id)
            .populate("items.product");

        return res.status(201).json(
            new apiResponse(
                201,
                populatedOrder,
                "Order placed successfully"
            )
        );

    } catch (error) {

        await session.abortTransaction();

        session.endSession();

        return res.status(400).json({
            success: false,
            message: error.message
        });

    }

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
    const order = await Order.findOne({ _id: orderId, customer: req.user._id }).populate("items.product")

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


export const addAddress = asyncHandler(async (req, res) => {

```
const user = await Customer.findById(req.user._id);

if (!user) {
    throw new apiError(404, "User not found");
}

const newAddress = req.body;

if (user.shippingAddresses.length === 0) {
    newAddress.isDefault = true;
}

if (newAddress.isDefault) {
    user.shippingAddresses.forEach(addr => {
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
```

});



export const getAddresses = asyncHandler(async (req, res) => {

```
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
```

});

export const setDefaultAddress = asyncHandler(async (req, res) => {

```
const user = await Customer.findById(req.user._id);

if (!user) {
    throw new apiError(404, "User not found");
}

user.shippingAddresses.forEach(addr => {

    addr.isDefault =
        addr._id.toString() === req.params.id;

});

await user.save();

return res.status(200).json(
    new apiResponse(
        200,
        user.shippingAddresses,
        "Default address updated"
    )
);
```

});


// Admin: All Orders
export const getAllOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find().populate('customer').populate('items.product');
    return res.status(200).json(
        new apiResponse(200, orders, "All orders fetched successfully")
    );
});