import { useEffect, useState } from "react";
import { getAllProducts } from "../../api/productApi"; // ya tumhare productApi me jo function hai

export default function UserProducts() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

 useEffect(() => {
  getAllProducts()
    .then((res) => {
      const allProducts = res.data.data.products || [];
      setProducts(allProducts);

      const uniqueCategories = [
        ...new Set(allProducts.map((p) => p.category)),
      ];
      setCategories(uniqueCategories);
    })
    .catch(() => setProducts([]));
}, []);


  // Filter products by selected category
  const filteredProducts = selectedCategory
    ? products.filter((p) => p.category === selectedCategory)
    : products;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Products</h1>

      {/* Category Filter */}
      <div className="mb-4">
        <select
          className="border p-2 rounded"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map((cat, idx) => (
            <option key={idx} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {filteredProducts.map((p) => (
          <div
            key={p._id}
            className="border rounded p-3 shadow hover:shadow-lg cursor-pointer"
          >
            <img
              src={p.images?.[0]}
              alt={p.name}
              className="w-full h-40 object-cover rounded"
            />
            <h3 className="font-semibold mt-2">{p.name}</h3>
            <p className="text-gray-600">${p.price}</p>

            {/* ❌ USER ke liye Edit/Delete buttons nahi */}
          </div>
        ))}
      </div>
    </div>
  );
}
