import { useEffect, useState, useContext } from "react";
import { getCart, clearCart } from "../api/cartApi";
import { createOrder } from "../api/orderApi";
import { useToast } from "../hooks/useToast";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
    const { toast } = useToast();
    const navigate = useNavigate();

    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(false);
    const [shipping, setShipping] = useState({
        fullName: "",
        address: "",
        city: "",
        postalCode: "",
        country: "",
    });

    useEffect(() => {
        fetchCart();
    }, []);

    const fetchCart = async () => {
        setLoading(true);
        try {
            const res = await getCart();
            setCart(res.data.data);
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to fetch cart");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setShipping({ ...shipping, [e.target.name]: e.target.value });
    };

    const handlePlaceOrder = async () => {
        if (!shipping.fullName || !shipping.address || !shipping.city || !shipping.postalCode || !shipping.country) {
            return toast.error("Please fill in all shipping fields");
        }

        try {
            await createOrder({
                shipping,
                items: cart.items.map((item) => ({
                    productId: item.productId._id,
                    quantity: item.quantity,
                })),
                total: cart.items.reduce((acc, item) => acc + item.quantity * item.productId.price, 0),
            });
            toast.success("Order placed successfully!");
            await clearCart();
            navigate("/orders");
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to place order");
        }
    };

    if (loading) return <p className="text-center mt-10">Loading...</p>;
    if (!cart || cart.items.length === 0) return <p className="text-center mt-10">Your cart is empty</p>;

    const totalPrice = cart.items.reduce((acc, item) => acc + item.quantity * item.productId.price, 0);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">Checkout</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Shipping Form */}
                <div>
                    <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
                    {["fullName", "address", "city", "postalCode", "country"].map((field) => (
                        <div key={field} className="mb-3">
                            <label className="block mb-1 capitalize">{field.replace(/([A-Z])/g, ' $1')}</label>
                            <input
                                type="text"
                                name={field}
                                value={shipping[field]}
                                onChange={handleChange}
                                className="w-full border rounded p-2"
                            />
                        </div>
                    ))}
                </div>

                {/* Order Summary */}
                <div>
                    <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                    <div className="space-y-2 border p-4 rounded">
                        {cart.items.map((item) => (
                            <div key={item.productId._id} className="flex justify-between">
                                <span>{item.productId.title} x {item.quantity}</span>
                                <span>${(item.productId.price * item.quantity).toFixed(2)}</span>
                            </div>
                        ))}
                        <hr className="my-2" />
                        <div className="flex justify-between font-bold">
                            <span>Total</span>
                            <span>${totalPrice.toFixed(2)}</span>
                        </div>
                    </div>

                    <button
                        onClick={handlePlaceOrder}
                        className="mt-4 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
                    >
                        Place Order
                    </button>
                </div>
            </div>
        </div>
    );
}
