import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import ProductList from "../components/ProductList";
const OtherProducts = React.lazy(() => import("../components/OtherProducts"))
const OtherCategoryProducts = React.lazy(() => import("../components/OtherCategoryProducts"))
import AddCart from "../components/AddCart";

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

  // ---------------------------
  // LOADING SKELETON
  // ---------------------------
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-2 gap-8 animate-pulse">
        <div className="h-[400px] bg-gray-200 rounded-xl"></div>
        <div className="flex flex-col gap-4">
          <div className="h-8 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          <div className="h-10 bg-gray-200 rounded w-1/3"></div>
          <div className="h-12 bg-gray-200 rounded w-full mt-4"></div>
        </div>
      </div>
    );
  }

  // ---------------------------
  // NO PRODUCT FOUND
  // ---------------------------
  if (!product) {
    return (
      <div className="text-center mt-20 text-gray-500">
        No Product Found
      </div>
    );
  }

  // ---------------------------
  // PRODUCT DETAILS
  // ---------------------------
  return (
    <div className="space-y-12">

      {/* PRODUCT MAIN SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* IMAGE */}
        <div className="bg-white rounded-xl p-4 shadow-sm border flex items-center justify-center">
          <img
            src={product.image?.[0]}
            alt={product.name}
            width={400}
            height={400}
            loading="lazy"
            className="w-full max-h-[400px] object-contain"
          />
        </div>

        {/* DETAILS */}
        <div className="flex flex-col gap-4 md:sticky md:top-24">
          <h1 className="text-2xl font-semibold text-gray-900">{product.name}</h1>

          <p className="text-gray-600 text-sm leading-relaxed">{product.description}</p>

          <div className="text-2xl font-bold text-green-600">₹{product.price}</div>

          {/* ACTION BUTTONS */}
          <div className="flex flex-wrap gap-3 mt-3">
            <AddCart productId={product._id} />
            <button className="px-5 py-2 rounded-lg border border-black text-black hover:bg-black hover:text-white transition">
              Buy Now
            </button>
          </div>

          {/* EXTRA INFO */}
          <div className="mt-6 text-xs text-gray-500 space-y-1">
            <p>✔ Secure payment</p>
            <p>✔ Fast delivery available</p>
            <p>✔ Easy returns</p>
          </div>
        </div>

      </div>

      {/* RELATED PRODUCTS */}
      {otherProducts.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Related Products</h2>
          <OtherProducts otherProducts={otherProducts} />
        </div>
      )}

      <hr className="my-8 border-gray-200" />

      {/* OTHER CATEGORY PRODUCTS */}
      {otherCategoryProducts.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Explore More in this Category</h2>
          <OtherCategoryProducts otherCategoryProducts={otherCategoryProducts} />
        </div>
      )}

    </div>
  );
}