import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";

export default function MyOrders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                setLoading(true);

                const res = await axiosInstance.get("/orders/my-orders");
                setOrders(res.data?.data || []);

            } catch (err) {
                setError(err.response?.data?.message || "Failed to load orders");
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    const formatPrice = (price) =>
        new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0,
        }).format(price);

    const getImage = (img) => {
        if (!img) return "https://via.placeholder.com/100";
        if (typeof img === "string") return img;
        if (Array.isArray(img) && img.length > 0) return img[0];
        return "https://via.placeholder.com/100";
    };

    // ================= LOADING =================
    if (loading) {
        return (
            <div className="h-[70vh] flex items-center justify-center">
                <div className="animate-pulse text-gray-500 text-lg">
                    Loading your orders...
                </div>
            </div>
        );
    }

    // ================= ERROR =================
    if (error) {
        return (
            <div className="h-[70vh] flex items-center justify-center text-red-500 font-medium">
                {error}
            </div>
        );
    }

    // ================= EMPTY =================
    if (!orders.length) {
        return (
            <div className="h-[70vh] flex flex-col items-center justify-center text-gray-500">
                <img
                    src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
                    className="w-28 opacity-70"
                />
                <p className="mt-4 text-lg font-semibold">
                    No Orders Yet
                </p>
                <p className="text-sm">
                    Start shopping to see your orders here
                </p>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-6">

            {/* HEADER */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">
                    My Orders
                </h1>
                <p className="text-gray-500 text-sm mt-1">
                    Track and manage all your purchases
                </p>
            </div>

            {/* ORDERS GRID */}
            <div className="space-y-6">

                {orders.map((order) => (
                    <div
                        key={order.orderId}
                        onClick={() =>
                            navigate(`/order/${order.orderId}`)
                        }
                        className="
                            bg-white
                            border
                            rounded-2xl
                            shadow-sm
                            hover:shadow-xl
                            transition-all
                            duration-300
                            cursor-pointer
                            overflow-hidden
                        "
                    >

                        {/* TOP BAR */}
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between px-5 py-4 bg-gray-50 border-b">

                            <div>
                                <p className="text-xs text-gray-500">
                                    ORDER ID
                                </p>
                                <p className="text-sm font-semibold text-blue-600 break-all">
                                    {order.orderId}
                                </p>
                            </div>

                            <div className="mt-2 md:mt-0 text-sm text-gray-600">
                                Ordered on{" "}
                                <span className="font-medium text-gray-900">
                                    {new Date(order.createdAt).toDateString()}
                                </span>
                            </div>

                        </div>

                        {/* BODY */}
                        <div className="p-5 flex flex-col md:flex-row gap-5">

                            {/* IMAGES */}
                            <div className="flex gap-2 overflow-x-auto">

                                {order.items.slice(0, 3).map((item, idx) => (
                                    <div
                                        key={idx}
                                        className="
                                            w-20 h-20
                                            rounded-xl
                                            border
                                            bg-gray-50
                                            flex
                                            items-center
                                            justify-center
                                            shrink-0
                                            hover:scale-105
                                            transition
                                        "
                                    >
                                        <img
                                            src={getImage(item.image)}
                                            alt={item.name}
                                            className="w-full h-full object-contain p-1"
                                        />
                                    </div>
                                ))}

                                {order.items.length > 3 && (
                                    <div className="w-20 h-20 flex items-center justify-center text-sm text-gray-500 border rounded-xl bg-gray-100">
                                        +{order.items.length - 3}
                                    </div>
                                )}

                            </div>

                            {/* INFO */}
                            <div className="flex-1">

                                <p className="font-semibold text-gray-900 line-clamp-1">
                                    {order.items.map(i => i.name).join(", ")}
                                </p>

                                <p className="text-sm text-gray-500 mt-1">
                                    {order.items.length} Items Purchased
                                </p>

                                {/* PRICE */}
                                <div className="mt-4 text-xl font-bold text-green-600">
                                    {formatPrice(order.finalAmount)}
                                </div>

                            </div>

                            {/* STATUS */}
                            <div className="flex flex-col gap-2 md:items-end">

                                <span className={`
                                    px-3 py-1 rounded-full text-xs font-semibold
                                    ${order.paymentStatus === "Paid"
                                        ? "bg-green-100 text-green-700"
                                        : "bg-yellow-100 text-yellow-700"
                                    }
                                `}>
                                    {order.paymentStatus}
                                </span>

                                <span className={`
                                    px-3 py-1 rounded-full text-xs font-semibold
                                    ${order.orderStatus === "Delivered"
                                        ? "bg-green-100 text-green-700"
                                        : "bg-blue-100 text-blue-700"
                                    }
                                `}>
                                    {order.orderStatus}
                                </span>

                                <p className="text-xs text-gray-400 mt-2">
                                    Expected:{" "}
                                    {order.expectedDelivery
                                        ? new Date(order.expectedDelivery).toDateString()
                                        : "N/A"}
                                </p>

                            </div>

                        </div>

                    </div>
                ))}

            </div>
        </div>
    );
}