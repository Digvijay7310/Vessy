import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {type: String, required: true},
    description: String,
    price: {type: Number, required: true},
    category: String,
    image: {
        public_id: String,
        url: String,
    }
}, {timestamps: true})

const Product = new mongoose.model("Product", productSchema)

export default Product