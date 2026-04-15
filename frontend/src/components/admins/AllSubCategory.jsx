import {useState, useEffect} from 'react'
import axiosInstance from '../../utils/axiosInstance'

export default function AllSubCategory(refresh) {
  const [subcategory, setSubCategory] = useState([])
  const [count, setCount] = useState(0)

  const getSubCategory = async () => {
    const res = await axiosInstance.get("/categories/all-sub-category")

    setSubCategory(res.data.subcategory)
    setCount(res.data.subcategoryCount)
    // console.log(res.data.subcategory)
  }

  useEffect(() => {
    getSubCategory()
  }, [refresh])

  return (
    <div className='bg-white p-3 w-xs rounded shadow border'>
      <h1 className='font-semibold mb-2'>
        Total Sub Category: {count}
      </h1>

      <div className="h-32 overflow-y-auto">
        {subcategory.map((item) => (
          <div key={item._id} className="text-xs flex justify-between items-center border-b mb-2 hover:bg-yellow-100 transition-all duration-150">
            <p>{item.name}</p>
            <img src={item.image} alt={item.name}
            className='h-8 w-8 rounded border'
            /> 
          </div>
        ))}
      </div>
    </div>
  )
}
