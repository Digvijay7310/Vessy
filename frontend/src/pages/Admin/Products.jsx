import React from "react";
import { addToCart, increaseQuantity, decreaseQuantity, removeFromCart } from "../../api/cartApi";
import { useToast } from "../../hooks/useToast";

export default function ProductCard({ product, cartItems, setCartItems }) {
  const { toast } = useToast();

  const cartItem = cartItems?.items?.find(item => item.productId._id === product._id);

  const handleAddToCart = async () => {
    try {
      const res = await addToCart({ productId: product._id, quantity: 1 });
      setCartItems(res.data.data);
      toast.success("Added to cart!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add to cart");
    }
  };

  const handleIncrease = async () => {
    try {
      const res = await increaseQuantity(product._id);
      setCartItems(res.data.data);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to increase quantity");
    }
  };

  const handleDecrease = async () => {
    try {
      const res = await decreaseQuantity(product._id);
      setCartItems(res.data.data);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to decrease quantity");
    }
  };

  const handleRemove = async () => {
    try {
      const res = await removeFromCart(product._id);
      setCartItems(res.data.data);
      toast.success("Removed from cart!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to remove");
    }
  };

  return (
    <div className="border p-4 rounded shadow">
      <img src={product.images?.[0]} alt={product.name} className="h-40 w-full object-cover mb-2" />
      <h2 className="font-bold">{product.name}</h2>
      <p>${product.price}</p>

      {cartItem ? (
        <div className="flex items-center gap-2 mt-2">
          <button onClick={handleDecrease} className="bg-gray-300 px-2 rounded">-</button>
          <span>{cartItem.quantity}</span>
          <button onClick={handleIncrease} className="bg-gray-300 px-2 rounded">+</button>
          <button onClick={handleRemove} className="bg-red-500 px-2 text-white rounded">Remove</button>
        </div>
      ) : (
        <button onClick={handleAddToCart} className="mt-2 bg-blue-600 text-white px-4 py-1 rounded">
          Add to Cart
        </button>
      )}
    </div>
  );
}
