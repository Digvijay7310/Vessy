import React, { useState } from 'react'
import axiosInstance from '../../utils/axiosInstance'

export default function CreateCategory({refresh}) {
    const [name, setName] = useState("")
    const [loading, setLoading] = useState(false)

    const handleCreate = async(e) => {
        e.preventDefault()
        if(!name) return
        try {
            setLoading(true)
            await axiosInstance.post("/categories/", {name})
            setName("")
            refresh() // Refresh parent data when new category created
        } catch (error) {
            console.log("Error in create category")
        } finally {
            setLoading(false)
        }
        
    } 
  return (
    <form onSubmit={handleCreate} className="flex gap-2 mb-3">
        <input 
           type="text"
           placeholder='New Category'
           value={name}
           onChange={(e) => setName(e.target.value)}
           className='border p-2 rounded w-full'
        />

        <button className="bg-blue-500 text-white px-3 rounded">
            {loading ? "...": "Add"}
        </button>
    </form>
  )
}
