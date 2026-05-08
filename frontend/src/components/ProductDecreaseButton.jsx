import React from "react";
import useCartActions from "../hooks/useCartActions";
import { AiFillMinusCircle } from "react-icons/ai";

export default function ProductDecreaseButton({ productId }) {
  const { decrease } = useCartActions();

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        decrease(productId);
      }}
      className="
        w-9 h-9 flex items-center justify-center
        rounded-full bg-gray-100 hover:bg-gray-200
        active:scale-90 transition
      "
    >
      <AiFillMinusCircle className="text-gray-700 text-xl" />
    </button>
  );
}