import { useEffect, useCallback, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { Pencil, Trash2, PackageOpen } from "lucide-react";

export default function ProductList({ refresh }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ---------------- FETCH PRODUCTS ----------------
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const res = await axiosInstance.get("/products/get-products");

      setProducts(res?.data?.products || []);
    } catch (err) {
      console.log("FETCH ERROR:", err?.response?.data || err.message);
      setError("Failed to load products");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts, refresh]);

  // ---------------- DELETE PRODUCT ----------------
  const handleDelete = async (id) => {
    const ok = window.confirm("Are you sure you want to delete this product?");
    if (!ok) return;

    try {
      await axiosInstance.delete(`/products/product/${id}`);

      // Optimized: remove from state instead of full refetch
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      console.log("DELETE ERROR:", err?.response?.data || err.message);
      alert("Failed to delete product");
    }
  };

  // ---------------- UI STATES ----------------
  if (loading) {
    return (
      <div className="py-10 text-center text-gray-500">
        Loading products...
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-10 text-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border shadow-sm p-4 md:p-5">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-xl font-bold text-gray-800">
            Products
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Manage all products
          </p>
        </div>

        <div className="bg-red-50 text-red-500 px-3 py-1.5 rounded-lg text-sm font-semibold">
          {products.length} Items
        </div>
      </div>

      {/* EMPTY STATE */}
      {products.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12">
          <PackageOpen size={60} className="text-gray-300" />

          <h3 className="mt-4 text-lg font-semibold text-gray-700">
            No Products Found
          </h3>

          <p className="text-sm text-gray-500 mt-1">
            Add products to display here
          </p>
        </div>
      ) : (
        /* PRODUCT GRID */
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
          {products.map((p) => (
            <ProductCard
              key={p._id}
              product={p}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ---------------- PRODUCT CARD (REUSABLE) ----------------
function ProductCard({ product, onDelete }) {
  return (
    <div className="border rounded-xl overflow-hidden bg-white hover:shadow-md transition group">

      {/* IMAGE (smaller) */}
      <div className="h-36 bg-gray-100 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition"
        />
      </div>

      {/* CONTENT (compact) */}
      <div className="p-2 space-y-1">

        <h3 className="font-medium text-sm text-gray-800 line-clamp-2">
          {product.name}
        </h3>

        <p className="text-[11px] text-gray-500 line-clamp-1">
          {product.description || "No description"}
        </p>

        {/* PRICE */}
        <div className="flex items-center justify-between">
          <span className="font-bold text-sm text-red-500">
            ₹{product.price}
          </span>
        </div>

        {/* ACTIONS */}
        <div className="flex gap-2 pt-1">

          <button
            className="flex-1 flex items-center justify-center gap-1 border border-yellow-400 text-yellow-500 py-1.5 rounded-lg text-xs hover:bg-yellow-50 transition"
          >
            <Pencil size={14} />
            Edit
          </button>

          <button
            onClick={() => onDelete(product._id)}
            className="flex-1 flex items-center justify-center gap-1 bg-red-500 text-white py-1.5 rounded-lg text-xs hover:bg-red-600 transition"
          >
            <Trash2 size={14} />
            Delete
          </button>

        </div>
      </div>
    </div>
  );
}