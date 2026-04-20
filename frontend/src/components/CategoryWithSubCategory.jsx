import { useState, useEffect } from 'react'
import axiosInstance from '../utils/axiosInstance'
import {useNavigate} from 'react-router-dom'

export default function CategoryWithSubCategory() {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()


    const fetchCatAndSub = async() => {
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
    return (
  <div className="bg-white p-4 md:mx-30">
  {data.map((cat, index) => (
    <div key={index} className="mb-6">
      
      {/* Category Title */}
      <h2 className="text-xl font-semibold mb-3 border-b pb-1">
        {cat.categoryName}
      </h2>

      {/* Subcategories Grid */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        {cat.subCategories.map((sub, i) => (
          <div
            key={i}
            className="cursor-pointer bg-gray-100 hover:shadow-md p-1 rounded-lg flex flex-col items-center transition"
            onClick={() => navigate(`/sub-category/${sub._id}`)}
          >
            <img
              src={sub.image}
              alt={sub.name}
              className="h-15 w-15 object-contain mb-2"
            />
            <p className="text-sm text-center font-medium">
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
