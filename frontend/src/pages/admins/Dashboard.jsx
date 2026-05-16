import React, { useState } from 'react'
import AllCategory from '../../components/admins/AllCategory'
import AllSubCategory from '../../components/admins/AllSubCategory'
import ProductList from '../../components/admins/ProductList'

export default function Dashboard() {

  const [refresh, setRefresh] = useState(false)

  const triggerRefresh = () => {
    setRefresh(prev => !prev)
  }

  return (
    <div className="space-y-6">

      {/* PAGE TITLE */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          Dashboard
        </h1>

        <p className="text-gray-500 text-sm">
          Welcome back Admin 👋
        </p>
      </div>

      {/* TOP STATS */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">

        <div className="bg-white rounded-xl shadow-sm p-5 border">
          <h3 className="text-sm text-gray-500">
            Total Categories
          </h3>

          <p className="text-3xl font-bold text-red-500 mt-2">
            <AllCategory refresh={refresh} />
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-5 border">
          <h3 className="text-sm text-gray-500">
            Total SubCategories
          </h3>

          <p className="text-3xl font-bold text-blue-500 mt-2">
            <AllSubCategory refresh={refresh} />
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-5 border">
          <h3 className="text-sm text-gray-500">
            Total Products
          </h3>

          <p className="text-3xl font-bold text-green-500 mt-2">
            --
          </p>
        </div>

      </div>

      {/* PRODUCTS SECTION */}
      <div className="bg-white rounded-xl shadow-sm border p-4">

        <div className="flex items-center justify-between mb-4">

          <h2 className="text-xl font-semibold">
            Recent Products
          </h2>

        </div>

        <ProductList refresh={refresh} />

      </div>

    </div>
  )
}