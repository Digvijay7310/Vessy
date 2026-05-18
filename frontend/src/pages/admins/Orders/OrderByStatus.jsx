import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../../utils/axiosInstance";

export default function OrdersByStatus() {

  const { status } = useParams();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchOrders = async () => {
    try {
      setLoading(true);

      const res = await axiosInstance.get(`/orders/${status}`);

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

  return (
    <div className="p-6">

      <h1 className="text-xl font-bold mb-4">
        {status.toUpperCase()} Orders
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
              className="border rounded p-4 bg-white"
            >

              <p className="font-semibold">
                Order ID: {order._id}
              </p>

              <p>User: {order.userId?.name}</p>

              <p>
                Status:
                <span className="ml-2 font-bold text-blue-600">
                  {order.orderStatus}
                </span>
              </p>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}