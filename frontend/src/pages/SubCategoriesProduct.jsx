import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import ProductList from "./ProductList"

export default function SubCategoriesProduct() {
  const { id } = useParams();
  const [products, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const fetchProductBySubCategory = async () => {
    try {
      setLoading(true);

      const res = await axiosInstance.get(
        `/categories/sub-category/${id}`
      );

      setProduct(res.data || []);
    } catch (error) {
      console.log("Error in finding product with subCategory");
      setProduct([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductBySubCategory();
  }, [id]);

  return (
    <div className="max-w-7xl mx-auto">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">

        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Products
          </h2>
          <p className="text-sm text-gray-500">
            Explore items from this category
          </p>
        </div>

        <button
          onClick={() => navigate(-1)}
          className="text-sm px-4 py-2 rounded-lg border hover:bg-gray-100 transition"
        >
          ← Back
        </button>
      </div>

      {/* LOADING SKELETON */}
      {loading && (
        <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="h-60 bg-gray-200 animate-pulse rounded-xl"
            />
          ))}
        </div>
      )}

      {/* EMPTY STATE */}
      {!loading && products.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-gray-500">
          <div className="text-4xl mb-2">🛒</div>
          <p className="text-lg font-medium">No products found</p>
          <p className="text-sm">Try another category or come back later</p>
        </div>
      )}

      {/* PRODUCT GRID */}
      {!loading && products.length > 0 && (
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
          {products.map((product) => (
            <div
              key={product._id}
              className=""
            >
              <ProductList product={product} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}