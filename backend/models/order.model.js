import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer",
        required: true,
    },
    items: [
        {
            product: { 
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product", 
                required: true 
            },
            quantity: { 
                type: Number,
                default: 1
            },
            price: { 
                type: Number, 
                required: true
            }
        }
    ],
    totalPrice: {type: Number, required: true },
    platformCharge: {type: Number, required: true},
    deliveryCharge: {type: Number, required: true},
    finalAmount: {type: Number, required: true},
    paymentMethod : {
        type: String,
        enum: ["COD", "Online"],
        default: "COD",
    },
    paymentStatus: { 
        type: String, 
        enum: ["Pending", "Paid", "Failed"], 
        default: "Pending"
    },
    orderStatus: {
        type: String,
        enum: ["Pending", "Processing", "Shipped","Out of Delivery", "Delivered", "Cancelled"],
        default: "Pending",
    }
}, {timestamps: true});


const Order = mongoose.model("Order", orderSchema)
export {Order};