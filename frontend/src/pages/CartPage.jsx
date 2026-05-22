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
        <p className="text-gray-500 animate-pulse">
          Loading...
        </p>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="h-[70vh] flex flex-col items-center justify-center">

        <FiShoppingBag className="text-6xl text-gray-300" />

        <h2 className="mt-4 text-2xl font-bold">
          Cart is Empty
        </h2>

        <button
          onClick={() => navigate("/")}
          className="
            mt-5 bg-black text-white
            px-5 py-2 rounded-full
          "
        >
          Shop Now
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-5 pb-28">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-5">

        <div>
          <h1 className="text-2xl font-bold">
            My Cart
          </h1>

          <p className="text-sm text-gray-500">
            {cart.length} Items
          </p>
        </div>

        <div className="text-green-600 font-semibold">
          Free Delivery
        </div>
      </div>

      {/* ITEMS */}
      <div className="space-y-4">

        {cart.map((item) => (

          <div
            key={item.product._id}
            className="
              flex gap-4
              bg-white border
              rounded-2xl p-4
              shadow-sm
            "
          >

            {/* IMAGE */}
            <img
              src={item.product.image?.[0]}
              alt={item.product.name}
              className="
                h-24 w-24
                object-contain
                bg-gray-100
                rounded-xl p-2
              "
            />

            {/* INFO */}
            <div className="flex-1">

              <h2 className="font-semibold line-clamp-2">
                {item.product.name}
              </h2>

              <p className="text-green-600 font-bold mt-2">
                {formatPrice(item.product.price)}
              </p>

              {/* ACTIONS */}
              <div className="flex items-center justify-between mt-4">

                <div
                  className="
                    flex items-center gap-3
                    border rounded-full
                    px-3 py-1
                  "
                >

                  <ProductDecreaseButton
                    productId={item.product._id}
                  />

                  <span className="font-semibold">
                    {item.quantity}
                  </span>

                  <ProductIncreaseButton
                    productId={item.product._id}
                  />
                </div>

                <ProductRemoveButton
                  productId={item.product._id}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CHECKOUT BAR */}
      <div
        className="
          fixed bottom-0 left-0 right-0
          bg-white border-t
          px-4 py-4
        "
      >

        <div
          className="
            max-w-4xl mx-auto
            flex items-center justify-between
          "
        >

          <div>
            <p className="text-xs text-gray-500">
              Total
            </p>

            <h2 className="text-2xl font-bold text-green-600">
              {formatPrice(totalPrice)}
            </h2>
          </div>

          <button
            onClick={() => navigate("/checkout")}
            className="
              bg-black text-white
              px-6 py-3 rounded-xl
              font-semibold
            "
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}