import { useState } from "react";
import { addProduct } from "../../api/adminApi";
import { useToast } from "../../hooks/useToast";

export default function AddProduct() {
  const { toast } = useToast();
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    images: [],
  });

  const handleImage = (e) => {
    setForm({ ...form, images: Array.from(e.target.files) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const body = new FormData();
    Object.keys(form).forEach((key) => {
      if (key === "images") {
        form.images.forEach((img) => body.append("images", img));
      } else {
        body.append(key, form[key]);
      }
    });

    try {
      await addProduct(body);
      toast.success("Product added!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed");
    }
  };

  return (
    <div>
      <h1 className="text-2xl mb-4">Add Product</h1>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">

        <input
          type="text"
          placeholder="Name"
          className="w-full p-3 border rounded"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          type="number"
          placeholder="Price"
          className="w-full p-3 border rounded"
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />

        <textarea
          placeholder="Description"
          className="w-full p-3 border rounded"
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        ></textarea>


        <input
          type="text"
          placeholder="Category"
          className="w-full p-3 border rounded"
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        />

        <input
          type="file"
          multiple
          className="w-full p-3 border rounded"
          onChange={handleImage}
        />

        <button className="px-6 py-2 bg-gray-900 text-white rounded">
          Add Product
        </button>

      </form>
    </div>
  );
}
