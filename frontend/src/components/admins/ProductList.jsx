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
    <div className="bg-white p-4 mt-4 max-w-sm rounded shadow">
      <h2 className="font-bold mb-2">Products</h2>

      {products.map(p => (
        <div key={p._id} className="flex flex-col border-b bg-zinc-100 py-2">
          <div className="flex flex-row gap-1 mb-1">
            <img src={p.image} alt={p._id} className="h-8 w-8 border rounded" />
            <p className="text-xs line-clamp-2">{p.name} - ₹{p.price}</p>
            
          </div>

          <div className="flex gap-2">
            <button className="bg-yellow-400 px-2 rounded">Edit</button>
            <button
              onClick={()=>handleDelete(p._id)}
              className="bg-red-500 text-white px-2 rounded"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}