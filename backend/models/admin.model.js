import mongoose from "mongoose"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const adminSchemea = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["admin"],
        default: "admin"
    },
    refreshToken: {
        type: String,
    },
}, {timestamps: true});



adminSchemea.pre("save", async function() {
    if(!this.isModified('password')) return;

    this.password = await bcrypt.hash(this.password, 10);
})

adminSchemea.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

adminSchemea.methods.generateAccessToken = function() {
    return jwt.sign(
        {id: this._id, role: this.role},
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: '1d'}
    )
}

adminSchemea.methods.generateRefreshToken = function(){
    return jwt.sign(
        {id: this._id},
        process.env.REFRESH_TOKEN_SECRET,
        {expiresIn: '7d'}
    )
}


const Admin = mongoose.model("Admin", adminSchemea)
export {Admin}