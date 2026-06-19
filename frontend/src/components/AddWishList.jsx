import React from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useWishlist } from "../context/WishlistContext";

export default function AddWishList({ productId }) {
  const { isWishlisted, toggleWishlist } = useWishlist();

  const active = isWishlisted(productId);

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        toggleWishlist(productId);
      }}
      className="
        w-7 h-7 flex items-center justify-center
        rounded-full border border-gray-200
        bg-white
        active:scale-95
        transition
      "
    >
      {active ? (
        <AiFillHeart className="text-red-500 text-xl" />
      ) : (
        <AiOutlineHeart className="text-gray-500 text-xl hover:text-red-500" />
      )}
    </button>
  );
}