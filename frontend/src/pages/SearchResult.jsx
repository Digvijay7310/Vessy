import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AddCart from "../components/AddCart";
import ProductList from "../components/ProductList";

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
            <ProductList product={product} key={product._id} />
          ))}

        </div>
      )}
    </div>
  );
}