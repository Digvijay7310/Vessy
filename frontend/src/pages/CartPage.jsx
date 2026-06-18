import React from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

import ProductDecreaseButton from "../components/ProductDecreaseButton";
import ProductIncreaseButton from "../components/ProductIncreaseButton";
import ProductRemoveButton from "../components/ProductRemoveButton";

import { FiShoppingBag } from "react-icons/fi";

export default function CartPage() {
  const { cart, totalPrice, loading } = useCart();
  const navigate = useNavigate();

  const formatPrice = (price) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);

  if (loading) {
    return (
      <div className="h-[60vh] flex items-center justify-center">
        <p className="text-gray-500 animate-pulse">Loading your cart...</p>
      </div>
    );
  }

  if (!cart || cart.length === 0) {
    return (
      <div className="h-[75vh] flex flex-col items-center justify-center text-center px-4">
        <FiShoppingBag className="text-7xl text-gray-200" />

        <h2 className="mt-4 text-2xl font-bold text-gray-800">
          Your cart is empty
        </h2>

        <p className="text-gray-500 mt-1">
          Add something you love to get started
        </p>

        <button
          onClick={() => navigate("/")}
          className="mt-6 bg-gradient-to-r from-black to-gray-800 text-white px-6 py-3 rounded-xl hover:opacity-90 transition"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 pb-40">

      {/* HEADER */}
      <div className="text-center">
        <h1 className="text-xl font-bold text-gray-900">
          My Cart
        </h1>

        <p className="text-sm text-gray-500 mt-1">
          {cart.length} {cart.length === 1 ? "Item" : "Items"} in your cart
        </p>
      </div>

      {/* CART LIST */}
      <div className="space-y-4">

        {cart.map((item) => (
          <div
            key={item.product._id}
            className="
              flex gap-4
              bg-white
              border border-gray-100
              rounded-2xl
              p-4
              shadow-sm
              hover:shadow-md
              transition
            "
          >

            {/* IMAGE */}
            <div className="w-24 h-24 flex items-center justify-center bg-gray-50 rounded-xl overflow-hidden shrink-0">
              <img
                src={item.product.image?.[0]}
                alt={item.product.name}
                className="w-full h-full object-contain"
              />
            </div>

            {/* DETAILS */}
            <div className="flex-1">

              <h2 className="font-semibold text-gray-800 line-clamp-2">
                {item.product.name}
              </h2>

              <p className="text-green-600 font-bold mt-1">
                {formatPrice(item.product.price)}
              </p>

              {/* ACTION ROW */}
              <div className="flex items-center justify-between mt-5">

                {/* QUANTITY */}
                <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
                  <ProductDecreaseButton productId={item.product._id} />

                  <span className="px-4 font-semibold text-gray-800">
                    {item.quantity}
                  </span>

                  <ProductIncreaseButton productId={item.product._id} />
                </div>

                {/* REMOVE */}
                <ProductRemoveButton productId={item.product._id} />

              </div>

            </div>
          </div>
        ))}

      </div>

      {/* STICKY CHECKOUT BAR */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">

          <div>
            <p className="text-xs text-gray-500">
              Total Amount
            </p>

            <h2 className="text-2xl font-bold text-green-600">
              {formatPrice(totalPrice)}
            </h2>
          </div>

          <button
            onClick={() => navigate("/checkout")}
            className="
              bg-gradient-to-r from-black to-gray-800
              text-white px-8 py-3
              rounded-xl font-semibold
              hover:opacity-90 transition
            "
          >
            Checkout
          </button>

        </div>
      </div>

    </div>
  );
}