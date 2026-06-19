import { useNavigate } from "react-router-dom";
import AddCart from "../components/AddCart";
import AddWishList from "../components/AddWishList";




export default function ProductList({ product }) {
  const navigate = useNavigate();
  if (!product) return null;

  const isOutOfStock = product.stock <= 0;

  return (
    <div
      onClick={() => navigate(`/products/product/${product._id}`)}
      className="
        bg-white border border-gray-100 rounded-xl
        shadow-sm cursor-pointer overflow-hidden
        flex flex-col h-full
        hover:shadow-md transition
      "
    >

      {/* IMAGE SECTION */}
      <div className="h-40 md:h-60 flex items-center justify-center bg-gray-50 relative">
        <img
          src={product.image?.[0]}
          alt={product.name}
          className={`h-full object-contain transition ${
            isOutOfStock ? "opacity-50" : ""
          }`}
        />

        <div className="absolute top-2 left-1">
          <AddWishList productId={product._id} />
        </div>

        <div
          className="absolute bottom-3 right-0 z-10"
          onClick={(e) => e.stopPropagation()}
        >
          <AddCart productId={product._id} />
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-2 flex flex-col flex-1 justify-between">

        <h5 className="text-sm font-medium text-gray-800 line-clamp-2 min-h-[40px]">
          {product.name}
        </h5>

        <div className="mt-2 flex justify-between items-center">
          <p className="text-green-600 font-bold text-sm md:text-lg">
            ₹{product.price}
          </p>

          <p className="text-xs text-gray-500">
            Stock: {product.stock}
          </p>
        </div>

      </div>
    </div>
  );
}