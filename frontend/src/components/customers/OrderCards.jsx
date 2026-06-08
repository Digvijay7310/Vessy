import { useNavigate } from "react-router-dom";
import {
  Package,
  ChevronRight,
} from "lucide-react";

export default function OrderCards({ order }) {
  const navigate = useNavigate();

  const products = order.items || [];

  return (
    <div
      onClick={() => navigate(`/order/${order._id}`)}
      className="
        bg-white border border-gray-100 rounded-2xl p-4
        shadow-sm hover:shadow-md transition-all
        cursor-pointer
      "
    >
      {/* Top */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-gray-500">
            Order #{order.orderNumber?.slice(-6) || order._id.slice(-6)}
          </p>

          <h3 className="font-semibold text-gray-900 mt-1">
            ₹{order.totalAmount}
          </h3>
        </div>

        <span
          className={`px-2 py-1 rounded-full text-[10px] font-medium ${
            order.status === "Delivered"
              ? "bg-green-50 text-green-600"
              : "bg-orange-50 text-orange-600"
          }`}
        >
          {order.status}
        </span>
      </div>

      {/* Product Images */}
      <div className="flex items-center mt-4">
        {products.slice(0, 3).map((item, index) => (
          <img
            key={index}
            src={item.product?.images?.[0]}
            alt=""
            className="
              h-12 w-12 rounded-xl object-cover
              border-2 border-white
              -ml-2 first:ml-0
            "
          />
        ))}

        {products.length > 3 && (
          <div className="h-12 w-12 -ml-2 rounded-xl bg-gray-100 border-2 border-white flex items-center justify-center text-xs font-semibold text-gray-600">
            +{products.length - 3}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
        <div className="flex items-center gap-2 text-gray-500">
          <Package size={14} />
          <span className="text-xs">
            {products.length} Items
          </span>
        </div>

        <div className="flex items-center gap-1 text-sm font-medium text-black">
          View
          <ChevronRight size={16} />
        </div>
      </div>
    </div>
  );
}