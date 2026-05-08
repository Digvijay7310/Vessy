import React from "react";
import { useNavigate } from "react-router-dom";
import AddCart from "./AddCart";

export default function OtherProducts({ otherProducts = [] }) {
  const navigate = useNavigate();

  if (!otherProducts || otherProducts.length === 0) return null;

  return (
    <section className="mt-12">

      {/* TITLE */}
      <h2 className="text-xl font-bold text-gray-900 mb-5">
        Related Products
      </h2>

      {/* GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">

        {otherProducts.map((product) => (

          <div
            key={product._id}
            onClick={() =>
              navigate(`/products/product/${product._id}`)
            }
            className="
              bg-white border border-gray-100 rounded-xl
              p-3 cursor-pointer shadow-sm
              hover:shadow-lg hover:-translate-y-1
              transition duration-200 relative
            "
          >

            {/* IMAGE */}
            <div className="h-40 flex items-center justify-center mb-3 relative">

              <img
                src={product.image?.[0]}
                alt={product.name}
                className="h-full object-contain"
              />

              {/* ADD TO CART (like ProductList style) */}
              <div
                className="absolute bottom-2 right-2 w-full"
                onClick={(e) => e.stopPropagation()} // IMPORTANT FIX
              >
                <AddCart productId={product._id} />
              </div>

            </div>

            {/* NAME */}
            <h3 className="text-sm font-semibold text-gray-800 line-clamp-2">
              {product.name}
            </h3>

            {/* DESCRIPTION */}
            <p className="text-xs text-gray-500 line-clamp-2 mt-1">
              {product.description}
            </p>

            {/* PRICE */}
            <p className="text-green-600 font-bold mt-2">
              ₹{product.price}
            </p>

          </div>
        ))}

      </div>
    </section>
  );
}