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
          className="mt-6 bg-black text-white px-6 py-3 rounded-xl hover:opacity-90 transition"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-3 pb-36 space-y-4">

      {/* HEADER */}
      <div className="text-center mb-4">
        <h1 className="text-xl font-bold text-gray-900">My Cart</h1>
        <p className="text-sm text-gray-500 mt-1">
          {cart.length} items in your cart
        </p>
      </div>

      {/* CART ITEMS */}
      <div className="space-y-3">

        {cart.map((item) => (
          <div
            key={item.product._id}
            className="
              flex items-center gap-3

              bg-white
              border border-slate-200/60
              rounded-2xl

              p-3

              shadow-sm
              hover:shadow-md

              transition
            "
          >
            {/* IMAGE */}
            <div
              onClick={() =>
                navigate(`/products/product/${item.product._id}`)
              }
              className="
                w-20 h-20
                bg-slate-50
                rounded-xl
                flex items-center justify-center
                overflow-hidden
                cursor-pointer
                flex-shrink-0
              "
            >
              <img
                src={item.product.image?.[0]}
                alt={item.product.name}
                className="h-full object-contain"
              />
            </div>

            {/* DETAILS */}
            <div className="flex-1 min-w-0">

              <p className="text-sm font-semibold text-slate-800 line-clamp-2">
                {item.product.name}
              </p>

              <p className="text-emerald-600 font-bold mt-1">
                {formatPrice(item.product.price)}
              </p>

              {/* ACTION ROW */}
              <div className="flex items-center justify-between mt-3">

                {/* QUANTITY */}
                <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden">
                  <ProductDecreaseButton productId={item.product._id} />

                  <span className="px-3 text-sm font-semibold">
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
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">

          <div>
            <p className="text-xs text-gray-500">Total</p>
            <h2 className="text-xl font-bold text-emerald-600">
              {formatPrice(totalPrice)}
            </h2>
          </div>

          <button
            onClick={() => navigate("/checkout")}
            className="
              bg-black text-white
              px-6 py-3
              rounded-xl
              font-semibold
              hover:opacity-90
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