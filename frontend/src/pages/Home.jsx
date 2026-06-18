import { useState, useEffect } from "react";
import CategoryWithSubCategory from "../components/CategoryWithSubCategory";
import axiosInstance from "../utils/axiosInstance";

export default function Home() {
  const [user, setUser] = useState(null);

  const fetchUser = async () => {
    try {
      const res = await axiosInstance.get("/customer/me");
      setUser(res.data);
    } catch (error) {
      setUser(null);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const address = user?.customer?.shippingAddresses?.find(
    (addr) => addr.isDefault
  );

  return (
    <div className="flex flex-col gap-6">

      {user && (
  <div className="w-full bg-gradient-to-r from-green-900 to-green-700 text-white p-8 rounded-xl">

    <h1 className="text-xl font-bold">
      Welcome back 👋
    </h1>

    <p className="text-green-300">
      {user.customer.fullName}
    </p>

    {user?.customer?.shippingAddresses?.find(a => a.isDefault) && (
      <div className=" max-w-sm bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20">

        <p className="text-xs uppercase tracking-wider text-gray-200">
          Default Delivery Address
        </p>

        <p className="text-sm font-semibold mt-2">
          {user.customer.shippingAddresses.find(a => a.isDefault).name}
        </p>

        <p className="text-sm text-gray-200 mt-1 truncate">
          {user.customer.shippingAddresses.find(a => a.isDefault).street}
        </p>

        <div className="flex justify-between mt-3 text-sm">
          <p>
            📍 {user.customer.shippingAddresses.find(a => a.isDefault).city}
          </p>

          <p className="font-bold text-yellow-300">
            PIN {user.customer.shippingAddresses.find(a => a.isDefault).pincode}
          </p>
        </div>

      </div>
    )}

    <p className="text-white/80 mt-4 text-sm">
      Discover products, deals & categories in one place
    </p>

  </div>
)}

      <CategoryWithSubCategory />

    </div>
  );
}