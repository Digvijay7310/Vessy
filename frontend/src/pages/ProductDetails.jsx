import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import AddCart from "../components/AddCart";
import AddWishList from "../components/AddWishList";
import OtherProducts from "../components/OtherProducts";
import CartItems from '../components/CartItems'

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

  const formatPrice = (p = 0) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(p);

  // ---------------- LOADING ----------------
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-2 gap-10 animate-pulse">
        
        <div className="h-[420px] bg-slate-200 rounded-2xl"></div>

        <div className="flex flex-col gap-4">
          <div className="h-8 bg-slate-200 rounded w-3/4"></div>
          <div className="h-4 bg-slate-200 rounded w-full"></div>
          <div className="h-4 bg-slate-200 rounded w-2/3"></div>
          <div className="h-10 bg-slate-200 rounded w-1/3 mt-4"></div>
        </div>

      </div>
    );
  }

  // ---------------- NOT FOUND ----------------
  if (!product) {
    return (
      <div className="text-center mt-24 text-slate-500">
        Product not found
      </div>
    );
  }

  return (
    <div className="space-y-14 max-w-7xl mx-auto px-4 relative">

      {/* ================= MAIN SECTION ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

        {/* IMAGE SECTION */}
        <div
          className="
            relative
            bg-white
            rounded-2xl
            border border-slate-200
            shadow-sm
            p-6
            flex items-center justify-center
          "
        >
          <img
            src={product.image?.[0]}
            alt={product.name}
            className="max-h-[420px] object-contain"
          />

          {/* wishlist */}
          <div className="absolute top-4 left-4">
            <AddWishList productId={product._id} />
          </div>
        </div>

        {/* DETAILS */}
        <div className="flex flex-col gap-5 md:sticky md:top-24">

          {/* TITLE */}
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
            {product.name}
          </h1>

          {/* STOCK */}
          <p
            className={
              product.stock > 0
                ? "text-emerald-600 text-sm font-semibold"
                : "text-red-500 text-sm font-semibold"
            }
          >
            {product.stock > 0
              ? `In Stock (${product.stock})`
              : "Out of Stock"}
          </p>

          {/* DESCRIPTION */}
          <p className="text-slate-600 text-sm leading-relaxed">
            {product.description}
          </p>

          {/* PRICE */}
          <div className="text-3xl font-bold text-emerald-600 mt-2">
            {formatPrice(product.price)}
          </div>

          {/* ACTIONS */}
          <div className="flex flex-col sm:flex-row gap-3 mt-4">

            <AddCart productId={product._id} />

            <button
              className="
                px-6 py-3
                rounded-xl
                bg-slate-900
                text-white
                font-medium
                hover:bg-black
                active:scale-95
                transition
              "
            >
              Buy Now
            </button>

          </div>

          {/* FEATURES */}
          <div className="mt-6 space-y-2 text-sm text-slate-500">
            <p>✔ Secure payment</p>
            <p>✔ Fast delivery available</p>
            <p>✔ Easy returns & refund</p>
          </div>

        </div>
      </div>

      {/* ================= RELATED PRODUCTS ================= */}
      {otherProducts.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-slate-900">
            Related Products
          </h2>
          <OtherProducts otherProducts={otherProducts} />
        </section>
      )}

      {/* ================= CATEGORY PRODUCTS ================= */}
      {otherCategoryProducts.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-slate-900">
            More in this Category
          </h2>
          <OtherProducts otherProducts={otherCategoryProducts} />
        </section>
      )}

      <div
  className="
    fixed
    bottom-6
    right-2
    z-50
  "
>
  <CartItems />
  
</div>


    </div>

    
  );
}