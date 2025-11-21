import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 3,
        index: true,
        trim: true,
    },
    price: {
        type: Number,
        required: true,
        default: 9,
    },
    description: {
        type: String,
        required: true,
        minLength: 3,
        index: true,
        trim: true,
    },
    images: [
        {
            type: String,
            required: true,
            minLength: 1,
        },
    ],
    category: [
        {type: String, required: true, min: 1, default: 'All'}
    ],
}, {timestamps: true})

productSchema.index({name: 1, category: 1, description: 1})

export const Product = mongoose.model("Product", productSchema)