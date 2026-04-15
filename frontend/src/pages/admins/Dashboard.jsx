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
    setRefresh(!refresh)
  }
  return (
    <div className='bg-zinc-300 shadow-lg shadow-amber-600 w-full'>
        <div className="flex gap-2">
          <Sidebar />
          <div className="flex flex-col gap-4">
            <Header />

          <div className="flex flex-wrap">
              {/* Create Category & Sub Category */}
            <div className=" flex flex-col gap-2 md:flex-row mb-2">
              <div className=" p-2 border">
                <h4>Create Category</h4>
                <CreateCategory/>
              </div>
              <div className=" p-2 border">
                <h4>Create Sub Category</h4>
                <CreateSubCategory/>
              </div>
            </div>

            {/* All Category & Sub Category List */}
            <div className="flex flex-col gap-2 md:flex-row mb-2">
              <div className="border p-2">
                <AllCategory />
              </div>
              <div className="border p-2">
                <AllSubCategory />
              </div>
            </div>

            {/* Create Product */}
            <div className="flex flex-col md:flex-row gap-2 p-2">
              <AddProduct />
              <ProductList/>
            </div>
          </div>
          </div>
        </div>

    </div>
  )
}
