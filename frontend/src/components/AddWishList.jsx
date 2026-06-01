import React from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

export default function AddWishList({ isWishlisted = false, onClick }) {
  return (
    <button
      onClick={onClick}
      className="
        w-10 h-10 flex items-center justify-center
        rounded-full border border-gray-200
        bg-white
        active:scale-95
        transition-all duration-200
        group
      "
    >
      {isWishlisted ? (
        <AiFillHeart className="text-green-500 text-xl" />
      ) : (
        <AiOutlineHeart className="text-gray-500 text-xl group-hover:text-green-500" />
      )}
    </button>
  );
}