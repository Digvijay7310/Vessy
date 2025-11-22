import { useEffect, useState } from "react";
import { getProducts, deleteProduct } from "../../api/adminApi";
import { Link } from "react-router-dom";
import { useToast } from "../../hooks/useToast";

export default function Products() {
  const { toast } = useToast();
  const [products, setProducts] = useState([]);

  const loadProducts = () =>
    getProducts().then((res) => setProducts(res.data.data.products));

  useEffect(() => {
    loadProducts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await deleteProduct(id);
      toast.success("Product deleted successfully!");
      loadProducts();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete product");
    }
  };

  return (
    <div>
      <h1 className="text-2xl mb-4">Products</h1>

      <table className="w-full bg-white rounded shadow">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="p-3">Image</th>
            <th className="p-3">Name</th>
            <th className="p-3">Price</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.map((p) => (
            <tr key={p._id} className="border-b hover:bg-gray-100">
              <td className="p-3">
                <img
                  src={p.images?.[0]}
                  alt={p.name}
                  className="w-16 h-16 object-cover rounded"
                />
              </td>
              <td className="p-3">{p.name}</td>
              <td className="p-3">${p.price}</td>
              <td className="p-3 flex gap-3">
                <Link
                  to={`/products/edit/${p._id}`}
                  className="px-3 py-1 rounded bg-green-600 text-white"
                >
                  Edit
                </Link>

                <button
                  onClick={() => handleDelete(p._id)}
                  className="px-3 py-1 rounded bg-red-600 text-white"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
