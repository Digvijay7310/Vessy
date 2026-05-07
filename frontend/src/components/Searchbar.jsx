import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { BiSearch } from "react-icons/bi"
import axiosInstance from "../utils/axiosInstance"

export default function Searchbar() {
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const searchProducts = async (e) => {
    e.preventDefault()
    if (!search.trim()) return

    try {
      setLoading(true)

      const res = await axiosInstance.get("/products/", {
        params: { search }
      })

      // 👇 send data to new page
      navigate("/search", {
        state: {
          products: res.data.products,
          total: res.data.totalProducts
        }
      })

      setSearch("")
    } catch (error) {
      console.log("Error in search")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={searchProducts} className="flex items-center w-full bg-white rounded-full shadow-sm overflow-hidden border focus-within:border-emerald-600">
      
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search products..."
        className="flex-1 px-3 py-2 text-sm outline-none"
      />

      <button className="bg-green-600 p-3 text-white">
        {loading ? "..." : <BiSearch />}
      </button>
    </form>
  )
}