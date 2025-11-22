import { useEffect, useState, useContext } from "react";
import { getCart, addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart } from "../api/cartApi";
import {  useToast } from "../hooks/useToast";
import { useNavigate } from "react-router-dom";

export default function Cart() {
    const { toast } = useToast();
    const navigate = useNavigate();
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchCart();
    }, []);

    const fetchCart = async () => {
        setLoading(true);
        try {
            const res = await getCart();
            setCart(res.data.data);
        } catch (error) {
            console.error(error);
            toast.error(error?.response?.data?.message || "Failed to fetch cart");
        } finally {
            setLoading(false);
        }
    };

    const handleIncrease = async (productId) => {
        try {
            await increaseQuantity(productId);
            toast.success("Quantity increased");
            fetchCart();
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to update quantity");
        }
    };

    const handleDecrease = async (productId) => {
        try {
            await decreaseQuantity(productId);
            toast.success("Quantity decreased");
            fetchCart();
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to update quantity");
        }
    };

    const handleRemove = async (productId) => {
        try {
            await removeFromCart(productId);
            toast.success("Item removed");
            fetchCart();
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to remove item");
        }
    };

    const handleClearCart = async () => {
        try {
            await clearCart();
            toast.success("Cart cleared");
            setCart(null);
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to clear cart");
        }
    };

    const handleCheckout = () => {
        navigate("/checkout");
    };

    if (loading) return <p className="text-center mt-10">Loading...</p>;
    if (!cart || cart.items.length === 0) return <p className="text-center mt-10">Your cart is empty</p>;

    const totalPrice = cart.items.reduce((acc, item) => acc + item.quantity * item.productId.price, 0);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">My Cart</h1>

            <div className="space-y-4">
                {cart.items.map((item) => (
                    <div key={item.productId._id} className="flex items-center justify-between p-4 border rounded">
                        <div className="flex items-center gap-4">
                            <img src={item.productId.images[0]} alt={item.productId.title} className="w-20 h-20 object-cover rounded" />
                            <div>
                                <h2 className="font-semibold">{item.productId.title}</h2>
                                <p>${item.productId.price}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <button onClick={() => handleDecrease(item.productId._id)} className="px-2 py-1 border">-</button>
                            <span>{item.quantity}</span>
                            <button onClick={() => handleIncrease(item.productId._id)} className="px-2 py-1 border">+</button>
                        </div>

                        <button onClick={() => handleRemove(item.productId._id)} className="text-red-600 hover:underline">Remove</button>
                    </div>
                ))}
            </div>

            <div className="mt-6 flex justify-between items-center">
                <p className="text-xl font-bold">Total: ${totalPrice.toFixed(2)}</p>
                <div className="flex gap-4">
                    <button onClick={handleClearCart} className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">Clear Cart</button>
                    <button onClick={handleCheckout} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">Checkout</button>
                </div>
            </div>
        </div>
    );
}
