import React from 'react'
import { useNavigate } from 'react-router-dom'
import AddCart from './AddCart'

export default function ProductList({product}) {
    const navigate = useNavigate()
    if(!product) return null

  return (
        <div
        className="bg-white rounded-xl shadow-sm hover:shadow-md transition duration-300 p-2 cursor-pointer relative group"
        onClick={() => navigate(`/products/product/${product._id}`)}
        >
                        {/* Image */}
        <div className="h-36 flex items-center justify-center mb-2">
            <img
                 src={product.image}
                 alt={product.name}
                className="h-full object-contain rounded-lg group-hover:scale-110 transition-all duration-700" />
        </div>

                {/* Info */}
         <h5 className="text-[10px] md:text-sm font-medium line-clamp-1">{product.name}</h5>

        <p className="text-[8px] md:text-xs text-gray-500 line-clamp-2 mb-2">{product.description}</p>


         <p className="text-xs font-bold text-green-600">Rs. {product.price}</p>
         <div className="absolute top-1 left-0 bg-red-500 rounded-lg">
          <AddCart productId={product._id} />
         </div>
        </div>
        
  
  )
}
