import React from 'react'
import useCartActions from '../hooks/useCartActions'
import { IoMdRemoveCircle } from 'react-icons/io'

export default function ProductRemoveButton({ productId }) {
  const { remove } = useCartActions()

  return (
    <button
      onClick={(e) => {
        e.stopPropagation()
        remove(productId)
      }}
      className="px-2 py-1 rounded-4xl font-medium flex items-center justify-center bg-red-500 hover:bg-red-600 text-white"
    >
      Remove
    </button>
  )
}