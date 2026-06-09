import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import AddCart from "../components/AddCart";
import AddWishList from "../components/AddWishList";
import OtherProducts from "../components/OtherProducts";

export default function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [otherProducts, setOtherProducts] = useState([]);
  const [otherCategoryProducts, setOtherCategoryProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);

        const res = await axiosInstance.get(`/products/product/${id}`);

        setProduct(res.data.product);
        setOtherProducts(res.data.otherProducts || []);
        setOtherCategoryProducts(res.data.otherCategoryProducts || []);
      } catch (error) {
        console.error(error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // ---------------- LOADING ----------------
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-2 gap-8 animate-pulse">
        <div className="h-[400px] bg-gray-200 rounded-xl"></div>
        <div className="flex flex-col gap-4">
          <div className="h-8 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          <div className="h-10 bg-gray-200 rounded w-1/3"></div>
        </div>
      </div>
    );
  }

  // ---------------- NOT FOUND ----------------
  if (!product) {
    return (
      <div className="text-center mt-20 text-gray-500">
        No Product Found
      </div>
    );
  }

  const formatPrice = (p = 0) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(p);

  return (
    <div className="space-y-12">

      {/* ================= PRODUCT MAIN ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* IMAGE */}
        <div className="bg-white rounded-xl p-4 shadow-sm border flex items-center justify-center relative">

          <img
            src={product.image?.[0]}
            alt={product.name}
            width={400}
            height={400}
            loading="lazy"
            className="max-w-sm object-contain"
          />

          <div className="absolute top-3 left-3">
            <AddWishList />
          </div>

        </div>

        {/* DETAILS */}
        <div className="flex flex-col gap-4 md:sticky md:top-24">

          {/* NAME */}
          <h1 className="text-2xl font-semibold text-gray-900">
            {product.name}
          </h1>

          {/* STOCK */}
          <p className="text-sm font-semibold text-red-600">
            {product.stock > 0
              ? `In Stock: ${product.stock}`
              : "Out of Stock"}
          </p>

          {/* DESCRIPTION */}
          <p className="text-gray-600 text-sm leading-relaxed">
            {product.description}
          </p>

          {/* PRICE */}
          <div className="text-2xl font-bold text-green-600">
            {formatPrice(product.price)}
          </div>

          {/* ACTIONS */}
          <div className="flex flex-wrap gap-3 mt-3">
            <AddCart productId={product._id} />

            <button className="px-5 py-2 rounded-lg border border-black text-black hover:bg-black hover:text-white transition">
              Buy Now
            </button>
          </div>

          {/* INFO */}
          <div className="mt-6 text-xs text-gray-500 space-y-1">
            <p>✔ Secure payment</p>
            <p>✔ Fast delivery available</p>
            <p>✔ Easy returns</p>
          </div>

        </div>

      </div>

      {/* ================= RELATED ================= */}
      {otherProducts.length > 0 && (
        <div>
          <h2 className="text-lg md:text-xl font-semibold">
            Related Products
          </h2>
          <OtherProducts otherProducts={otherProducts} />
        </div>
      )}

      {/* ================= CATEGORY ================= */}
      {otherCategoryProducts.length > 0 && (
        <div>
          <h2 className="text-lg md:text-xl font-semibold">
            Explore More in this Category
          </h2>
          <OtherProducts otherProducts={otherCategoryProducts} />
        </div>
      )}

    </div>
  );
}