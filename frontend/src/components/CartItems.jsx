import { useState } from "react"
import { CiShoppingCart } from "react-icons/ci"

export default function CartItems() {
  const [num, setNum] = useState(0)

  return (
    <button
      onClick={() => setNum(prev => prev + 1)}
      className="relative flex items-center justify-center bg-white hover:bg-gray-100 transition rounded-full p-2 shadow-sm"
    >
      {/* Cart Icon */}
      <CiShoppingCart className="text-2xl text-gray-700" />

      {/* Badge */}
      {num > 0 && (
        <span className="absolute -top-1 -right-1 text-[10px] bg-red-600 text-white rounded-full min-w-[16px] h-[16px] flex items-center justify-center px-1">
          {num}
        </span>
      )}
    </button>
  )
}