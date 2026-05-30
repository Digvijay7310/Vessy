import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer",
        required: true
    },
    shippingAddress: [{
        name: String,
        phone: String,
        street: String,
        city: String,
        state: String,
        pincode: String,
        isDefault: {
            type: Boolean,
            default: false
        }
    }],

    items: [
        {

            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: true
            },

            quantity: {
                type: Number,
                required: true,
                default: 1
            },

            price: {
                type: Number,
                required: true
            }

        }
    ],

    // PRICE DETAILS

    totalPrice: {
        type: Number,
        required: true
    },

    platformCharge: {
        type: Number,
        required: true,
        default: 0
    },

    deliveryCharge: {
        type: Number,
        required: true,
        default: 0
    },

    finalAmount: {
        type: Number,
        required: true
    },

    // PAYMENT

    paymentMethod: {
        type: String,

        enum: [
            "COD",
            "UPI",
            "CARD",
            "NET_BANKING"
        ],

        default: "COD"
    },

    paymentStatus: {
        type: String,

        enum: [
            "Pending",
            "Paid",
            "Failed",
            "Refunded"
        ],

        default: "Pending"
    },

    // ORDER STATUS

    orderStatus: {
        type: String,

        enum: [
            "Pending",
            "Confirmed",
            "Processing",
            "Shipped",
            "Out for Delivery",
            "Delivered",
            "Cancelled",
            "Returned"
        ],

        default: "Pending"
    },

    // DELIVERY DATE

    expectedDelivery: {
        type: Date
    },

    deliveredAt: {
        type: Date
    },

    cancelledAt: {
        type: Date
    }

},
{
    timestamps: true
});

const Order = mongoose.model(
    "Order",
    orderSchema
);

export { Order };