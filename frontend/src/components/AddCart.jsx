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
        className="w-full px-3 py-1 text-sm font-medium bg-red-500 text-white rounded-md hover:bg-red-600 active:scale-95 transition"
      >
        Add to Cart
      </button>
    );
  }

  return (
    <div className="w-full flex items-center justify-between bg-white border border-gray-300 rounded-full shadow-sm">
      <ProductDecreaseButton productId={productId} />
      <span className="text-sm font-medium px-2">{qty}</span>
      <ProductIncreaseButton productId={productId} />
    </div>
  );
}