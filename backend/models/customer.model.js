import mongoose from 'mongoose'
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'

const customerSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["admin", "users"],
        default: "users",
    },
}, {timestamps: true})


customerSchema.pre("save", async function(next) {
    if(!this.isModified("password")) return next

    this.password = await bcrypt.hash(this.password, 10)
    next()
})

customerSchema.methods.matchedPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password)
}


customerSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        { id: this._id, role: this.role },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "1d" }
    );
};

customerSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        { id: this._id },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "7d" }
    );
};

const Customer = mongoose.model("Customer", customerSchema);
export {Customer}