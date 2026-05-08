import React from "react";
import useCartActions from "../hooks/useCartActions";

export default function ProductRemoveButton({ productId }) {
  const { remove } = useCartActions();

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        remove(productId);
      }}
      className="
        text-xs px-3 py-1 rounded-full
        bg-red-500 hover:bg-red-600
        text-white font-medium
        transition active:scale-95
      "
    >
      Remove
    </button>
  );
}