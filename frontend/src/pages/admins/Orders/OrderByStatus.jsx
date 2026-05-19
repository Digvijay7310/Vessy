import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../../utils/axiosInstance";

export default function OrdersByStatus() {
  const { status } = useParams();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const fetchOrders = async () => {
    try {
      setLoading(true);

      const res = await axiosInstance.get(`/orders/${status}`);
      console.log(res.data.data)
      console.log(res.data)
      setOrders(res.data.data);

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [status]);

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      case "Processing":
        return "bg-blue-100 text-blue-700";
      case "Shipped":
        return "bg-indigo-100 text-indigo-700";
      case "Delivered":
        return "bg-green-100 text-green-700";
      case "Cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="p-6 flex gap-6">

      {/* LEFT: ORDER LIST */}
      <div className="w-2/3">

        <h1 className="text-2xl font-bold mb-4">
          {status.replace("-", " ").toUpperCase()} Orders
        </h1>

        {loading ? (
          <p>Loading...</p>
        ) : orders.length === 0 ? (
          <p>No orders found</p>
        ) : (
          <div className="space-y-3">
            {orders.map((order) => (
              <div
                key={order._id}
                onClick={() => setSelectedOrder(order)}
                className="border rounded-lg p-4 bg-white shadow-sm cursor-pointer hover:shadow-md transition"
              >
                <div className="flex justify-between">
                  <p className="font-semibold text-sm">
                    Order #{order._id.slice(-6)}
                  </p>

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                      order.orderStatus
                    )}`}
                  >
                    {order.orderStatus}
                  </span>
                </div>

                <p className="text-gray-600 mt-1">
                  Customer: {order.customer?.name}
                </p>

                <p className="text-gray-800 font-medium mt-1">
                  ₹ {order.finalAmount}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* RIGHT: DETAILS PANEL */}
      <div className="w-1/3 border rounded-lg p-4 bg-white shadow-sm h-fit sticky top-6">

        {selectedOrder ? (
          <>
            <h2 className="text-lg font-bold mb-3">Order Details</h2>

            <p><b>ID:</b> {selectedOrder._id}</p>
            <p><b>Customer:</b> {selectedOrder.customer?.name}</p>
            <p><b>Email:</b> {selectedOrder.customer?.email}</p>
            <p><b>Status:</b> {selectedOrder.orderStatus}</p>
            <p><b>Total:</b> ₹{selectedOrder.finalAmount}</p>

            <button
              onClick={() => setSelectedOrder(null)}
              className="mt-4 px-3 py-1 bg-gray-200 rounded"
            >
              Close
            </button>
          </>
        ) : (
          <p className="text-gray-500">
            Click an order to view details
          </p>
        )}
      </div>

    </div>
  );
}