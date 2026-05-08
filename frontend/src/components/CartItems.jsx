import React from "react";
import { CiShoppingCart } from "react-icons/ci";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function CartItems() {
  const { cart } = useCart();
  const navigate = useNavigate();

  // ✅ FIXED: total quantity instead of array length
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div
      onClick={() => navigate("/my-cart")}
      className="
        relative cursor-pointer
        active:scale-95
        group
      "
    >

      {/* CART ICON */}
      <CiShoppingCart
        className="
          text-2xl text-gray-700
          group-hover:scale-110
          transition-transform duration-200
        "
      />

      {/* BADGE (only show if items exist) */}
      {totalItems > 0 && (
        <span
          className="
            absolute -top-2 -right-2
            bg-red-500 text-white
            text-[10px] font-bold
            h-5 w-5 flex items-center justify-center
            rounded-full
            animate-pulse
          "
        >
          {totalItems}
        </span>
      )}

    </div>
  );
}