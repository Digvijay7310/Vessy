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
        <p className="text-gray-500 animate-pulse">Loading...</p>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="h-[70vh] flex flex-col items-center justify-center text-center px-4">
        <FiShoppingBag className="text-7xl text-gray-300" />

        <h2 className="mt-4 text-2xl font-bold text-gray-800">
          Your Cart is Empty
        </h2>

        <p className="text-gray-500 mt-1">
          Looks like you haven’t added anything yet
        </p>

        <button
          onClick={() => navigate("/")}
          className="mt-6 bg-black hover:bg-gray-800 text-white px-6 py-3 rounded-xl transition"
        >
          Shop Now
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 pb-32">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            My Cart
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            {cart.length} {cart.length === 1 ? "Item" : "Items"}
          </p>
        </div>
      </div>

      {/* CART ITEMS */}
      <div className="space-y-4">
        {cart.map((item) => (
          <div
            key={item.product._id}
            className="
              flex gap-4
              bg-white border
              rounded-2xl p-4
              shadow-sm
              hover:shadow-md
              transition
            "
          >

            {/* IMAGE */}
            <div className="bg-gray-50 rounded-xl">
              <img
                src={item.product.image?.[0]}
                alt={item.product.name}
                className="h-20 w-20 object-contain"
              />
            </div>

            {/* DETAILS */}
            <div className="flex-1">

              <h2 className="font-semibold text-gray-800 line-clamp-2">
                {item.product.name}
              </h2>

              <p className="text-green-600 font-bold mt-2">
                {formatPrice(item.product.price)}
              </p>

              {/* ACTIONS */}
              <div className="flex items-center justify-between mt-4">

                {/* Quantity Controls */}
                <div className="flex items-center border rounded-xl overflow-hidden">
                  <ProductDecreaseButton productId={item.product._id} />

                  <span className="px-4 font-semibold text-gray-800">
                    {item.quantity}
                  </span>

                  <ProductIncreaseButton productId={item.product._id} />
                </div>

                {/* Remove */}
                <ProductRemoveButton productId={item.product._id} />
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* CHECKOUT BAR */}
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
              bg-black hover:bg-gray-800
              text-white px-6 py-3
              rounded-xl font-semibold
              transition
            "
          >
            Checkout
          </button>

        </div>
      </div>

    </div>
  );
}