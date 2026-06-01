import { useNavigate } from "react-router-dom";
import { useCart } from '../context/CartContext';
import useCartActions from '../hooks/useCartActions';
import ProductDecreaseButton from './ProductDecreaseButton';
import ProductIncreaseButton from './ProductIncreaseButton';
import useAuth from '../hooks/useAuth';
import toast from "react-hot-toast";


export default function AddCart({ productId }) {
  const { cart } = useCart();
  const { add } = useCartActions();
  const isLoggedIn = useAuth();
  const navigate = useNavigate();

  const item = cart.find(i => i.product._id === productId);
  const qty = item?.quantity || 0;

  const handleAddToCart = (e) => {
    e.stopPropagation();
    if (!isLoggedIn) {
      toast.error("Please login to add items!", {
        duration: 3000,
        style: {
          background: "#ff4d4f",
          color: "#fff",
          fontWeight: "bold",
          fontSize: "16px"
        }
      })
      navigate("/customer/login");
      return;
    }
    add(productId);
  };

 if (qty === 0) {
  return (
    <button
      onClick={handleAddToCart}
      className="
        w-full px-3 py-1 text-sm font-semibold
         bg-green-100
        text-green-800 rounded-lg border border-green-800
        hover:scale-[1.02]
        active:scale-95
        transition-all duration-200
      "
    >
      Add
    </button>
  );
}

  return (
  <div
    className="
      w-full flex items-center justify-between bg-white rounded-lg
      border border-green-800
    "
  >
    <ProductDecreaseButton productId={productId} />

    <span className="text-sm w-4 font-semibold text-gray-700">
      {qty}
    </span>

    <ProductIncreaseButton productId={productId} />
  </div>
);
}