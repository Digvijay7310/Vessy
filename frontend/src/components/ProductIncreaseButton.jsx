import React from "react";
import useCartActions from "../hooks/useCartActions";
import { AiFillPlusCircle } from "react-icons/ai";

export default function ProductIncreaseButton({ productId }) {
  const { add } = useCartActions();

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        add(productId);
      }}
      className="
        w-9 h-9 flex items-center justify-center
        rounded-full 
        active:scale-90 transition
      "
    >
      <AiFillPlusCircle className="text-green-500 text-xl" />
    </button>
  );
}