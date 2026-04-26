import { useState } from "react"
import { CiShoppingCart } from "react-icons/ci"
import { useCart } from "../context/CartContext"
import { useNavigate } from "react-router-dom"

export default function CartItems() {
  const {cart} = useCart()
  const navigate = useNavigate()

  const totalItems = cart?.items?.reduce(
    (acc, item) => acc + item.quantity,
    0
  ) || 0

  return (
    <button
      onClick={() => navigate("/cart")}
      className="relative flex items-center justify-center bg-white hover:bg-gray-100 transition rounded-full p-1 shadow-sm"
    >
      {/* Cart Icon */}
      <CiShoppingCart className="text-2xl text-gray-700" />

      {/* Badge */}
      {totalItems > 0 && (
        <span className="absolute -top-1 -right-1 text-[10px] bg-red-600 text-white rounded-full min-w-[16px] h-[16px] flex items-center justify-center px-1">
          {totalItems}
        </span>
      )}
    </button>
  )
}