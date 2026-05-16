import { Cart } from '../models/cart.model.js';
import asyncHandler from '../utils/asyncHandler.js'


export const addToCart = asyncHandler(async (req, res) => {
    const userId = req.user._id
    const { productId } = req.body

    const product = await Product.findById(productId);

if (!product || product.stock <= 0) {
    return res.status(400).json({
        message: "Product out of stock"
    });
}

    let cart = await Cart.findOne({ owner: userId })

    if (!cart) {
        cart = await Cart.create({
            owner: userId,
            items: [{ product: productId, quantity: 1 }]
        })
        return res.json(cart)
    }

    const existingItem = cart.items.find(
        item => item.product.toString() === productId
    )

    if (existingItem) {
        existingItem.quantity += 1
    } else {
        cart.items.push({ product: productId, quantity: 1 })
    }

    await cart.save()
    res.json(cart)
})


export const decreaseQty = asyncHandler(async (req, res) => {
    const userId = req.user._id
    const { productId } = req.body

    const cart = await Cart.findOne({ owner: userId })

    if (!cart) {
        return res.status(404).json({ message: "Cart not found" })
    }

    const item = cart.items.find(
        i => i.product.toString() === productId
    )

    if (!item) {
        return res.status(404).json({ message: "Item not found" })
    }

    item.quantity -= 1

    if (item.quantity <= 0) {
        cart.items = cart.items.filter(
            i => i.product.toString() !== productId
        )
    }

    await cart.save()
    res.json(cart)
})


export const removeFromCart = asyncHandler(async (req, res) => {
    const userId = req.user._id
    const { productId } = req.body

    const cart = await Cart.findOne({ owner: userId })

    if (!cart) {
        return res.status(404).json({ message: "Cart not found" })
    }

    cart.items = cart.items.filter(
        item => item.product.toString() !== productId
    )

    await cart.save()
    res.json(cart)
})


export const getCart = asyncHandler(async (req, res) => {
    const cart = await Cart.findOne({ owner: req.user._id })
        .populate("items.product")

    if (!cart) {
        return res.json({ items: [] })
    }

    res.json(cart)
})