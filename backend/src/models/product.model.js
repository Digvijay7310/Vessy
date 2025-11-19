import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 3,
        index: true,
        trim: true,
    },
    price: {
        type: Number,
        requyired: true,
        default: 9,
    },
    description: {
        type: String,
        required: true,
        min: 3,
        index: true,
        trim: true,
    },
    images: [
        {
            type: String,
            required: true,
            min: 1,
        },
    ],
    category: [
        {type: String, required: true, min: 1, default: 'All'}
    ],
}, {timestamps: true})

productSchema.index({name: 'true', category: 'true', description: 'true'})

export const Product = mongoose.model("Product", productSchema)