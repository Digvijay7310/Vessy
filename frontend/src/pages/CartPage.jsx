import React from "react";
import { useCart } from "../context/CartContext";
import { FaBeerMugEmpty } from "react-icons/fa6";
import ProductDecreaseButton from "../components/ProductDecreaseButton";
import ProductIncreaseButton from "../components/ProductIncreaseButton";
import ProductRemoveButton from "../components/ProductRemoveButton";
import { useNavigate } from "react-router-dom";
import { AiFillShopping } from "react-icons/ai";

export default function CartPage() {
  const { cart } = useCart();

  const navigate = useNavigate()

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.quantity * item.product.price,
    0
  );

  const formatPrice = (price) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center mt-24 text-gray-500">
        <FaBeerMugEmpty className="text-6xl mb-4 opacity-60" />
        <p className="text-lg font-semibold">Your cart is empty</p>
        <p className="text-sm text-gray-400 mt-1">
          Add items to see them here
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">

      {/* HEADER */}
      <h2 className="text-xl md:text-2xl font-semibold mb-6">
        Shopping Cart
      </h2>

      {/* CART ITEMS */}
      <div className="flex flex-col gap-4">
        {cart.map((item) => (
          <div
            key={item.product._id}
            className="
              bg-white border rounded-xl shadow-sm
              p-4 flex flex-col md:flex-row md:items-center
              justify-between gap-4
              hover:shadow-md transition
            "
          >
            {/* LEFT SIDE */}
            <div className="flex gap-4 items-center">
              <img
                src={item.product.image?.[0]}
                alt={item.product.name}
                className="
                  h-20 w-20 object-contain
                  bg-gray-100 rounded-lg p-1
                "
              />

              <div>
                <p className="text-sm font-medium line-clamp-2 max-w-xs">{item.product.name}</p>

                <p className="text-green-600 font-semibold mt-1 text-sm">{formatPrice(item.product.price)}</p>
              </div>
            </div>

            {/* RIGHT SIDE CONTROLS */}
            <div className="flex items-center justify-between md:justify-end gap-4">

              {/* Quantity Controls */}
              <div className="flex items-center gap-3 border rounded-full px-3 py-1">
                <ProductDecreaseButton productId={item.product._id} />

                <span className="text-sm font-semibold w-5 text-center">{item.quantity}</span>

                <ProductIncreaseButton productId={item.product._id} />
              </div>

              {/* Remove */}
              <ProductRemoveButton productId={item.product._id} />
            </div>
          </div>
        ))}
      </div>

      {/* STICKY CHECKOUT BAR */}
      <div
        className="
          mt-8 sticky bottom-0
          bg-white border-t shadow-lg
          p-4 flex items-center justify-between
        "
      >
        <div>
          <p className="text-xs text-gray-500">Total Amount</p>
          <p className="text-xl font-bold text-green-600">
            {formatPrice(totalPrice)}
          </p>
        </div>

        <button
        onClick={() => navigate("/checkout")}
          className="
            bg-green-600 text-white
            px-6 py-2 rounded-lg
            font-semibold
            hover:bg-green-700
            active:scale-95
            transition
          "
        >
          Place Order
        </button>
      </div>

    </div>
  );
}