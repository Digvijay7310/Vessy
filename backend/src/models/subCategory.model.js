import mongoose from "mongoose";

const subCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
    },
    image: {
        original: String,
        optimized: String,
        avif: String,
        public_id: String,
    }
}, {
    timestamps: true
})

export const SubCategory = mongoose.model("SubCategory", subCategorySchema)