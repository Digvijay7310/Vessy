import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function OtherProducts({ otherProducts }) {
  const navigate = useNavigate()

  if (!otherProducts || otherProducts.length === 0) return null
//   console.log(otherProducts)

  return (
    <section className="mt-8">
      <h2 className="text-lg md:text-xl font-semibold mb-4">
        Related Products
      </h2>

      <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-1">
        {otherProducts.map((product) => (
          <div
            key={product._id}
            onClick={() => navigate(`/products/product/${product._id}`)}
            className="bg-white rounded-xl shadow-sm hover:shadow-md transition p-2 cursor-pointer"
          >
            {/* Image */}
            <div className="h-32 flex items-center justify-center mb-2">
              <img
                src={product.image?.[0]}
                alt={product.name}
                className="h-full object-contain"
              />
            </div>

            {/* Title (2 lines) */}
            <h3 className="text-xs md:text-sm font-semibold line-clamp-2">
              {product.name}
            </h3>

            {/* Description (3 lines) */}
            <p className="text-[10px] md:text-xs text-gray-500 line-clamp-3 mt-1">
              {product.description}
            </p>

            {/* Price */}
            <p className="text-sm font-bold text-green-600 mt-2">
              ₹{product.price}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}