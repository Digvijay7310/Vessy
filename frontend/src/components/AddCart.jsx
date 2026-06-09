import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import useCartActions from "../hooks/useCartActions";
import ProductDecreaseButton from "./ProductDecreaseButton";
import ProductIncreaseButton from "./ProductIncreaseButton";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";

export default function AddCart({ productId }) {
  const { cart } = useCart();
  const { add } = useCartActions();
  const isLoggedIn = useAuth();
  const navigate = useNavigate();

  const item = cart.find((i) => i.product._id === productId);
  const qty = item?.quantity || 0;

  const handleAddToCart = (e) => {
    e.stopPropagation();

    if (!isLoggedIn) {
      toast.error("Please login to add items!");
      navigate("/customer/login");
      return;
    }

    add(productId);
  };

  /* ================= ADD BUTTON ================= */
  if (qty === 0) {
    return (
      <button
        onClick={handleAddToCart}
        className="
          px-3 py-1.5
          text-sm font-semibold
          bg-green-100 text-green-700
          border border-green-600
          rounded-lg

          flex items-center justify-center
          min-w-[60px]

          hover:bg-green-200
          active:scale-95
          transition-all
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
        flex items-center
        bg-green-100
        border border-green-600
        rounded-lg

        px-1 py-0.5
        min-w-[90px]
        justify-between
      "
    >
      <ProductDecreaseButton productId={productId} />

      <span className="text-sm font-semibold text-gray-800 px-2">
        {qty}
      </span>

      <ProductIncreaseButton productId={productId} />
    </div>
  );
}