import { useEffect, useState } from "react"
import axiosInstance from "../utils/axiosInstance"
import { useCart } from "../context/CartContext"

export default function Cart() {
  const { cart, fetchCart } = useCart()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchCart()
  }, [])

  const increaseQty = async (productId) => {
    await axiosInstance.post("/cart/add", { productId })
    fetchCart()
  }

  const decreaseQty = async (productId) => {
    await axiosInstance.post("/cart/decrease", { productId })
    fetchCart()
  }

  const removeItem = async (productId) => {
    await axiosInstance.post("/cart/remove", { productId })
    fetchCart()
  }

  if (!cart) return <p className="text-center mt-10">Cart Empty</p>

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Your Cart</h1>

      {cart.items.map((item) => (
        <div
          key={item.product._id}
          className="flex items-center justify-between border-b py-3"
        >
          {/* Product Info */}
          <div>
            <h2 className="font-semibold">{item.product.name}</h2>
            <p>₹{item.product.price}</p>
          </div>

          {/* Quantity Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => decreaseQty(item.product._id)}
              className="px-2 bg-gray-200"
            >
              -
            </button>

            <span>{item.quantity}</span>

            <button
              onClick={() => increaseQty(item.product._id)}
              className="px-2 bg-gray-200"
            >
              +
            </button>
          </div>

          {/* Remove */}
          <button
            onClick={() => removeItem(item.product._id)}
            className="text-red-500"
          >
            Remove
          </button>
        </div>
      ))}

      {/* Total */}
      <div className="mt-6 text-right font-bold">
        Total Items:{" "}
        {cart.items.reduce((acc, i) => acc + i.quantity, 0)}
      </div>
    </div>
  )
}