import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        trim: true,
    },
    price: {
        type: Number,
        required: true,
    },
    stock: {
        type: Number,
        required: true,
        default: 0,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    images: [
        {
            original: String,
            optimized: String,
            avif: String,
            public_id: String,
        },
    ],
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
    },
    subCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SubCategory",
        required: true,
    }
}, {timestamps: true})

productSchema.index({name: "text", description: "text"});

export const Product = mongoose.model("Product", productSchema)