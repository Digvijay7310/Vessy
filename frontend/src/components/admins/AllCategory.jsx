import React, { useEffect, useState } from 'react'
import axiosInstance from '../../utils/axiosInstance'

export default function AllCategory({refresh}) {
  const [category, setCategory] = useState([])
  const [count, setCount] = useState(0)

  const getCategory = async () => {
    const res = await axiosInstance.get("/categories/all-category")

    setCategory(res.data.category)
    setCount(res.data.categoryCount)
  }

  useEffect(() => {
    getCategory()
  }, [refresh])

  return (
    <div className='bg-white p-3 w-xs rounded shadow border'>
      <h1 className='font-semibold mb-2'>
        Total Category: {count}
      </h1>

      <div className="h-32 overflow-y-auto">
        {category.map((item) => (
          <p key={item._id} className="text-xs border-b p-1 hover:bg-yellow-100 transition-colors duration-150">
            {item.name}
          </p>
        ))}
      </div>
    </div>
  )
}
