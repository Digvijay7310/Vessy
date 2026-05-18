import React, { useEffect, useState } from "react";
import axiosInstance from "../../../utils/axiosInstance";
import StatCard from "../../../components/admins/StatCard";

export default function Dashboard() {

  const [data, setData] = useState({
    totalCategory: 0,
    totalSubCategory: 0,
    totalProducts: 0,
    totalOrder: 0,
  });

  const [loading, setLoading] = useState(false);

  const allData = async () => {
    try {
      setLoading(true);

      const res = await axiosInstance.get("/admins/all-data");

      setData(res.data.data);

    } catch (error) {
      console.log("Dashboard data fetch error", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    allData();
  }, []);

  const stats = [
    {
      title: "Categories",
      value: data.totalCategory,
      color: "text-red-500",
      bgColor: "bg-red-50",
    },
    {
      title: "SubCategories",
      value: data.totalSubCategory,
      color: "text-blue-500",
      bgColor: "bg-blue-50",
    },
    {
      title: "Products",
      value: data.totalProducts,
      color: "text-green-500",
      bgColor: "bg-green-50",
    },
    {
      title: "Orders",
      value: data.totalOrder,
      color: "text-amber-500",
      bgColor: "bg-amber-50",
    },
  ];

  return (
    <div className="p-4 md:p-6 bg-gray-100 min-h-screen">

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Dashboard
        </h1>

        <p className="text-sm text-gray-500 mt-1">
          Welcome back Admin 👋
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">

        {stats.map((item, index) => (
          <StatCard
            key={index}
            title={item.title}
            value={loading ? "..." : item.value}
            color={item.color}
            bgColor={item.bgColor}
          />
        ))}

      </div>

      {/* Recent Products */}
      <div className="mt-6 bg-white rounded-xl border shadow-sm p-4">

        <div className="flex items-center justify-between mb-4">

          <h2 className="text-lg font-semibold text-gray-800">
            Recent Products
          </h2>

        </div>

        <div className="overflow-x-auto">
          <p className="text-sm text-gray-500">
            No recent products available
          </p>

          {/* <ProductList /> */}
        </div>

      </div>

    </div>
  );
}