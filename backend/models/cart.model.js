import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer",
        required: true,
    },
    items: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: true,
            },
            quantity: {
                type: Number,
                default: 1,
            }
        }
    ]
}, {timestamps: true})

const Cart = new mongoose.model("Cart", cartSchema)
export {Cart};