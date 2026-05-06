import React from 'react'
import useCartActions from '../hooks/useCartActions'
import { AiFillMinusCircle } from 'react-icons/ai'

export default function ProductDecreaseButton({ productId }) {
  const { decrease } = useCartActions()

  return (
    <button
      onClick={(e) => {
        e.stopPropagation()
        decrease(productId)
      }}
      className="w-8 h-8 flex items-center justify-center 
                 rounded-full bg-gray-200 hover:bg-gray-300 
                 active:scale-90 transition"
    >
      <AiFillMinusCircle className="text-gray-700 text-lg" />
    </button>
  )
}