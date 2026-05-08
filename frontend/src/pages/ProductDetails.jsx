import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import ProductList from "../components/ProductList";
import OtherProducts from "../components/OtherProducts";
import OtherCategoryProducts from "../components/OtherCategoryProducts";
import AddCart from "../components/AddCart";

export default function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [otherProducts, setOtherProducts] = useState([]);
  const [otherCategoryProducts, setOtherCategoryProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProduct = async () => {
    try {
      setLoading(true);

      const res = await axiosInstance.get(`/products/product/${id}`);

      setProduct(res.data.product);
      setOtherProducts(res.data.otherProducts || []);
      setOtherCategoryProducts(res.data.otherCategoryProducts || []);
    } catch (error) {
      console.log(error);
      setProduct(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="h-96 bg-gray-200 animate-pulse rounded-xl"></div>
        <div className="space-y-4">
          <div className="h-6 bg-gray-200 animate-pulse rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 animate-pulse rounded w-full"></div>
          <div className="h-4 bg-gray-200 animate-pulse rounded w-2/3"></div>
          <div className="h-8 bg-gray-200 animate-pulse rounded w-1/3"></div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center mt-20 text-gray-500">
        No Product Found
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">

      {/* PRODUCT MAIN SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* IMAGE */}
        <div className="bg-white rounded-xl p-4 shadow-sm border">
          <img
            src={product.image?.[0]}
            alt={product.name}
            className="w-full h-[350px] object-contain"
          />
        </div>

        {/* DETAILS */}
        <div className="flex flex-col gap-4 md:sticky md:top-24 h-fit">

          <h1 className="text-xl md:text-2xl font-semibold text-gray-900">
            {product.name}
          </h1>

          <p className="text-gray-600 text-sm leading-relaxed">
            {product.description}
          </p>

          <div className="text-2xl font-bold text-green-600">
            ₹{product.price}
          </div>

          {/* ACTIONS */}
          <div className="flex gap-3 mt-3">

            <AddCart productId={product._id} />

            <button className="px-5 py-2 rounded-lg border border-black text-black hover:bg-black hover:text-white transition">
              Buy Now
            </button>

          </div>

          {/* EXTRA INFO BOX */}
          <div className="mt-6 text-xs text-gray-500 space-y-1">
            <p>✔ Secure payment</p>
            <p>✔ Fast delivery available</p>
            <p>✔ Easy returns</p>
          </div>

        </div>
      </div>

      {/* RELATED PRODUCTS */}
      <div className="mt-12">
        <OtherProducts otherProducts={otherProducts} />
      </div>

      <div className="my-8 border-t"></div>

      <div>
        <OtherCategoryProducts
          otherCategoryProducts={otherCategoryProducts}
        />
      </div>

    </div>
  );
}