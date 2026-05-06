import React from 'react'
import useCartActions from '../hooks/useCartActions'
import { AiFillPlusCircle } from 'react-icons/ai'

export default function ProductIncreaseButton({productId}) {
    const {add} = useCartActions()

  return (
    <button onClick={(e) => {
        e.stopPropagation()
        add(productId)
    }}
    className="w-8 h-8 flex items-center justify-center 
                 rounded-full bg-gray-200 hover:bg-gray-300 
                 active:scale-90 transition"
    >
        <AiFillPlusCircle className="text-gray-700 text-lg"  />
    </button>
  )
}
