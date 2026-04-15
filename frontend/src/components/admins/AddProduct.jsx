import { useEffect, useState } from "react"
import axiosInstance from "../../utils/axiosInstance"

export default function AddProduct({ refresh }) {
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

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    const res = await axiosInstance.get("/categories/all-category")
    setCategories(res.data.category)
  }

  const fetchSubCategories = async () => {
    const res = await axiosInstance.get("/categories/all-sub-category")
    setSubCategories(res.data.subcategory)
  }

  useEffect(() => {
    if (form.category) {
      fetchSubCategories()
    }
  }, [form.category])

  const filteredSub = subCategories.filter(
    (sub) => sub.parentCategory === form.category
  )

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!image) return alert("Image required")

    const data = new FormData()
    Object.keys(form).forEach((key) => data.append(key, form[key]))
    data.append("image", image)

    try {
      await axiosInstance.post("/products/create-product", data)
      refresh()

      setForm({
        name: "",
        price: "",
        description: "",
        category: "",
        subCategory: "",
      })
      setImage(null)

    } catch (err) {
      console.log(err.response?.data)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-xs p-2 border rounded-lg bg-white">

      <input placeholder="Name" value={form.name}
        onChange={(e)=>setForm({...form, name:e.target.value})}
        className="border p-2"/>

      <input placeholder="Price" value={form.price}
        onChange={(e)=>setForm({...form, price:e.target.value})}
        className="border p-2"/>

      <textarea placeholder="Description"
        value={form.description}
        onChange={(e)=>setForm({...form, description:e.target.value})}
        className="border p-2"/>

      <select
        value={form.category}
        onChange={(e)=>setForm({...form, category:e.target.value})}
        className="border p-2"
      >
        <option value="">Select Category</option>
        {categories.map(c => (
          <option key={c._id} value={c._id}>{c.name}</option>
        ))}
      </select>

      <select
        value={form.subCategory}
        onChange={(e)=>setForm({...form, subCategory:e.target.value})}
        className="border p-2"
      >
        <option value="">Select SubCategory</option>
        {filteredSub.map(s => (
          <option key={s._id} value={s._id}>{s.name}</option>
        ))}
      </select>

      <input type="file" onChange={(e)=>setImage(e.target.files[0])}/>

      <button className="bg-blue-500 text-white py-2 rounded">
        Add Product
      </button>
    </form>
  )
}