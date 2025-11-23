import React, { useEffect, useState } from "react";
import { getAllProducts } from "../api/productApi";
import { getCart } from "../api/cartApi";
import ProductCard from "../components/ProductCard";

export default function UserProducts() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({ items: [] });

  useEffect(() => {
    // Fetch all products
    getAllProducts().then((res) => setProducts(res.data.data.products));

    // Fetch user cart
    getCart().then((res) => setCart(res.data.data));
  }, []);

  // Extract categories
  const categories = [...new Set(products.map((p) => p.category))];

  return (
    <div className="p-4">
      {categories.map((cat) => (
        <div key={cat._id} className="mb-8">
          <h2 className="text-xl font-bold mb-4">{cat}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {products
              .filter((p) => p.category === cat)
              .map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  cart={cart}
                  setCart={setCart}
                  isAdmin={false} // hide admin buttons
                />
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}
