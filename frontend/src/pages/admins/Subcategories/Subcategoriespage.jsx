import React, { useState } from "react";
import CreateSubCategory from "../../../components/admins/CreateSubCategory";
import AllSubCategory from "../../../components/admins/AllSubCategory";

export default function Subcategories() {
  const [refresh, setRefresh] = useState(false);

  const triggerRefresh = () => {
    setRefresh((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-zinc-100 md:p-6">

      {/* PAGE HEADER */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          Sub Categories Management
        </h1>

        <p className="text-sm text-gray-500 mt-1">
          Create and manage product sub categories
        </p>
      </div>

      {/* MAIN SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* CREATE SUBCATEGORY */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl p-2">

            <div className="mb-4">
              <h2 className="text-lg font-semibold text-gray-800">
                Add Sub Category
              </h2>

              <p className="text-sm text-gray-500">
                Create sub categories under category
              </p>
            </div>

            <CreateSubCategory onSuccess={triggerRefresh} />
          </div>
        </div>

        {/* ALL SUBCATEGORY */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5 h-full">

            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-semibold text-gray-800">
                  All Sub Categories
                </h2>

                <p className="text-sm text-gray-500">
                  View all available sub categories
                </p>
              </div>

              <div className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
                Manage
              </div>
            </div>

            <AllSubCategory refresh={refresh} />
          </div>
        </div>

      </div>
    </div>
  );
}