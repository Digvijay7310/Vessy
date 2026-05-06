import React from 'react'
import { useCart } from '../context/CartContext'
import { FaBeerMugEmpty } from 'react-icons/fa6'
import ProductDecreaseButton from '../components/ProductDecreaseButton'
import ProductIncreaseButton from '../components/ProductIncreaseButton'
import ProductRemoveButton from '../components/ProductRemoveButton'

export default function CartPage() {
  const { cart } = useCart()

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.quantity * item.product.price,
    0
  )

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center mt-20 text-gray-500">
        <FaBeerMugEmpty className="text-5xl mb-3" />
        <p className="text-lg font-medium">Your cart is empty</p>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-3 md:p-6">
      
      <h2 className="text-lg md:text-xl font-semibold mb-4">
        My Cart
      </h2>

      <div className="flex flex-col gap-4">
        {cart.map((item) => (
          <div
            key={item.product._id}
            className="bg-white rounded-lg shadow-sm border p-3 md:p-4"
          >

            {/* 🔹 Row 1: Image + Info */}
            <div className="flex gap-3">
              <img
                src={item.product.image?.[0]}
                alt={item.product.name}
                className="h-20 w-20 object-contain bg-gray-100 rounded p-1"
              />

              <div className="flex flex-col justify-between">
                <p className="text-sm font-medium line-clamp-2">
                  {item.product.name}
                </p>

                <p className="text-green-600 font-semibold text-sm mt-1">
                  ₹{item.product.price}
                </p>
              </div>
            </div>

            {/* 🔹 Row 2: Buttons */}
            <div className="flex items-center justify-between mt-3 bg-amber-100 rounded-4xl">

              {/* Quantity */}
              <div className="flex items-center gap-3 border rounded-full px-3 py-1">
                <ProductDecreaseButton productId={item.product._id} />
                <span className="text-sm font-medium">
                  {item.quantity}
                </span>
                <ProductIncreaseButton productId={item.product._id} />
              </div>

              {/* Remove */}
              <ProductRemoveButton productId={item.product._id} />
            </div>

          </div>
        ))}
      </div>

      {/* 🔻 Bottom Sticky Section */}
      <div className="mt-6 bg-white border rounded-lg p-4 flex justify-between items-center shadow-sm">
        <div>
          <p className="text-xs text-gray-500">Total</p>
          <p className="text-lg font-bold text-green-600">
            ₹{totalPrice}
          </p>
        </div>

        <button className="bg-orange-500 text-white px-5 py-2 rounded-md hover:bg-orange-600 transition">
          Place Order
        </button>
      </div>

    </div>
  )
}