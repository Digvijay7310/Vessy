import { Link } from "react-router-dom";
import { FiPackage } from "react-icons/fi";

export default function OrderCard({ order }) {

  const firstItem = order.items?.[0]?.product;
  const totalItems = order.items?.length || 0;

  return (
    <Link to={`/orders/${order._id}`}>

      <div className="group border rounded-2xl bg-white shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden">

        {/* TOP SECTION */}
        <div className="flex gap-4 p-4">

          {/* IMAGE */}
          <div className="w-20 h-20 bg-gray-100 rounded-xl overflow-hidden flex items-center justify-center shrink-0">

            {firstItem?.images?.[0] ? (
              <img
                src={firstItem.images[0]}
                alt="product"
                className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
              />
            ) : (
              <FiPackage className="text-gray-400 text-2xl" />
            )}

          </div>

          {/* INFO */}
          <div className="flex-1">

            <div className="flex justify-between items-start">

              <div>
                <p className="text-sm text-gray-500">
                  Order #{order._id.slice(-6)}
                </p>

                <p className="font-semibold text-gray-800 mt-1">
                  {totalItems} item{totalItems > 1 ? "s" : ""}
                </p>
              </div>

              {/* STATUS BADGE */}
              <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                order.orderStatus === "Delivered"
                  ? "bg-green-100 text-green-700"
                  : order.orderStatus === "Cancelled"
                  ? "bg-red-100 text-red-700"
                  : order.orderStatus === "Returned"
                  ? "bg-purple-100 text-purple-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}>
                {order.orderStatus}
              </span>

            </div>

            {/* PRICE */}
            <div className="mt-3 flex justify-between items-center">

              <p className="text-lg font-bold text-gray-900">
                ₹{order.finalAmount}
              </p>

              <p className="text-xs text-gray-500">
                {new Date(order.createdAt).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric"
                })}
              </p>

            </div>

          </div>

        </div>

        {/* HOVER BAR */}
        <div className="h-1 w-0 group-hover:w-full bg-gradient-to-r from-emerald-400 to-green-600 transition-all duration-300"></div>

      </div>

    </Link>
  );
}