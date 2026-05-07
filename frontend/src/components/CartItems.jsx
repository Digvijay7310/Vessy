import React from 'react'
import { CiShoppingCart } from 'react-icons/ci'
import { useCart } from '../context/CartContext'
import { useNavigate } from 'react-router-dom'

export default function CartItems() {

  const {cart} = useCart()
  const navigate = useNavigate()

  const totalItems = cart.length
  return (
    <div onClick={() => navigate("/my-cart")} className="relative cursor-pointer active:scale-95 group">

      {/* Cart Icon */}
      <CiShoppingCart
        className="text-2xl group-hover:scale-110 transition-transform duration-200"
      />

      {/* Badge */}
      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] h-5 w-5 flex items-center justify-center rounded-full">
        {totalItems}
      </span>

    </div>
  )
}