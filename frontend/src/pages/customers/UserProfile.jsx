import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";

import ProfileHeader from "../../components/customers/ProfileHeader";
import StatCard from "../../components/customers/StatCard";
import OrderCard from "../../components/customers/OrderCard";
import AddressCard from "../../components/customers/AddressCard";
import OrderCards from "../../components/customers/OrderCards";
import NotFoundCard from "../../components/customers/NotFoundCard";
import WishlistStatCard from "../../components/customers/WishlistStatCard";

export default function UserProfile() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  // console.log(data);
  

  const fetchUser = async () => {
    try {
      const res = await axiosInstance.get("/customer/me");
      setData(res.data);
      // console.log(res.data)
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
      <NotFoundCard />
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto lg:px-8 space-y-2 overflow-x-hidden">

      {/* PROFILE HEADER */}
      <div className="w-full overflow-hidden">
        <ProfileHeader user={data.customer} />
      </div>

      {/* Address */}
      <AddressCard address={data.customer.shippingAddresses[0]} />

      {/* STATS GRID (FIXED RESPONSIVE) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
        <WishlistStatCard count={data.customer.wishlist.length} />
  <StatCard
    label="Total Orders"
    value={data.stats.totalOrders}
  />

  <StatCard
    label="Delivered"
    value={data.stats.deliveredOrders}
  />

  <StatCard
    label="Total Spent"
    value={`₹${data.stats.totalSpent}`}
  />

  <StatCard
    label="Cart Items"
    value={data.cart.totalItems}
  />
       </div>

      <div className="w-full my-5">
  <div className="flex items-center justify-between">
    <h2 className="text-lg font-semibold text-gray-900">
      Recent Orders
    </h2>
  </div>

  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
    {data.recentOrders.map((order) => (
      <OrderCard
        key={order._id}
        order={order}
      />
    ))}
  </div>
</div>

    </div>
  );
}