import { Cart } from '../models/cart.model.js';
import asyncHandler from '../utils/asyncHandler.js'


export const addToCart = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const {productId} = req.body;

    let cart = await Cart.findOne({owner: userId});

    // IF not cart
    if(!cart) {
        cart = await Cart.create({
            owner: userId,
            items: [{product: productId, quantity: 1}]
        })
        return res.json(cart)
    }

    // Check product exist or not
    const existingItem = cart.items.find(
        item => item.product.toString() === productId
    );

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.items.push({product: productId, quantity: 1})
    }
    await cart.save()

    res.json(cart)
})


export const decreaseQty = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const {productId} = req.body;

    const cart = await Cart.findOne({owner: userId})
    const items = cart.items.find(
        i => i.product.toString() === productId
    )
    
    if(item){
        item.quantity -= 1;

        if(item.quantity <= 0){
            cart.items = cart.items.filter(i => i.product.toString() !== productId)
        }
    }

    await cart.save()
    res.json(cart)
})


export const removeFromCart = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const {productId} = req.body;

    const cart = await Cart.findOne({owner: userId})

    cart.items = cart.items.filter(item => item.product.toString() != productId)

    await cart.save()
    res.json(cart)
})


export const getCart = asyncHandler(async (req, res) => {
    const cart = await Cart.findOne({owner: req.user._id}).populate("items.product")

    res.json(cart)
})