import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById, updateProduct } from "../../api/adminApi";
import { useToast } from "../../hooks/useToast";

export default function EditProduct() {
  const { id } = useParams();
  const { toast } = useToast();

  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    stock: "",
    category: "",
  });

  useEffect(() => {
    getProductById(id).then((res) => setForm(res.data.data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateProduct(id, form);
    toast.success("Product updated!");
  };

  return (
    <div>
      <h1 className="text-2xl mb-4">Edit Product</h1>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">

        <input
          type="text"
          value={form.name}
          className="w-full p-3 border rounded"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          type="number"
          value={form.price}
          className="w-full p-3 border rounded"
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />

        <textarea
          value={form.description}
          className="w-full p-3 border rounded"
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
        ></textarea>

        <input
          type="text"
          value={form.category}
          className="w-full p-3 border rounded"
          onChange={(e) =>
            setForm({ ...form, category: e.target.value })
          }
        />

        <button className="px-6 py-2 bg-gray-900 text-white rounded">
          Save Changes
        </button>

      </form>
    </div>
  );
}
