import React, { useEffect, useState, useMemo } from "react";
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

  const statusStyles = {
    Pending: "bg-yellow-100 text-yellow-700",
    Processing: "bg-blue-100 text-blue-700",
    Shipped: "bg-indigo-100 text-indigo-700",
    Delivered: "bg-emerald-100 text-emerald-700",
    Cancelled: "bg-red-100 text-red-700",
  };

  const statusColor =
    statusStyles[order?.orderStatus] || "bg-gray-100 text-gray-600";

  const totalItems = useMemo(
    () => order?.items?.reduce((acc, item) => acc + item.quantity, 0),
    [order]
  );

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await axiosInstance.get(`/orders/order/${id}`);
        setOrder(res.data.data);
      } catch (err) {
        console.error(err);
        setOrder(null);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center text-gray-500">
        Loading order details...
      </div>
    );
  }

  if (!order) {
    return (
      <div className="h-screen flex items-center justify-center text-red-500">
        Order not found
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-6 px-3 md:px-10">

      <div className="max-w-6xl mx-auto space-y-6">

        {/* HEADER */}
        <div className="bg-white border rounded-2xl p-5 flex flex-col md:flex-row md:justify-between md:items-center gap-3 shadow-sm">

          <div>
            <Link
              to="/my-orders"
              className="text-sm text-emerald-600 hover:underline"
            >
              ← Back to Orders
            </Link>

            <h1 className="text-2xl font-bold mt-2">
              Order Details
            </h1>

            <p className="text-sm text-gray-500">
              ID: {order.orderId || order._id}
            </p>
          </div>

          <span className={`px-4 py-1 rounded-full text-sm font-medium w-fit ${statusColor}`}>
            {order.orderStatus}
          </span>

        </div>

        {/* GRID SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* LEFT - ITEMS */}
          <div className="lg:col-span-2 space-y-4">

            {/* ITEMS */}
            <div className="bg-white border rounded-2xl p-5 space-y-4">

              <h2 className="font-semibold text-lg">
                Items ({order.items?.length})
              </h2>

              {order.items?.map((item) => (
                <div key={item._id} className="flex gap-4 border-b pb-4 last:border-none">

                  <img
                    src={
                      Array.isArray(item.product?.image)
                        ? item.product.image[0]
                        : item.product?.image
                    }
                    className="w-20 h-20 object-cover rounded-xl bg-gray-100"
                  />

                  <div className="flex-1">
                    <p className="font-medium">{item.product?.name}</p>

                    <p className="text-sm text-gray-500 mt-1">
                      Qty: {item.quantity}
                    </p>

                    <p className="text-emerald-600 font-semibold text-sm mt-2">
                      {formatPrice(item.price)}
                    </p>
                  </div>

                  <div className="font-semibold">
                    {formatPrice(item.price * item.quantity)}
                  </div>

                </div>
              ))}
            </div>

          </div>

          {/* RIGHT - SUMMARY */}
          <div className="space-y-4">

            {/* ORDER INFO */}
            <div className="bg-white border rounded-2xl p-5 space-y-3">

              <h2 className="font-semibold text-lg">Order Info</h2>

              <Info label="Payment Method" value={order.paymentMethod} />
              <Info label="Payment Status" value={order.paymentStatus} />
              <Info label="Total Items" value={totalItems} />

              <Info
                label="Order Date"
                value={new Date(order.createdAt).toDateString()}
              />

              <Info
                label="Expected Delivery"
                value={
                  order.expectedDelivery
                    ? new Date(order.expectedDelivery).toDateString()
                    : "N/A"
                }
              />

            </div>

            {/* PRICE SUMMARY */}
            <div className="bg-white border rounded-2xl p-5 space-y-3">

              <h2 className="font-semibold text-lg">
                Payment Summary
              </h2>

              <Row label="Subtotal" value={formatPrice(order.totalPrice)} />
              <Row label="Platform Fee" value={formatPrice(order.platformCharge)} />
              <Row label="Delivery Charge" value={formatPrice(order.deliveryCharge)} />

              <hr />

              <div className="flex justify-between font-bold text-emerald-600 text-lg">
                <span>Total</span>
                <span>{formatPrice(order.finalAmount)}</span>
              </div>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

/* 🔧 Reusable Components */
const Info = ({ label, value }) => (
  <div className="flex justify-between text-sm">
    <span className="text-gray-500">{label}</span>
    <span className="font-medium text-gray-800">{value}</span>
  </div>
);

const Row = ({ label, value }) => (
  <div className="flex justify-between text-sm">
    <span className="text-gray-600">{label}</span>
    <span>{value}</span>
  </div>
);