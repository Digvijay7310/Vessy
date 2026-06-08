import React, { useState } from "react";
import AllCategory from "../../../components/admins/AllCategory";
import CreateCategory from "../../../components/admins/CreateCategory";
import { Layers, Plus, List } from "lucide-react";

export default function CategoriesPage() {
  const [refresh, setRefresh] = useState(false);

  const triggerRefresh = () => {
    setRefresh((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-4 md:p-8">

      {/* HEADER */}
      <div className="mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-black text-white flex items-center justify-center">
            <Layers size={20} />
          </div>

          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Categories Management
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Create, organize and manage product categories
            </p>
          </div>
        </div>
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* CREATE CATEGORY */}
        <div className="">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition p-6">

            {/* HEADER */}
            <div className="flex items-center gap-2 mb-5">
              <div className="w-9 h-9 rounded-lg bg-green-100 text-green-600 flex items-center justify-center">
                <Plus size={18} />
              </div>

              <div>
                <h2 className="text-lg font-semibold text-gray-800">
                  Add Category
                </h2>
                <p className="text-xs text-gray-500">
                  Create new product category
                </p>
              </div>
            </div>

            <CreateCategory onSuccess={triggerRefresh} />
          </div>
        </div>

        {/* CATEGORY LIST */}
        <div className="">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition p-6">

            {/* HEADER */}
            <div className="flex items-center justify-between mb-5">

              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
                  <List size={18} />
                </div>

                <div>
                  <h2 className="text-lg font-semibold text-gray-800">
                    All Categories
                  </h2>
                  <p className="text-xs text-gray-500">
                    Manage existing categories
                  </p>
                </div>
              </div>

              <div className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-600">
                Live Data
              </div>

            </div>

            {/* LIST */}
            <div className="rounded-xl border border-gray-100 p-3 bg-gray-50">
              <AllCategory refresh={refresh} />
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}