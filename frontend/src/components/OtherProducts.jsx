import React from "react";
import { useNavigate } from "react-router-dom";
import AddCart from "./AddCart";
import AddWishList from "./AddWishList";

export default function OtherProducts({ otherProducts = [] }) {
  const navigate = useNavigate();

  if (!otherProducts || otherProducts.length === 0) return null;

  return (
    <section className="mt-2">

      {/* SCROLL CONTAINER */}
      <div className="overflow-x-auto scrollbar-hide">

        <div className="flex flex-col gap-4 min-w-max">

          {/* ROW 1 */}
          <div className="flex gap-4">

            {otherProducts.slice(0, Math.ceil(otherProducts.length / 2)).map((product) => {
              const isOutOfStock = product.stock <= 0;

              return (
                <Card
                  key={product._id}
                  product={product}
                  navigate={navigate}
                  isOutOfStock={isOutOfStock}
                />
              );
            })}

          </div>

          {/* ROW 2 */}
          <div className="flex gap-4">

            {otherProducts.slice(Math.ceil(otherProducts.length / 2)).map((product) => {
              const isOutOfStock = product.stock <= 0;

              return (
                <Card
                  key={product._id}
                  product={product}
                  navigate={navigate}
                  isOutOfStock={isOutOfStock}
                />
              );
            })}

          </div>

        </div>

      </div>

    </section>
  );
}

/* ================= CARD ================= */
function Card({ product, navigate, isOutOfStock }) {
  return (
    <div
      onClick={() => navigate(`/products/product/${product._id}`)}
      className="
        w-25 sm:w-30
        bg-white border border-gray-100 rounded-xl
        shadow-sm cursor-pointer overflow-hidden
        flex flex-col flex-shrink-0
        hover:shadow-md transition
      "
    >

      {/* IMAGE */}
      <div className="h-26 flex items-center justify-center bg-gray-50 relative">

        <img
          src={product.image?.[0]}
          alt={product.name}
          className={`h-full object-contain ${
            isOutOfStock ? "opacity-50" : ""
          }`}
          loading="lazy"
        />

        {/* WISHLIST */}
        <div className="absolute top-2 left-2">
          <AddWishList productId={product._id} />
        </div>

        {/* CART */}
        <div
          className="absolute top-18 right-0 left-0"
          onClick={(e) => e.stopPropagation()}
        >
          <AddCart productId={product._id} />
        </div>

      </div>

      {/* CONTENT */}
      <div className="p-2">

        <h3 className="text-[8px] sm:text-xs font-medium line-clamp-2">
          {product.name}
        </h3>

        <div className="mt-2 flex justify-between items-center">

          <p className="text-green-600 font-bold text-sm">
            ₹{product.price}
          </p>

          <p className="text-[6px] md:text-xs text-gray-500">
            Stock: {product.stock}
          </p>

        </div>

      </div>

    </div>
  );
}