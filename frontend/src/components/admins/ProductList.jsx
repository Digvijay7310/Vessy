import { useEffect, useState } from "react"
import axiosInstance from "../../utils/axiosInstance"

export default function ProductList({ refresh }) {
  const [products, setProducts] = useState([])

  const fetchProducts = async () => {
    const res = await axiosInstance.get("/products/get-products")
    setProducts(res.data.products)
  }

  useEffect(() => {
    fetchProducts()
  }, [refresh])

  const handleDelete = async (id) => {
    if (!confirm("Delete this product?")) return

    await axiosInstance.delete(`/products/product/${id}`)
    fetchProducts()
  }

  return (
    <div className="bg-white p-2 mt-4 overflow-y-scroll rounded shadow">
      <h2 className="font-bold mb-2">Products</h2>

      {products.map(p => (
        <div key={p._id} className="flex flex-col border-b mb-2 hover:bg-yellow-100 transition-all duration-150">
          <div className="flex flex-row gap-1 mb-1 px-2">
            <img src={p.image} alt={p._id} className="h-15 w-15 border rounded" />
            <p className="text-xs line-clamp-2">{p.name} - ₹{p.price}</p>
            
          </div>

          <div className="flex justify-around gap-2 mb-1">
            <button className="bg-yellow-400 w-1/3 px-2 rounded hover:cursor-pointer hover:scale-105">Edit</button>
            <button
              onClick={()=>handleDelete(p._id)}
              className="bg-red-500 w-1/3 text-white px-2 rounded hover:cursor-pointer hover:scale-105"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}