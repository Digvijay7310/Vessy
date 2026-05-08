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
    e.stopPropagation(); // IMPORTANT FIX
  };

  return (
    <div
      className="
        bg-white border border-gray-100 rounded-xl
        shadow-sm hover:shadow-lg
        transition duration-200
        cursor-pointer group
        overflow-hidden
      "
      onClick={handleNavigate}
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
          onClick={handleCartClick}
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
  );
}