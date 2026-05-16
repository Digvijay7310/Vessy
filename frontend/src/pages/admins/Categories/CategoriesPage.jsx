import React, { useState } from "react";
import AllCategory from "../../../components/admins/AllCategory";
import CreateCategory from "../../../components/admins/CreateCategory";

export default function CategoriesPage() {
  const [refresh, setRefresh] = useState(false);

  const triggerRefresh = () => {
    setRefresh((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-zinc-100 p-4 md:p-6">

      {/* PAGE HEADER */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          Categories Management
        </h1>

        <p className="text-sm text-gray-500 mt-1">
          Create and manage all product categories
        </p>
      </div>

      {/* TOP SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* CREATE CATEGORY */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5">

            <div className="mb-4">
              <h2 className="text-lg font-semibold text-gray-800">
                Add New Category
              </h2>

              <p className="text-sm text-gray-500">
                Create category for products
              </p>
            </div>

            <CreateCategory onSuccess={triggerRefresh} />
          </div>
        </div>

        {/* ALL CATEGORY */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5 h-full">

            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-semibold text-gray-800">
                  All Categories
                </h2>

                <p className="text-sm text-gray-500">
                  View all created categories
                </p>
              </div>

              <div className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-medium">
                Manage
              </div>
            </div>

            <AllCategory refresh={refresh} />
          </div>
        </div>

      </div>
    </div>
  );
}