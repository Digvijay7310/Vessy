import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../../utils/axiosInstance";

export default function OrdersByStatus() {
  const { status } = useParams();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [updating, setUpdating] = useState(false);

  const flow = [
    "Pending",
    "Processing",
    "Shipped",
    "Out for Delivery",
    "Delivered",
  ];

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get(`/admins/${status}`);
      setOrders(res.data.data || []);
    } catch (err) {
      console.log(err);
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
      case "Out for Delivery":
        return "bg-orange-100 text-orange-700";
      case "Delivered":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const updateStatus = async (order, newStatus) => {
    try {
      setUpdating(true);

      await axiosInstance.put(`/admins/${order._id}/status`, {
        status: newStatus,
      });

      fetchOrders();

      setSelectedOrder((prev) =>
        prev?._id === order._id
          ? { ...prev, orderStatus: newStatus }
          : prev
      );
    } catch (err) {
      console.log(err);
    } finally {
      setUpdating(false);
    }
  };

  const getNextAllowedStatus = (current) => {
    const i = flow.indexOf(current);
    return i === -1 ? [] : flow.slice(i + 1, i + 2);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 p-4 md:p-6">

      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
          {status?.replace("-", " ").toUpperCase()} ORDERS
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Manage and track order workflow
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-5">

        {/* LEFT SIDE */}
        <div className="w-full lg:w-2/3">

          {loading ? (
            <div className="h-[60vh] flex items-center justify-center">
              <div className="w-10 h-10 border-4 border-gray-200 border-t-black rounded-full animate-spin" />
            </div>
          ) : (
            <div className="grid gap-3">

              {orders.map((order) => (
                <div
                  key={order._id}
                  onClick={() => setSelectedOrder(order)}
                  className="group bg-white border border-gray-100 rounded-2xl p-4 shadow-sm hover:shadow-lg transition-all cursor-pointer hover:-translate-y-1"
                >

                  <div className="flex justify-between items-center">

                    <p className="font-semibold text-gray-800">
                      Order #{order._id.slice(-6)}
                    </p>

                    <span className={`text-xs px-3 py-1 rounded-full font-medium ${getStatusColor(order.orderStatus)}`}>
                      {order.orderStatus}
                    </span>

                  </div>

                  <div className="flex justify-between mt-3 text-sm">

                    <p className="text-gray-600 truncate max-w-[60%]">
                      {order.customer?.fullName}
                    </p>

                    <p className="font-bold text-gray-900">
                      ₹{order.finalAmount}
                    </p>

                  </div>

                </div>
              ))}

            </div>
          )}
        </div>

        {/* RIGHT SIDE */}
        <div className="w-full lg:w-1/3">

          <div className="sticky top-4">

            <div className="bg-white border border-gray-100 rounded-3xl shadow-sm p-5 hover:shadow-md transition">

              {selectedOrder ? (
                <>
                  <h2 className="text-lg font-bold text-gray-900 mb-4">
                    Order Details
                  </h2>

                  <div className="space-y-2 text-sm text-gray-600">

                    <p><span className="text-gray-900 font-medium">ID:</span> {selectedOrder._id}</p>
                    <p><span className="text-gray-900 font-medium">Customer:</span> {selectedOrder.customer?.fullName}</p>
                    <p><span className="text-gray-900 font-medium">Email:</span> {selectedOrder.customer?.email}</p>

                    <div className="flex items-center gap-2">
                      <span className="text-gray-900 font-medium">Status:</span>
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(selectedOrder.orderStatus)}`}>
                        {selectedOrder.orderStatus}
                      </span>
                    </div>

                    <p>
                      <span className="text-gray-900 font-medium">Total:</span>{" "}
                      ₹{selectedOrder.finalAmount}
                    </p>

                  </div>

                  {/* STATUS UPDATE */}
                  <div className="mt-6">

                    <label className="text-sm font-medium text-gray-700">
                      Update Status
                    </label>

                    <select
                      disabled={updating}
                      value={selectedOrder.orderStatus}
                      onChange={(e) =>
                        updateStatus(selectedOrder, e.target.value)
                      }
                      className="w-full mt-2 border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-black outline-none"
                    >

                      <option>
                        {selectedOrder.orderStatus}
                      </option>

                      {getNextAllowedStatus(selectedOrder.orderStatus).map(
                        (s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        )
                      )}

                    </select>

                  </div>

                  <button
                    onClick={() => setSelectedOrder(null)}
                    className="mt-5 w-full bg-gray-100 hover:bg-gray-200 py-2 rounded-xl transition"
                  >
                    Close
                  </button>
                </>
              ) : (
                <div className="text-center text-gray-500 py-10">
                  Click on any order to view details
                </div>
              )}

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}