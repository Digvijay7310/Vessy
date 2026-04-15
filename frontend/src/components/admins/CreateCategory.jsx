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
    <form onSubmit={handleCreate} className="flex mb-3 border rounded-lg bg-white">
        <input 
           type="text"
           placeholder='New Category'
           value={name}
           onChange={(e) => setName(e.target.value)}
           className='border-0 outline-0 p-2 rounded w-full'
        />

        <button className="bg-green-500 text-white px-3">
            {loading ? "...": "Add"}
        </button>
    </form>
  )
}
