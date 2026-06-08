import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";

import ProfileHeader from "../../components/customers/ProfileHeader";
import StatCard from "../../components/customers/StatCard";
import OrderCard from "../../components/customers/OrderCard";

export default function UserProfile() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const res = await axiosInstance.get("/customer/me");
      setData(res.data);
    } catch (error) {
      console.log("Error fetching profile:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (loading) {
    return (
      <div className="p-6 text-center text-gray-500">
        Loading profile...
      </div>
    );
  }

  if (!data) {
    return (
      <div className="p-6 text-center text-red-500">
        No user data found
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto lg:px-8 space-y-8 overflow-x-hidden">

      {/* PROFILE HEADER */}
      <div className="w-full overflow-hidden">
        <ProfileHeader user={data.customer} />
      </div>

      {/* STATS GRID (FIXED RESPONSIVE) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
        <StatCard
          label="Total Orders"
          value={data.stats.totalOrders}
          color="blue"
        />

        <StatCard
          label="Delivered"
          value={data.stats.deliveredOrders}
          color="green"
        />

        <StatCard
          label="Total Spent"
          value={`₹${data.stats.totalSpent}`}
          color="emerald"
        />

        <StatCard
          label="Cart Items"
          value={data.cart.totalItems}
          color="gray"
        />
      </div>

      {/* RECENT ORDERS (FIXED MOBILE GRID) */}
      <div className="w-full">
        <h2 className="text-lg sm:text-xl font-semibold mb-4">
          Recent Orders
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
          {data.recentOrders.map((order) => (
            <OrderCard key={order._id} order={order} />
          ))}
        </div>
      </div>

    </div>
  );
}