import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";

export default function MyOrders() {

    const [orders, setOrders] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {

        const fetchOrders = async () => {

            try {

                const res =
                    await axiosInstance.get(
                        "/orders/my-orders"
                    );

                setOrders(res.data.data);

            } catch (err) {

                console.error(
                    "Error fetching orders",
                    err
                );
            }
        };

        fetchOrders();

    }, []);

    const formatPrice = (price) =>
        new Intl.NumberFormat(
            "en-IN",
            {
                style: "currency",
                currency: "INR",
                maximumFractionDigits: 0
            }
        ).format(price);

    if (orders.length === 0) {

        return (

            <div className="flex flex-col items-center justify-center mt-24">

                <img
                    src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
                    alt="empty"
                    className="w-28 opacity-70"
                />

                <p className="mt-4 text-lg font-semibold text-gray-700">
                    No Orders Yet
                </p>

                <p className="text-sm text-gray-500">
                    Your placed orders will appear here
                </p>

            </div>
        );
    }

    return (

        <div className="max-w-5xl mx-auto px-3 md:px-6 py-5">

            {/* HEADER */}

            <div className="flex items-center justify-between mb-6">

                <h2 className="text-2xl md:text-3xl font-bold">
                    My Orders
                </h2>

                <span className="text-sm text-gray-500">
                    {orders.length} Orders
                </span>

            </div>

            {/* ORDERS */}

            <div className="flex flex-col gap-5">

                {
                    orders.map(order => (

                        <div
                            key={order.orderId}
                            onClick={() =>
                                navigate(
                                    `/order/${order.orderId}`
                                )
                            }
                            className="
                                bg-white
                                border
                                rounded-2xl
                                p-4
                                shadow-sm
                                hover:shadow-md
                                transition
                                cursor-pointer
                            "
                        >

                            {/* TOP */}

                            <div className="flex justify-between items-start gap-3">

                                <div>

                                    <p className="text-xs text-gray-500">
                                        Order ID
                                    </p>

                                    <p className="font-semibold text-sm md:text-base text-blue-600 break-all">
                                        {order.orderId}
                                    </p>

                                </div>

                                <div className="text-right">

                                    <p className="text-xs text-gray-500">
                                        Ordered On
                                    </p>

                                    <p className="text-sm font-medium">
                                        {
                                            new Date(
                                                order.createdAt
                                            ).toLocaleDateString()
                                        }
                                    </p>

                                </div>

                            </div>

                            {/* IMAGES */}

                            <div className="flex items-center gap-2 mt-5 overflow-x-auto pb-2">

                                {
                                    order.items.map((item, idx) => (

                                        <div
                                            key={idx}
                                            className="
                                                min-w-[65px]
                                                h-[65px]
                                                rounded-xl
                                                border
                                                bg-gray-50
                                                p-1
                                                flex
                                                items-center
                                                justify-center
                                            "
                                        >

                                            <img
                                                src={
                                                    item.image?.[0] ||
                                                    "https://via.placeholder.com/80"
                                                }
                                                alt={item.name}
                                                className="
                                                    w-full
                                                    h-full
                                                    object-contain
                                                    rounded-lg
                                                "
                                            />

                                        </div>
                                    ))
                                }

                            </div>

                            {/* PRODUCT NAMES */}

                            <div className="mt-4">

                                <p className="font-semibold text-gray-800 line-clamp-1">

                                    {
                                        order.items
                                            .map(item => item.name)
                                            .join(", ")
                                    }

                                </p>

                                <p className="text-sm text-gray-500 mt-1">

                                    {
                                        order.items.length
                                    } Items

                                </p>

                            </div>

                            {/* PRICE + STATUS */}

                            <div className="flex flex-wrap items-center justify-between gap-3 mt-5">

                                {/* PRICE */}

                                <div>

                                    <p className="text-xs text-gray-500">
                                        Total Amount
                                    </p>

                                    <p className="text-lg font-bold text-green-600">
                                        {
                                            formatPrice(
                                                order.finalAmount
                                            )
                                        }
                                    </p>

                                </div>

                                {/* STATUS */}

                                <div className="flex gap-2 flex-wrap">

                                    <span
                                        className={`
                                            px-3 py-1 rounded-full
                                            text-xs font-semibold
                                            ${
                                                order.paymentStatus === "Paid"
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-yellow-100 text-yellow-700"
                                            }
                                        `}
                                    >

                                        {order.paymentStatus}

                                    </span>

                                    <span
                                        className={`
                                            px-3 py-1 rounded-full
                                            text-xs font-semibold
                                            ${
                                                order.orderStatus === "Delivered"
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-blue-100 text-blue-700"
                                            }
                                        `}
                                    >

                                        {order.orderStatus}

                                    </span>

                                </div>

                            </div>

                            {/* DELIVERY */}

                            {
                                order.expectedDelivery && (

                                    <div className="mt-4 border-t pt-3">

                                        <p className="text-sm text-gray-600">

                                            Expected Delivery:
                                            {" "}

                                            <span className="font-semibold">

                                                {
                                                    new Date(
                                                        order.expectedDelivery
                                                    ).toDateString()
                                                }

                                            </span>

                                        </p>

                                    </div>
                                )
                            }

                        </div>
                    ))
                }

            </div>

        </div>
    );
}