import React, { useEffect, useState } from "react";
import axiosInstance from "../../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";

export default function AllOrders() {

  const navigate = useNavigate();

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

      const res = await axiosInstance.get("/admins/all-orders");

      setData(res.data.data);

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  // ---------------- STATUS CARDS ----------------
const stats = [
  { label: "Pending", status: "Pending" },
  { label: "Confirmed", status: "Confirmed" },
  { label: "Processing", status: "Processing" },
  { label: "Shipped", status: "Shipped" },
  { label: "Out for Delivery", status: "Out for Delivery" },
  { label: "Delivered", status: "Delivered" },
  { label: "Returned", status: "Returned" },
];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">

      <h1 className="text-2xl font-bold mb-6">
        Orders Dashboard
      </h1>

      {loading ? (
        <p>Loading...</p>
      ) : (

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">

          {stats.map((item, index) => (

            <div
              key={index}
              onClick={() =>
                navigate(`/admin/orders/${item.status}`)
              }
              className="
                cursor-pointer
                bg-white
                border
                rounded-xl
                p-4
                shadow-sm
                hover:shadow-lg
                transition
              "
            >

              <div
                className={`w-full h-2 rounded mb-3 ${item.color}`}
              />

              <p className="text-sm text-gray-500">
                {item.label}
              </p>

              <h2 className="text-2xl font-bold mt-1">
                {item.value}
              </h2>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}