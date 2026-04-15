import React, { useState } from 'react'
import AllCategory from '../../components/admins/AllCategory'
import AllSubCategory from '../../components/admins/AllSubCategory'
import Sidebar from '../../components/admins/Sidebar'
import CreateCategory from '../../components/admins/CreateCategory'
import CreateSubCategory from '../../components/admins/CreateSubCategory'
import ProductList from '../../components/admins/ProductList'


export default function Dashboard() {
  const [refresh, setRefresh] = useState(false)

  const triggerRefresh = () => {
    setRefresh(!refresh)
  }
  return (
    <div className='bg-gray-200'>
        <section className='flex gap-2'>
            <Sidebar />
            <div className="bg-gray-100 p-4 w-sm">
                <h3 className="text-xl font-semibold text-center mb-3">Category & SubCategory</h3>
                
                <div className="flex flex-col gap-3 md:flex-row ">
                  <div className="flex flex-col gap-2">
                  {/* Create */}
                <CreateCategory />
                <CreateSubCategory />
                
                {/* List */}
                <AllCategory refresh={refresh} />
                <AllSubCategory refresh={refresh} />
                </div>

                <ProductList />
                </div>
            </div>
        </section>

    </div>
  )
}
