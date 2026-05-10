import React, { useState } from "react";
import { useCart } from "../../context/CartContext";
import axiosInstance from "../../utils/axiosInstance";

export default function CheckoutPage() {
  const { cart } = useCart();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const formatPrice = (price) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);

  const handleCheckout = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axiosInstance.post("/orders/checkout");
      setOrder(res.data.data);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (!order) {
    // Before checkout
    return (
      <div className="max-w-5xl mx-auto px-4 py-6">
        <h2 className="text-2xl font-bold mb-4">Checkout</h2>
        {cart.length === 0 ? (
          <p className="text-gray-500">Your cart is empty</p>
        ) : (
          <>
            {/* Cart Items Preview */}
            <div className="flex flex-col gap-4 mb-6">
              {cart.map((item, idx) => (
                <div
                  key={item.product._id}
                  className="flex justify-between items-center p-4 border rounded-lg"
                >
                  <div className="flex gap-4 items-center">
                    <img
                      src={item.product.image?.[0]}
                      alt={item.product.name}
                      
                      className="h-20 w-20 object-contain rounded-lg bg-gray-100 p-1"
                    />
                    <div>
                      <p className="font-semibold">{item.product.name}</p>
                      <p className="text-green-600">
                        {formatPrice(item.product.price)} x {item.quantity}
                      </p>
                    </div>
                  </div>
                  <p className="font-semibold">
                    {formatPrice(item.product.price * item.quantity)}
                  </p>
                </div>
              ))}
            </div>

            {/* Place Order Button */}
            <button
              onClick={handleCheckout}
              className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 active:scale-95 transition"
              disabled={loading}
            >
              {loading ? "Processing..." : "Proceed to Pay"}
            </button>
            {error && <p className="text-red-500 mt-2">{error}</p>}
          </>
        )}
      </div>
    );
  }

  // After checkout
  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-4 text-green-700">
        Order Placed Successfully!
      </h2>
      <p className="text-gray-600 mb-4">Order ID: {order._id}</p>

      {/* Ordered Items */}
      <div className="flex flex-col gap-4 mb-6">
        {order.items.map((item) => (
          <div
            key={item.product._id}
            className="flex justify-between items-center p-4 border rounded-lg"
          >
            <div className="flex gap-4 items-center">
              <img
                src={item.product.image?.[0]}
                alt={item.product.name}
                className="h-20 w-20 object-contain rounded-lg bg-gray-100 p-1"
              />
              <div>
                <p className="font-semibold">{item.product.name}</p>
                <p className="text-green-600">
                  {formatPrice(item.price)} x {item.quantity}
                </p>
              </div>
            </div>
            <p className="font-semibold">
              {formatPrice(item.price * item.quantity)}
            </p>
          </div>
        ))}
      </div>

      {/* Charges */}
      <div className="p-4 border rounded-lg bg-gray-50">
        <div className="flex justify-between mb-2">
          <span>Subtotal</span>
          <span>{formatPrice(order.totalPrice)}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Platform Charge</span>
          <span>{formatPrice(order.platformCharge)}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Delivery Charge</span>
          <span>{formatPrice(order.deliveryCharge)}</span>
        </div>
        <div className="flex justify-between font-bold text-green-700 text-lg mt-2">
          <span>Total Amount</span>
          <span>{formatPrice(order.finalAmount)}</span>
        </div>
      </div>
    </div>
  );
}