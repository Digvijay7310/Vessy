import React from 'react'
import { CiShoppingCart } from 'react-icons/ci'

export default function CartItems() {
  return (
    <div className="relative cursor-pointer active:scale-95 group">

      {/* Cart Icon */}
      <CiShoppingCart
        className="text-white text-2xl group-hover:scale-110 transition-transform duration-200"
      />

      {/* Badge */}
      <span className="absolute -top-2 -right-2 flex items-center justify-center 
        bg-red-500 text-white text-[10px] font-bold 
        h-5 w-5 rounded-full shadow-md animate-pulse">
        1
      </span>

    </div>
  )
}