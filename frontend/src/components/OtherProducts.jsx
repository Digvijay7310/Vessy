import React from "react";
import { useNavigate } from "react-router-dom";
import AddCart from "./AddCart";
import AddWishList from "./AddWishList";
import axiosInstance from "../utils/axiosInstance";

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

  const handleWishList = async (e) => {
    e.stopPropagation();

    await axiosInstance.post(
      `/wishlist/toggle/${product._id}`
    );
  };

  return (
    <div
      onClick={() => navigate(`/products/product/${product._id}`)}
      className="w-25 bg-white border rounded-xl overflow-hidden relative"
    >

      {/* IMAGE */}
      <div className="h-26 bg-gray-50 flex items-center justify-center relative">

        <img
          src={product.image?.[0]}
          className="h-full object-contain"
        />

        {/* ❤️ WISHLIST */}
        <div className="absolute top-2 left-0">
          <AddWishList
            productId={product._id}
            onClick={handleWishList}
          />
        </div>

      </div>

      {/* DETAILS */}
      <div className="p-1">
        <h3 className="text-[10px] font-semibold line-clamp-2">
          {product.name}
        </h3>

        <p className="text-green-600 font-bold">
          ₹{product.price}
        </p>
      </div>

    </div>
  );
}