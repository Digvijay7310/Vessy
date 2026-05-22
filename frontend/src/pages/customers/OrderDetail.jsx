import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";

export default function OrderDetail() {
  const { id } = useParams();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  const formatPrice = (price = 0) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await axiosInstance.get(`/orders/${id}`);

        // safer fallback
        const data = res.data.data || res.data.order || res.data;

        setOrder(data);

      } catch (err) {
        console.error("Error fetching order", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  if (loading) {
    return (
      <div className="text-center mt-10 text-gray-500">
        Loading order...
      </div>
    );
  }

  if (!order) {
    return (
      <div className="text-center mt-10 text-red-500">
        Order not found
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">

      {/* BACK */}
      <Link
        to="/my-orders"
        className="text-sm text-emerald-600 hover:underline"
      >
        ← Back to Orders
      </Link>

      {/* HEADER CARD */}
      <div className="bg-white border rounded-xl p-5 shadow-sm">

        <div className="flex justify-between items-center">

          <h2 className="text-xl font-semibold">
            Order Details
          </h2>

          {/* STATUS BADGE */}
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
            order.orderStatus === "Delivered"
              ? "bg-green-100 text-green-700"
              : order.orderStatus === "Cancelled"
              ? "bg-red-100 text-red-700"
              : "bg-yellow-100 text-yellow-700"
          }`}>
            {order.orderStatus}
          </span>

        </div>

        <p className="text-sm text-gray-500 mt-2">
          Order ID: {order._id}
        </p>

        <p className="text-sm text-gray-500">
          Placed on: {new Date(order.createdAt).toLocaleString()}
        </p>

      </div>

      {/* ITEMS */}
      <div className="bg-white border rounded-xl p-5 space-y-4">

        {order.items?.map((item) => (
          <div
            key={item._id}
            className="flex items-center gap-4 border-b pb-4 last:border-none"
          >

            {/* IMAGE */}
            <img
              src={item.product?.images?.[0] || "/placeholder.png"}
              alt={item.product?.name || "product"}
              className="w-20 h-20 object-cover rounded-lg bg-gray-100"
            />

            {/* INFO */}
            <div className="flex-1">

              <p className="font-medium">
                {item.product?.name}
              </p>

              <p className="text-sm text-gray-500 line-clamp-1">
                {item.product?.description}
              </p>

              <p className="text-emerald-600 font-semibold text-sm mt-1">
                {formatPrice(item.price)} × {item.quantity}
              </p>

            </div>

            {/* TOTAL */}
            <div className="font-semibold">
              {formatPrice(item.price * item.quantity)}
            </div>

          </div>
        ))}

      </div>

      {/* SUMMARY */}
      <div className="bg-gray-50 border rounded-xl p-5 space-y-2">

        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>{formatPrice(order.totalPrice)}</span>
        </div>

        <div className="flex justify-between">
          <span>Platform Fee</span>
          <span>{formatPrice(order.platformCharge)}</span>
        </div>

        <div className="flex justify-between">
          <span>Delivery Charge</span>
          <span>{formatPrice(order.deliveryCharge)}</span>
        </div>

        <hr />

        <div className="flex justify-between font-bold text-lg text-emerald-600">
          <span>Total</span>
          <span>{formatPrice(order.finalAmount)}</span>
        </div>

        <div className="text-sm text-gray-600 pt-2">
          Payment: {order.paymentMethod} • {order.paymentStatus}
        </div>

      </div>

    </div>
  );
}