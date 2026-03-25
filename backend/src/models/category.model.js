import mongoose from 'mongoose'

const categorySchemea = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
}, {timestamps: true});


export const Category = new mongoose.model("Category", categorySchemea);