import { Cart } from "../models/cart.model.js";
import { Product } from "../models/product.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import apiError from "../utils/apiError.js";
import apiResponse from "../utils/apiResponse.js";


// ------------------- GET MY CART -------------------
export const getMyCart = asyncHandler(async (req, res) => {
    const cart = await Cart.findOne({ userId: req.user._id })
        .populate("items.productId");

    if (!cart) return res.status(200).json(new apiResponse(200, [], "Cart is empty"));

    res.status(200).json(
        new apiResponse(200, cart, "Cart fetched successfully")
    );
});


// ------------------- ADD TO CART -------------------
export const addToCart = asyncHandler(async (req, res) => {
    const { productId, quantity } = req.body;

    if (!productId) throw new apiError(400, "Product ID is required");

    const product = await Product.findById(productId);
    if (!product) throw new apiError(404, "Product not found");

    let cart = await Cart.findOne({ userId: req.user._id });

    if (!cart) {
        cart = await Cart.create({
            userId: req.user._id,
            items: [{ productId, quantity: quantity || 1 }],
        });
    } else {
        const itemIndex = cart.items.findIndex(
            (item) => item.productId.toString() === productId
        );

        if (itemIndex > -1) {
            cart.items[itemIndex].quantity += quantity || 1;
        } else {
            cart.items.push({ productId, quantity: quantity || 1 });
        }
    }

    await cart.save();

    res.status(200).json(new apiResponse(200, cart, "Product added to cart"));
});


// ------------------- REMOVE FROM CART -------------------
export const removeFromCart = asyncHandler(async (req, res) => {
    const { productId } = req.params;

    let cart = await Cart.findOne({ userId: req.user._id });
    if (!cart) throw new apiError(404, "Cart not found");

    cart.items = cart.items.filter(
        (item) => item.productId.toString() !== productId
    );

    await cart.save();

    res.status(200).json(new apiResponse(200, cart, "Item removed"));
});


// ------------------- INCREASE QUANTITY -------------------
export const increaseQuantity = asyncHandler(async (req, res) => {
    const { productId } = req.params;

    const cart = await Cart.findOne({ userId: req.user._id });
    if (!cart) throw new apiError(404, "Cart not found");

    const item = cart.items.find(
        (i) => i.productId.toString() === productId
    );

    if (!item) throw new apiError(404, "Item not in cart");

    item.quantity += 1;
    await cart.save();

    res.status(200).json(new apiResponse(200, cart, "Quantity increased"));
});


// ------------------- DECREASE QUANTITY -------------------
export const decreaseQuantity = asyncHandler(async (req, res) => {
    const { productId } = req.params;

    const cart = await Cart.findOne({ userId: req.user._id });
    if (!cart) throw new apiError(404, "Cart not found");

    const item = cart.items.find(
        (i) => i.productId.toString() === productId
    );

    if (!item) throw new apiError(404, "Item not in cart");

    if (item.quantity === 1)
        throw new apiError(400, "Minimum quantity is 1");

    item.quantity -= 1;
    await cart.save();

    res.status(200).json(new apiResponse(200, cart, "Quantity decreased"));
});


// ------------------- CLEAR CART -------------------
export const clearCart = asyncHandler(async (req, res) => {
    await Cart.findOneAndDelete({ userId: req.user._id });

    res.status(200).json(
        new apiResponse(200, null, "Cart cleared successfully")
    );
});
