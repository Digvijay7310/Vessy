import { Link } from "react-router-dom";
import { FiPackage } from "react-icons/fi";

export default function OrderCard({ order }) {
  const firstItem = order.items?.[0]?.product;
  const totalItems = order.items?.length || 0;



  // 🎨 STATUS COLORS (clean + consistent)
  const getStatusStyle = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-emerald-100 text-emerald-700";
      case "Cancelled":
        return "bg-red-100 text-red-700";
      case "Returned":
        return "bg-purple-100 text-purple-700";
      case "Out for Delivery":
        return "bg-orange-100 text-orange-700";
      case "Shipped":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  return (
    <Link to={`/orders/${order._id}`}>
      <div className="group w-full border border-gray-100 rounded bg-white shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">

        {/* TOP SECTION */}
        <div className="flex gap-2 p-0.5">

          {/* IMAGE */}
          <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-100 rounded-xl overflow-hidden flex items-center justify-center shrink-0">

            {firstItem?.image ? (
              <img
                src={firstItem.image}
                alt="product"
                className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
              />
              
            ) : (
              <FiPackage className="text-gray-400 text-2xl" />
            )}

          </div>

          {/* INFO */}
          <div className="flex-1 min-w-0">

            {/* HEADER */}
            <div className="flex justify-between items-start gap-2">

              <div className="min-w-0">
                <p className="text-xs sm:text-sm text-gray-500 truncate">
                  Order #{order._id}
                </p>

                <p className="font-semibold text-gray-800 mt-1 text-sm sm:text-base">
                  {totalItems} item{totalItems > 1 ? "s" : ""}
                </p>
              </div>

              {/* STATUS */}
              <span
                className={`text-[10px] sm:text-xs px-2 sm:px-3 py-1 rounded-full font-medium whitespace-nowrap ${getStatusStyle(
                  order.orderStatus
                )}`}
              >
                {order.orderStatus}
              </span>

            </div>

            {/* PRICE + DATE */}
            <div className="mt-3 flex justify-between items-center">

              <p className="text-base sm:text-lg font-bold text-gray-900">
                ₹{order.finalAmount}
              </p>

              <p className="text-[10px] sm:text-xs text-gray-500 text-right">
                {order.createdAt &&
                  new Date(order.createdAt).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
              </p>

            </div>

          </div>

        </div>

        {/* HOVER BAR */}
        <div className="h-[2px] w-0 group-hover:w-full bg-gradient-to-r from-emerald-400 via-green-500 to-teal-500 transition-all duration-300"></div>

      </div>
    </Link>
  );
}