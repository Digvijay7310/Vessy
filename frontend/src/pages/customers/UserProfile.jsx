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
      <div className="p-10 text-center text-gray-500">
        Loading profile...
      </div>
    );
  }

  if (!data) {
    return (
      <div className="p-10 text-center text-red-500">
        No user data found
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">

      {/* PROFILE HEADER */}
      <ProfileHeader user={data.customer} />

      {/* STATS GRID */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

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

      {/* RECENT ORDERS */}
      <div>

        <h2 className="text-xl font-semibold mb-4">
          Recent Orders
        </h2>

        <div className="grid md:grid-cols-2 gap-4">

          {data.recentOrders.map((order) => (
            <OrderCard key={order._id} order={order} />
          ))}

        </div>

      </div>

    </div>
  );
}