import React from "react";
import { useNavigate } from "react-router-dom";
import AddCart from "./AddCart";
import AddWishList from "./AddWishList";
import axiosInstance from "../utils/axiosInstance";

export default function OtherProducts({ otherProducts = [] }) {
  const navigate = useNavigate();

  if (!otherProducts.length) return null;

  return (
    <section className="mt-6">

      {/* SCROLL ROW */}
      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex gap-4 w-max pb-2">

          {otherProducts.map((product) => (
            <Card
              key={product._id}
              product={product}
              navigate={navigate}
            />
          ))}

        </div>
      </div>

    </section>
  );
}

/* ================= CARD (MATCH PRODUCTLIST STYLE) ================= */
function Card({ product, navigate }) {

  const isOutOfStock = product.stock <= 0;

  const handleWishList = async (e) => {
    e.stopPropagation();
    await axiosInstance.post(`/wishlist/toggle/${product._id}`);
  };

  return (
    <div
      onClick={() => navigate(`/products/product/${product._id}`)}
      className="
        w-40
        bg-white
        border border-gray-100
        rounded-xl
        shadow-sm
        cursor-pointer
        overflow-hidden
        flex flex-col
        h-full
        hover:shadow-md
        transition
      "
    >

      {/* IMAGE SECTION (same as ProductList) */}
      <div className="h-40 flex items-center justify-center bg-gray-50 relative">

        <img
          src={product.image?.[0]}
          alt={product.name}
          className={`h-full object-contain transition ${
            isOutOfStock ? "opacity-50" : ""
          }`}
        />

        {/* WISHLIST */}
        <div
          className="absolute top-2 left-1"
          onClick={handleWishList}
        >
          <AddWishList productId={product._id} />
        </div>

        {/* CART (same pattern as ProductList) */}
        <div
          className="absolute bottom-2 right-2"
          onClick={(e) => e.stopPropagation()}
        >
          <AddCart productId={product._id} />
        </div>

      </div>

      {/* CONTENT (same as ProductList) */}
      <div className="p-2 flex flex-col flex-1 justify-between">

        <h5 className="text-sm font-medium text-gray-800 line-clamp-2 min-h-[40px]">
          {product.name}
        </h5>

        <div className="mt-2 flex justify-between items-center">
          <p className="text-green-600 font-bold text-sm md:text-lg">
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