import React, { useEffect, useState } from "react";
import axiosInstance from "../../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import {
  Clock3,
  BadgeCheck,
  PackageCheck,
  Truck,
  Bike,
  RotateCcw,
  ShoppingBag,
  Package,
  CheckCircle2,
} from "lucide-react";

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
      setData(res.data.data || {});
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  const cards = [
    {
      title: "Total",
      value: data.totalOrders,
      icon: ShoppingBag,
      color: "bg-gray-100 text-gray-700",
      route: "all",
    },
    {
      title: "Pending",
      value: data.pendingOrders,
      icon: Clock3,
      color: "bg-yellow-100 text-yellow-600",
      route: "pending",
    },
    {
      title: "Confirmed",
      value: data.confirmedOrders,
      icon: BadgeCheck,
      color: "bg-blue-100 text-blue-600",
      route: "confirmed",
    },
    {
      title: "Processing",
      value: data.processingOrders,
      icon: PackageCheck,
      color: "bg-violet-100 text-violet-600",
      route: "processing",
    },
    {
      title: "Shipped",
      value: data.shippedOrders,
      icon: Truck,
      color: "bg-purple-100 text-purple-600",
      route: "shipped",
    },
    {
      title: "Out for Delivery",
      value: data.outForDelivery,
      icon: Bike,
      color: "bg-orange-100 text-orange-600",
      route: "out-for-delivery",
    },
    {
      title: "Delivered",
      value: data.deliveredOrders,
      icon: CheckCircle2,
      color: "bg-green-100 text-green-600",
      route: "delivered",
    },
    {
      title: "Returned",
      value: data.returnedOrders,
      icon: RotateCcw,
      color: "bg-red-100 text-red-600",
      route: "returned",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4">

      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Orders Dashboard</h1>
        <p className="text-gray-500">Manage all orders efficiently</p>
      </div>

      {/* LOADING */}
      {loading ? (
        <div className="h-[60vh] flex items-center justify-center">
          <div className="w-10 h-10 border-4 border-gray-200 border-t-black rounded-full animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4">

          {cards.map((c, i) => {
            const Icon = c.icon;

            return (
              <div
                key={i}
                onClick={() => navigate(`/admin/orders/${c.route}`)}
                className="bg-white p-4 rounded-2xl shadow-sm border hover:shadow-lg transition cursor-pointer"
              >
                <div className="flex justify-between">
                  <div className={`p-2 rounded-xl ${c.color}`}>
                    <Icon size={20} />
                  </div>
                </div>

                <h2 className="text-sm text-gray-500 mt-3">{c.title}</h2>
                <p className="text-2xl font-bold">{c.value}</p>
              </div>
            );
          })}

        </div>
      )}
    </div>
  );
}