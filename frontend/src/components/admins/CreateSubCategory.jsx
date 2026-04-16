import React, { useEffect, useState } from 'react'
import axiosInstance from '../../utils/axiosInstance'

export default function CreateSubCategory({onSuccess}) {
    const [name, setName] = useState("")
    const [image, setImage] = useState(null)
    const [categories, setCategories] = useState([])
    const [parentCategory, setParentCategory] = useState("")
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchCategories = async() => {
            const res = await axiosInstance.get("/categories/all-category")
            setCategories(res.data.category)
        }
        fetchCategories()
    }, [])

    const handleCreate = async (e) =>{
        e.preventDefault()
        if(!name || !parentCategory || !image){
            alert("All Fields are required")
            return
        }

        const formData = new FormData()
        formData.append("name", name)
        formData.append("parentCategory", parentCategory)
        formData.append("image", image)

        try {
            setLoading(true)
            await axiosInstance.post("/categories/sub", formData)

            setName("")
            setImage(null)
            if (onSuccess) onSuccess()
        } catch (error) {
            console.log(":Error creating subcategory")
        } finally {
            setLoading(false)
        }
    } 
  return (
    <form onSubmit={handleCreate} className="flex flex-col p-2 border bg-gray-100 gap-2 mb-3">
        <input type="text"
        placeholder='SubCategory Name'
        value={name}
        onChange={(e) => setName(e.target.value)}
        className='border outline-0 p-2 rounded'
        />

        <select value={parentCategory}
        onChange={(e) => setParentCategory(e.target.value)}
        className='border p-2 rounded'
        >
            <option value="">Select Category</option>
            {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                    {cat.name}
                </option>
            ))}
        </select>

        <input type="file"
        onChange={(e) => setImage(e.target.files[0])}
        />

        <button className="bg-green-500 text-white py-2 rounded">{loading ? "Creating...." : "Add SubCategory"}</button>
    </form>
  )
}
