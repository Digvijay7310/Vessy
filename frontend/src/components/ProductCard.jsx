import React, { useState } from "react";
import { addToCart, increaseQuantity, decreaseQuantity } from "../api/cartApi";
import { useToast } from "../hooks/useToast";

export default function ProductCard({ product, cart, setCart, isAdmin }) {
  const { toast } = useToast();
  const cartItem = cart.items.find((i) => i.productId === product._id);
  const [quantity, setQuantity] = useState(cartItem ? cartItem.quantity : 1);

  const handleAddToCart = async () => {
    try {
      const res = await addToCart({ productId: product._id, quantity });
      setCart(res.data.data); // update cart state
      toast.success("Product added to cart");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to add to cart");
    }
  };

  const handleIncrease = async () => {
    try {
      const res = await increaseQuantity(product._id);
      setCart(res.data.data);
      setQuantity((q) => q + 1);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to increase quantity");
    }
  };

  const handleDecrease = async () => {
    if (quantity === 1) return;
    try {
      const res = await decreaseQuantity(product._id);
      setCart(res.data.data);
      setQuantity((q) => q - 1);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to decrease quantity");
    }
  };

  return (
    <div className="border p-4 rounded">
      <img src={product.images[0]} alt={product.name} className="w-full h-48 object-cover mb-2" />
      <h3 className="font-bold">{product.name}</h3>
      <p>${product.price}</p>

      {cartItem ? (
        <div className="flex items-center gap-2 mt-2">
          <button onClick={handleDecrease} className="px-2 py-1 border">-</button>
          <span>{quantity}</span>
          <button onClick={handleIncrease} className="px-2 py-1 border">+</button>
        </div>
      ) : (
        <button
          onClick={handleAddToCart}
          className="bg-blue-600 text-white px-4 py-2 mt-2 rounded hover:bg-blue-700"
        >
          Add to Cart
        </button>
      )}
    </div>
  );
}
