import mongoose from "mongoose";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const userSchema = mongoose.Schema({
    fullName: {
        type: String, 
        min: 3,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    role: {
        type: String,
        default: "user",
    },
    isBlocked: {
        type: Boolean,
        default: false
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    address: [
        {
            street: String,
            city: String,
            pinCode: Number,
            country: String
        }
    ],
    phone: {
        type: String,
        required: true,
    },
    cart: [
        {
            product: {type: mongoose.Schema.Types.ObjectId, ref: "Product"},
            quantity: {type: Number, default: 1}
        }
    ],
    wishlist: [
        {type: mongoose.Schema.Types.ObjectId, ref: "Product"}
    ]
}, {timestamps: true})

userSchema.pre("save", async function(next){
    if(!this.isModified("password")) return next()

    this.password = await bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.isPasswordCorrect = async function(password) {
    return bcrypt.compare(password, this.password)
}


userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

userSchema.index({email: "text", fullName: "text"})

export const User = mongoose.model("User", userSchema)