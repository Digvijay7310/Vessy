import React from 'react'
import { useCart } from '../context/CartContext'
import useCartActions from '../hooks/useCartActions'
import ProductDecreaseButton from './ProductDecreaseButton'
import ProductIncreaseButton from './ProductIncreaseButton'

export default function AddCart({ productId }) {
  const { cart } = useCart()
  const { add } = useCartActions()

  const item = cart.find(i => i.product._id === productId)
  const qty = item?.quantity || 0

  if (qty === 0) {
    return (
      <button
        onClick={(e) => {
          e.stopPropagation()
          add(productId)
        }}
        className="w-full py-1.5 text-sm font-medium 
                   bg-red-500 text-white rounded-md 
                   hover:bg-red-600 active:scale-95 transition"
      >
        Add to Cart
      </button>
    )
  }

  return (
    <div
      className="w-full flex items-center justify-between 
                 bg-white border border-gray-300 
                 rounded-full px-3 py-1 shadow-sm"
    >
      <ProductDecreaseButton productId={productId} />

      <span className="text-sm font-medium text-gray-800">
        {qty}
      </span>

      <ProductIncreaseButton productId={productId} />
    </div>
  )
}