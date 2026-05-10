import mongoose from "mongoose";


const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxLength: 200,
    },
    image: [
        {type: String},
    ],
    price: {
        type: Number,
        required: true,
        default: 99
    },
    description: {
        type: String
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
    },
    subCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SubCategory",
        required: true,
    },
    stock: {
        type: Number,
        default: 100,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Admin",
        required: true,
    },
}, {timestamps: true})



const Product = new mongoose.model("Product", productSchema)
export {Product}