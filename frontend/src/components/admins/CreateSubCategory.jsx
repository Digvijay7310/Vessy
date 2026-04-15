import React, { useEffect, useState } from 'react'
import axiosInstance from '../../utils/axiosInstance'

export default function CreateSubCategory({refresh}) {
    const [name, setName] = useState("")
    const [image, setImage] = useState(null)
    const [categories, setCategories] = useState([])
    const [parentCategory, setParentCategory] = useState("")

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
        }

        const formData = new FormData()
        formData.append("name", name)
        formData.append("parentCategory", parentCategory)
        formData.append("image", image)

        try {
            await axiosInstance.post("/categories/sub", formData)

            setName("")
            setImage(null)
            refresh()
        } catch (error) {
            console.log(":Error creating subcategory")
        }
    } 
  return (
    <form onSubmit={handleCreate} className="flex flex-col gap-2 mb-3">
        <input type="text"
        placeholder='SubCategory Name'
        value={name}
        onChange={(e) => setName(e.target.value)}
        className='border p-2 rounded'
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

        <button className="bg-green-500 text-white py-2 rounded">Add SubCategory</button>
    </form>
  )
}
