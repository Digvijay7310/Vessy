import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer",
        required: true,
    },
    cartItem: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
    },
    quantity: {
        type: Number,
        required: true,
    },
}, {timestamps: true})

const Cart = new mongoose.model("Cart", cartSchema)
export {Cart};