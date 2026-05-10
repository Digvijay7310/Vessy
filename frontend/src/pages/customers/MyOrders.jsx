import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";

export default function MyOrders() {
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await axiosInstance.get("/orders/my-orders");
                setOrders(res.data.data);
            } catch (err) {
                console.error("Error fetching orders", err);
            }
        };
        fetchOrders();
    }, []);

    if (orders.length === 0) {
        return <p className="text-gray-500 mt-6 text-center">You have no orders yet.</p>;
    }

    return (
        <div className="max-w-4xl mx-auto p-6 flex flex-col gap-4">
            <h2 className="text-2xl font-bold mb-4">My Orders</h2>
            {orders.map(order => (
                <div
                    key={order.orderId}
                    className="border p-4 rounded-lg shadow-sm hover:bg-gray-50 cursor-pointer"
                    onClick={() => navigate(`/order/${order.orderId}`)}
                >
                    <div className="flex justify-between items-center">
                        <p className="font-medium">Order ID: <span className="text-blue-600">{order.orderId}</span></p>
                        <p className="text-gray-500 text-sm">{new Date(order.createdAt).toLocaleString()}</p>
                    </div>
                    <p className={`mt-1 text-sm font-medium ${
                        order.orderStatus === "Pending"
                            ? "text-yellow-700"
                            : "text-green-700"
                    }`}>Status: {order.orderStatus}</p>
                </div>
            ))}
        </div>
    );
}