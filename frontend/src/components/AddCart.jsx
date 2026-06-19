import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import useCartActions from "../hooks/useCartActions";
import ProductDecreaseButton from "./ProductDecreaseButton";
import ProductIncreaseButton from "./ProductIncreaseButton";
import toast from "react-hot-toast";

export default function AddCart({ productId }) {
  const { cart } = useCart();
  const { add } = useCartActions();
  const navigate = useNavigate();

  const item = cart.find((i) => i.product._id === productId);
  const qty = item?.quantity || 0;

  const handleAddToCart = (e) => {
    e.stopPropagation();


    add(productId);
  };

  /* ================= ADD BUTTON ================= */
  if (qty === 0) {
    return (
      <button
        onClick={handleAddToCart}
        className="
          h-9
          px-4
          text-sm font-semibold
          rounded-full
          bg-emerald-50
          text-emerald-700
          border border-emerald-600
          shadow-sm

          flex items-center justify-center
          min-w-[64px]

          hover:bg-emerald-100
          active:scale-95
          transition-all duration-200
        "
      >
        Add
      </button>
    );
  }

  /* ================= QUANTITY CONTROLLER ================= */
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="
        h-9
        flex items-center
        bg-emerald-50
        border border-emerald-600
        rounded-full

        px-1
        min-w-[96px]
        justify-between

        shadow-sm
      "
    >
      {/* DECREASE */}
      <div className="flex items-center justify-center w-8 h-8">
        <ProductDecreaseButton productId={productId} />
      </div>

      {/* QTY */}
      <span className="text-sm font-semibold text-slate-800 px-2">
        {qty}
      </span>

      {/* INCREASE */}
      <div className="flex items-center justify-center w-8 h-8">
        <ProductIncreaseButton productId={productId} />
      </div>
    </div>
  );
}