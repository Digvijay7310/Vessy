import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";

export default function OrderDetail() {
    const { id } = useParams(); // route is /order/:id
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const res = await axiosInstance.get(`/orders/${id}`); // ✅ fetch single order
                setOrder(res.data.data);
            } catch (err) {
                console.error("Error fetching order", err);
            } finally {
                setLoading(false);
            }
        };
        fetchOrder();
    }, [id]);

    const formatPrice = (price) =>
        new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(price);

    if (loading) {
        return <p className="text-gray-500 mt-6 text-center">Loading order...</p>;
    }

    if (!order) {
        return <p className="text-red-500 mt-6 text-center">Order not found.</p>;
    }

    return (
        <div className="max-w-5xl mx-auto p-6 flex flex-col gap-6">
            <Link to="/my-orders" className="text-blue-600 underline mb-4">&larr; Back to Orders</Link>
            <h2 className="text-2xl font-bold mb-4">Order Details</h2>
            <p className="font-medium mb-2">Order ID: <span className="text-blue-600">{order.orderId}</span></p>
            <p className="text-gray-500 mb-4">Placed on: {new Date(order.createdAt).toLocaleString()}</p>

            <div className="flex flex-col gap-4">
                {order.items.map(item => (
                    <div key={item._id} className="flex items-center gap-4 border-b pb-2">
                        {/* <img
                            src={item.image[0]}
                            alt={item.name}
                            className="w-20 h-20 object-contain rounded-lg bg-gray-100 p-1"
                        /> */}
                        <div className="flex-1">
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-gray-500">{item.description}</p>
                            <p className="text-green-600 font-semibold">
                                {formatPrice(item.price)} x {item.quantity}
                            </p>
                        </div>
                        <p className="font-semibold">{formatPrice(item.price * item.quantity)}</p>
                    </div>
                ))}
            </div>

            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between mb-1">
                    <span>Subtotal:</span>
                    <span>{formatPrice(order.totalPrice)}</span>
                </div>
                <div className="flex justify-between mb-1">
                    <span>Platform Charge:</span>
                    <span>{formatPrice(order.platformCharge)}</span>
                </div>
                <div className="flex justify-between mb-1">
                    <span>Delivery Charge:</span>
                    <span>{formatPrice(order.deliveryCharge)}</span>
                </div>
                <div className="flex justify-between font-bold text-lg mt-2 text-green-700">
                    <span>Total Amount:</span>
                    <span>{formatPrice(order.finalAmount)}</span>
                </div>
                <div className="mt-2 text-sm text-gray-600">
                    Payment Method: {order.paymentMethod} | Payment Status: {order.paymentStatus}
                </div>
            </div>
        </div>
    );
}