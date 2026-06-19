import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ProductList from "./ProductList";

export default function SearchResult() {
  const location = useLocation();
  const navigate = useNavigate();

  const products = location.state?.products || [];
  const total = location.state?.total || 0;
  const query = location.state?.query || "";

  return (
    <div className="max-w-7xl">

      {/* HEADER */}
      <div className=" flex flex-col">

        <p className="text-sm text-slate-500">
          {total} products found
          {query && (
            <span className="ml-2 text-emerald-600 font-medium">
              for “{query}”
            </span>
          )}
        </p>


      </div>

      {/* EMPTY STATE */}
      {products.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-slate-500">

          <div className="text-6xl mb-4">🔍</div>

          <p className="text-lg font-semibold text-slate-700">
            No products found
          </p>

          <p className="text-sm text-slate-400 mt-1 text-center max-w-md">
            Try searching with different keywords or check spelling
          </p>

          <button
            onClick={() => navigate("/")}
            className="
              mt-6
              px-5 py-2.5
              bg-emerald-600
              text-white
              rounded-xl
              font-medium
              hover:bg-emerald-700
              active:scale-95
              transition
            "
          >
            Go Home
          </button>

        </div>
      ) : (
        <>
          

          {/* PRODUCTS GRID */}
          <div
            className="
              grid
              grid-cols-2
              md:grid-cols-3
              lg:grid-cols-5
              gap-6
            "
          >
            {products.map((product) => (
              <ProductList
                key={product._id}
                product={product}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}