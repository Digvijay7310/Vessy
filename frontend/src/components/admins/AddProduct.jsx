import { useEffect, useState } from "react"
import axiosInstance from "../../utils/axiosInstance"

export default function AddProduct({ refresh }) {

  const [loading, setLoading] = useState(false)

  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    subCategory: "",
  })

  const [image, setImage] = useState(null)
  const [categories, setCategories] = useState([])
  const [subCategories, setSubCategories] = useState([])

  // ---------------- FETCH CATEGORIES ----------------
  useEffect(() => {
    const fetchCategories = async () => {
      const res = await axiosInstance.get("/categories/all-category")
      setCategories(res.data.category)
    }

    fetchCategories()
  }, [])

  // ---------------- FETCH ALL SUBCATEGORIES ONCE ----------------
  useEffect(() => {
    const fetchSubCategories = async () => {
      const res = await axiosInstance.get("/categories/all-sub-category")
      setSubCategories(res.data.subcategory)
    }

    fetchSubCategories()
  }, [])

  // ---------------- SUBMIT ----------------
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!form.name || !form.price || !form.category || !form.subCategory) {
      return alert("All fields required")
    }

    if (!image) return alert("Image required")

    try {
      setLoading(true)

      const data = new FormData()
      data.append("name", form.name)
      data.append("price", form.price)
      data.append("description", form.description)
      data.append("category", form.category)
      data.append("subCategory", form.subCategory)
      data.append("image", image)

      await axiosInstance.post("/products/create-product", data)

      // reset
      setForm({
        name: "",
        price: "",
        description: "",
        category: "",
        subCategory: "",
      })

      setImage(null)

      if (refresh) refresh()

    } catch (err) {
      console.log(err.response?.data || err.message)
    } finally {
      setLoading(false)
    }
  }

  // ---------------- UI ----------------
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-2 p-3 border rounded bg-white"
    >

      <input
        placeholder="Product Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        className="border p-2"
      />

      <input
        placeholder="Price"
        type="number"
        value={form.price}
        onChange={(e) => setForm({ ...form, price: e.target.value })}
        className="border p-2"
      />

      <textarea
        placeholder="Description"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
        className="border p-2"
      />

      {/* CATEGORY */}
      <select
        value={form.category}
        onChange={(e) =>
          setForm({ ...form, category: e.target.value })
        }
        className="border p-2"
      >
        <option value="">Select Category</option>
        {categories.map((c) => (
          <option key={c._id} value={c._id}>
            {c.name}
          </option>
        ))}
      </select>

      {/* SUBCATEGORY (NO FILTER, SIMPLE LIKE POSTMAN) */}
      <select
        value={form.subCategory}
        onChange={(e) =>
          setForm({ ...form, subCategory: e.target.value })
        }
        className="border p-2"
      >
        <option value="">Select SubCategory</option>
        {subCategories.map((s) => (
          <option key={s._id} value={s._id}>
            {s.name}
          </option>
        ))}
      </select>

      {/* IMAGE */}
      <input
        type="file"
        onChange={(e) => setImage(e.target.files[0])}
      />

      {/* BUTTON */}
      <button
        disabled={loading}
        className={`py-2 text-white rounded ${
          loading ? "bg-gray-400" : "bg-blue-500"
        }`}
      >
        {loading ? "Creating..." : "Add Product"}
      </button>
    </form>
  )
}