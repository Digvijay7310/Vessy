import { useState, useEffect } from 'react'
import axiosInstance from '../utils/axiosInstance'
import { useNavigate } from 'react-router-dom'

export default function CategoryWithSubCategory() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const fetchCatAndSub = async () => {
    setLoading(true)
    try {
      const res = await axiosInstance.get("/categories/category-with-sub-category")
      setData(res.data)
    } catch (error) {
      console.log("Error in fetch category with subcategory")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCatAndSub()
  }, [])

  if (loading) {
    return <p className="text-center py-10">Loading...</p>
  }

  return (
    <div className="bg-white px-3 sm:px-6 md:px-10 lg:px-20 py-4">

      {data.map((cat, index) => (
        <div key={index} className="mb-8">

          {/* Category Title */}
          <h2 className="text-lg sm:text-xl font-semibold mb-3 border-b pb-2">
            {cat.categoryName}
          </h2>

          {/* Subcategories Grid */}
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">

            {cat.subCategories.map((sub, i) => (
              <div
                key={i}
                onClick={() => navigate(`/sub-category/${sub._id}`)}
                className="cursor-pointer bg-gray-50 hover:bg-gray-100 rounded-lg p-2 flex flex-col items-center transition shadow-sm hover:shadow-md"
              >

                {/* Image */}
                <img
                  src={sub.image}
                  alt={sub.name}
                  className="w-12 h-12 sm:w-14 sm:h-14 object-contain"
                />

                {/* Name */}
                <p className="text-[10px] sm:text-xs text-center font-medium mt-1 line-clamp-2">
                  {sub.name}
                </p>

              </div>
            ))}

          </div>

        </div>
      ))}

    </div>
  )
}