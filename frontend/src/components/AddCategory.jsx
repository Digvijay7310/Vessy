import React, { useState } from 'react'
import axiosInstance from '../utils/axios'

function AddCategory({ refreshCategories }) {
  const [categoryName, setCategoryName] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axiosInstance.post(
        "/categories/category",
        { name: categoryName },
        { withCredentials: true }
      )
      alert("Category added")
      setCategoryName("")
      refreshCategories()
    } catch (err) {
      console.error(err)
      alert("Failed to add category")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
      <h4>Add Category</h4>
      <input
        type="text"
        placeholder="Category name"
        value={categoryName}
        onChange={(e) => setCategoryName(e.target.value)}
        required
        className="border rounded px-2 py-1"
      />
      <button type="submit" className="bg-green-500 text-white px-2 py-1 rounded-lg">
        Add Category
      </button>
    </form>
  )
}

export default AddCategory