import React, { useEffect, useState } from "react";
import axiosInstance from "../../../utils/axiosInstance";

export default function AllOrders() {

  const [data, setData] = useState({
    totalOrders: 0,
    pendingOrders: 0,
    confirmedOrders: 0,
    processingOrders: 0,
    shippedOrders: 0,
    outForDelivery: 0,
    deliveredOrders: 0,
    returnedOrders: 0,
  });

  const [loading, setLoading] = useState(false);

  const fetchAllOrders = async () => {

    try {

      setLoading(true);

      const res = await axiosInstance.get(
        "/admins/all-orders"
      );

      setData(res.data.data);

    } catch (error) {

      console.log("Error fetching orders", error);

    } finally {

      setLoading(false);

    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  // ---------------- STATS ARRAY ----------------
  const stats = [
    { label: "Total Orders", value: data.totalOrders, color: "text-gray-700" },
    { label: "Pending", value: data.pendingOrders, color: "text-yellow-500" },
    { label: "Confirmed", value: data.confirmedOrders, color: "text-blue-500" },
    { label: "Processing", value: data.processingOrders, color: "text-purple-500" },
    { label: "Shipped", value: data.shippedOrders, color: "text-indigo-500" },
    { label: "Out for Delivery", value: data.outForDelivery, color: "text-orange-500" },
    { label: "Delivered", value: data.deliveredOrders, color: "text-green-500" },
    { label: "Returned", value: data.returnedOrders, color: "text-red-500" },
  ];

  return (
    <div className="p-4 md:p-6 bg-gray-100 min-h-screen">

      {/* HEADER */}
      <div className="mb-6">

        <h1 className="text-2xl font-bold text-gray-800">
          Orders Dashboard
        </h1>

        <p className="text-sm text-gray-500">
          Order status overview
        </p>

      </div>

      {/* LOADING */}
      {loading ? (
        <p className="text-gray-500">
          Loading orders...
        </p>
      ) : (

        /* GRID */
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">

          {stats.map((item, index) => (

            <div
              key={index}
              className="
                bg-white
                border
                rounded-xl
                p-4
                shadow-sm
                hover:shadow-md
                transition-all
              "
            >

              <p className="text-sm text-gray-500">
                {item.label}
              </p>

              <h2 className={`text-2xl font-bold mt-2 ${item.color}`}>
                {item.value}
              </h2>

            </div>

          ))}

        </div>
      )}

    </div>
  );
}