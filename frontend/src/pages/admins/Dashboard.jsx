import React, { useState } from 'react'
import AllCategory from '../../components/admins/AllCategory'
import AllSubCategory from '../../components/admins/AllSubCategory'
import Sidebar from '../../components/admins/Sidebar'
import CreateCategory from '../../components/admins/CreateCategory'
import CreateSubCategory from '../../components/admins/CreateSubCategory'
import ProductList from '../../components/admins/ProductList'
import Header from '../../components/admins/Header'
import AddProduct from '../../components/admins/AddProduct'


export default function Dashboard() {
  const [refresh, setRefresh] = useState(false)

  const triggerRefresh = () => {
    setRefresh(prev => !prev)
  }

  return (
    <div className="bg-zinc-100 min-h-screen w-full flex">

      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN AREA */}
      <div className="flex-1 flex flex-col">

        <Header />

        <div className="p-4 space-y-6">

          {/* TOP SECTION: CREATE FORMS */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

            <div className="bg-white p-4 rounded shadow">
              <h4 className="font-semibold mb-2">Create Category</h4>
              <CreateCategory onSuccess={triggerRefresh} />
            </div>

            <div className="bg-white p-4 rounded shadow">
              <h4 className="font-semibold mb-2">Create Sub Category</h4>
              <CreateSubCategory onSuccess={triggerRefresh} />
            </div>

            <div className="bg-white p-4 rounded shadow">
              <h4 className="font-semibold text-center">Create Product</h4>
              <AddProduct refresh={triggerRefresh} />
            </div>

          </div>

          {/* MIDDLE SECTION: LISTS */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

            <div className="bg-white p-4 rounded shadow">
              <AllCategory refresh={refresh} />
            </div>

            <div className="bg-white p-4 rounded shadow">
              <AllSubCategory refresh={refresh} />
            </div>

            <div className="bg-white p-4 rounded shadow">
              <ProductList refresh={refresh} />
            </div>

          </div>

    

        </div>
      </div>
    </div>
  )
}
