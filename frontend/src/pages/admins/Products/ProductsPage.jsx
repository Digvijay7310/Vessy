import React, { useState } from "react";
import AddProduct from "../../../components/admins/AddProduct";
import ProductList from "../../../components/admins/ProductList";

export default function ProductsPage() {
  const [refresh, setRefresh] = useState(false);

  const triggerRefresh = () => {
    setRefresh((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-zinc-100 p-4 md:p-6">

      {/* PAGE HEADER */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          Products Management
        </h1>

        <p className="text-sm text-gray-500 mt-1">
          Create, manage and update your store products
        </p>
      </div>

      {/* MAIN SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* ADD PRODUCT */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5">

            <div className="mb-4">
              <h2 className="text-lg font-semibold text-gray-800">
                Add Product
              </h2>

              <p className="text-sm text-gray-500">
                Create new products for your store
              </p>
            </div>

            <AddProduct refresh={triggerRefresh} />
          </div>
        </div>

        {/* PRODUCT LIST */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5 h-full">

            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-semibold text-gray-800">
                  All Products
                </h2>

                <p className="text-sm text-gray-500">
                  Manage all available products
                </p>
              </div>

              <div className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm font-medium">
                Inventory
              </div>
            </div>

            <ProductList refresh={refresh} />
          </div>
        </div>

      </div>
    </div>
  );
}