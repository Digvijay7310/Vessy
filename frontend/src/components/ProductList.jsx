import React from "react";
import { useNavigate } from "react-router-dom";
import AddCart from "./AddCart";

export default function ProductList({ product }) {
  const navigate = useNavigate();

  if (!product) return null;

  const handleNavigate = () => {
    navigate(`/products/product/${product._id}`);
  };

  const handleCartClick = (e) => {
    e.stopPropagation();
  };

  const isOutOfStock = product.stock <= 0;

  return (
    <div
      className="
        bg-white border border-gray-100 rounded-xl
        shadow-sm hover:shadow-lg
        transition duration-200
        cursor-pointer group
        overflow-hidden
        relative
        opacity-100
      "
      onClick={handleNavigate}
    >

      {/* OUT OF STOCK BADGE */}
      {isOutOfStock && (
        <div className="absolute top-2 left-2 z-10">
          <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">
            Out of Stock
          </span>
        </div>
      )}

      {/* IMAGE */}
      <div className="h-40 flex items-center justify-center bg-gray-50 relative">

        <img
          src={product.image?.[0]}
          alt={product.name}
          className={`
            h-full object-contain
            group-hover:scale-105
            transition-transform duration-300
            ${isOutOfStock ? "opacity-50" : ""}
          `}
        />

        {/* ADD TO CART */}
        <div
          className="absolute bottom-2 right-2"
          onClick={handleCartClick}
        >
          <AddCart productId={product._id} />
        </div>

      </div>

      {/* CONTENT */}
      <div className="p-1 space-y-1">

        {/* NAME */}
        <h5 className="text-sm font-medium text-gray-800 line-clamp-1">
          {product.name}
        </h5>

        {/* DESCRIPTION */}
        <p className="text-xs text-gray-500 line-clamp-2">
          {product.description}
        </p>

        {/* PRICE + STOCK */}
        <div className="flex justify-between items-center">
          <p className="text-green-600 font-bold text-sm">
            ₹{product.price}
          </p>

          <p className="text-xs text-gray-500">
            Stock: {product.stock}
          </p>
        </div>

      </div>

    </div>
  );
}