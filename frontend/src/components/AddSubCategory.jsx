import React, { useState, useEffect } from 'react'
import axiosInstance from '../utils/axios'

function AddSubCategory({ refreshCategories }) {
  const [subCategoryName, setSubCategoryName] = useState("")
  const [file, setFile] = useState(null)
  const [parentCategoryName, setParentCategoryName] = useState("")
  const [categories, setCategories] = useState([])

  // Fetch all categories for dropdown
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axiosInstance.get("/categories/all")
        setCategories(res.data.data)
      } catch (err) {
        console.error(err)
      }
    }
    fetchCategories()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!file) {
      alert("Image is required")
      return
    }

    if (!parentCategoryName) {
      alert("Please select a parent category")
      return
    }

    try {
      const formData = new FormData()
      formData.append("name", subCategoryName)
      formData.append("parentCategoryName", parentCategoryName)
      formData.append("image", file)

      await axiosInstance.post("/categories/subcategory", formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      })

      alert("SubCategory added")
      setSubCategoryName("")
      setFile(null)
      setParentCategoryName("")
      refreshCategories()
    } catch (err) {
      console.error(err)
      alert("Failed to add subcategory")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
      <h4>Add SubCategory</h4>
      <input
        type="text"
        placeholder="SubCategory name"
        value={subCategoryName}
        onChange={(e) => setSubCategoryName(e.target.value)}
        required
        className="border rounded px-2 py-1"
      />
      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
        required
        className="border rounded px-2 py-1"
      />
      <select
        value={parentCategoryName}
        onChange={(e) => setParentCategoryName(e.target.value)}
        required
        className="border rounded px-2 py-1"
      >
        <option value="">Select Parent Category</option>
        {categories.map((cat) => (
          <option key={cat._id} value={cat.name}>
            {cat.name}
          </option>
        ))}
      </select>
      <button type="submit" className="bg-green-500 text-white px-2 py-1 rounded-lg">
        Add SubCategory
      </button>
    </form>
  )
}

export default AddSubCategory