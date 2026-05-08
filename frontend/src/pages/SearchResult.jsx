import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AddCart from "../components/AddCart";

export default function SearchResult() {
  const location = useLocation();
  const navigate = useNavigate();

  const products = location.state?.products || [];
  const total = location.state?.total || 0;

  const handleNavigate = (id) => {
    navigate(`/products/product/${id}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">

      {/* HEADER */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          Search Results
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          {total} products found
        </p>
      </div>

      {/* EMPTY STATE */}
      {products.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-gray-500">
          <div className="text-5xl mb-3">🔍</div>
          <p className="text-lg font-semibold">No products found</p>
          <p className="text-sm text-gray-400">
            Try searching with different keywords
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">

          {products.map((product) => (
            <div
              key={product._id}
              onClick={() => handleNavigate(product._id)}
              className="
                bg-white border border-gray-100 rounded-xl
                shadow-sm hover:shadow-lg
                transition duration-200
                cursor-pointer group
                overflow-hidden
              "
            >

              {/* IMAGE */}
              <div className="h-40 flex items-center justify-center bg-gray-50 relative">

                <img
                  src={product.image?.[0]}
                  alt={product.name}
                  className="
                    h-full object-contain
                    group-hover:scale-105
                    transition-transform duration-300
                  "
                />

                {/* ADD TO CART */}
                <div
                  className="absolute bottom-2 right-2"
                  onClick={(e) => e.stopPropagation()}
                >
                  <AddCart productId={product._id} />
                </div>

              </div>

              {/* CONTENT */}
              <div className="p-3 space-y-1">

                {/* NAME */}
                <h5 className="text-sm font-medium text-gray-800 line-clamp-1">
                  {product.name}
                </h5>

                {/* DESCRIPTION */}
                <p className="text-xs text-gray-500 line-clamp-2">
                  {product.description}
                </p>

                {/* PRICE */}
                <p className="text-green-600 font-bold text-sm">
                  ₹{product.price}
                </p>

              </div>

            </div>
          ))}

        </div>
      )}
    </div>
  );
}