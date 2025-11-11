import User from "../models/userModel.js";
import jwt from 'jsonwebtoken'
import asyncHandler from '../utils/asyncHandler.js'

const generateToken = (res, id) => {
    const token = jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: '7d'});
    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: "strict",
    })
}

export const register = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) return res.status(400).json({ message: "User already exists" });

  // Role logic: default user, but allow "admin" only if explicitly sent
  let userRole = "user";
  if (role && role.toLowerCase() === "admin") {
    userRole = "admin";
  }

  const user = await User.create({ name, email, password, role: userRole });

  generateToken(res, user._id);
  res.status(201).json({
    message: "User registered successfully",
    user: { name: user.name, email: user.email, role: user.role },
  });
});


export const login = asyncHandler(async(req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if(user && (await user.matchPassword(password))) {
        generateToken(res, user._id);
        res.json({message: "Login successfully"})
    } else {
        res.status(401).json({message: "Invalid credentials"})
    }
})

export const logout = asyncHandler(async (req, res) => {
    res.cookie("token", "", {expires: new Date(0)})
    res.json({message: "Logout successfully"})
})

export const getMyProfile = asyncHandler(async (req, res) => {
  if(!req.user){
    return res.status(401).json({message: "Not authorized"})
  }

  res.json({
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
    role: req.user.role,
    createdAt: req.user.createdAt,
  });
});