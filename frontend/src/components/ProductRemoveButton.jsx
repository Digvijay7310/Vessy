import React from "react";
import useCartActions from "../hooks/useCartActions";
import { Trash2 } from "lucide-react";

export default function ProductRemoveButton({ productId }) {
  const { remove, loading } = useCartActions?.() || {};

  const handleRemove = (e) => {
    e.stopPropagation();
    remove?.(productId);
  };

  return (
    <button
      onClick={handleRemove}
      disabled={loading}
      className="
        group
        flex items-center justify-center
        w-9 h-9
        rounded-xl
        bg-red-50
        text-red-600
        hover:bg-red-500 hover:text-white
        transition-all duration-200
        active:scale-95
        disabled:opacity-50 disabled:cursor-not-allowed
      "
      title="Remove from cart"
    >
      <Trash2
        size={18}
        className="group-hover:scale-110 transition-transform"
      />
    </button>
  );
}