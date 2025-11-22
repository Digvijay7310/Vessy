import { useEffect, useState, useContext } from "react";
import { getMyOrders, getSingleOrder, cancelOrder } from "../api/orderApi";
import { useToast } from "../hooks/useToast";

export default function Orders() {
    const { toast } = useToast();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const res = await getMyOrders();
            setOrders(res.data.data);
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to fetch orders");
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = async (orderId) => {
        if (!window.confirm("Are you sure you want to cancel this order?")) return;
        try {
            await cancelOrder(orderId);
            toast.success("Order cancelled successfully");
            fetchOrders();
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to cancel order");
        }
    };

    if (loading) return <p className="text-center mt-10">Loading...</p>;
    if (orders.length === 0) return <p className="text-center mt-10">No orders found</p>;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">My Orders</h1>
            <div className="space-y-4">
                {orders.map((order) => (
                    <div key={order._id} className="border p-4 rounded shadow">
                        <div className="flex justify-between mb-2">
                            <span>Order ID: {order._id}</span>
                            <span>Status: {order.status}</span>
                        </div>
                        <div className="mb-2">
                            {order.items.map((item) => (
                                <div key={item.productId._id} className="flex justify-between">
                                    <span>{item.productId.title} x {item.quantity}</span>
                                    <span>${(item.productId.price * item.quantity).toFixed(2)}</span>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-between font-bold">
                            <span>Total:</span>
                            <span>${order.total.toFixed(2)}</span>
                        </div>
                        {order.status === "Pending" && (
                            <button
                                onClick={() => handleCancel(order._id)}
                                className="mt-2 bg-red-600 text-white py-1 px-3 rounded hover:bg-red-700"
                            >
                                Cancel Order
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
