import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";

import {
  Pencil,
  Trash2,
  PackageOpen,
} from "lucide-react";

export default function ProductList({ refresh }) {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  // ---------------- FETCH PRODUCTS ----------------
  const fetchProducts = async () => {

    try {

      setLoading(true);

      const res = await axiosInstance.get(
        "/products/get-products"
      );

      setProducts(res.data.products);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }
  };

  useEffect(() => {
    fetchProducts();
  }, [refresh]);

  // ---------------- DELETE PRODUCT ----------------
  const handleDelete = async (id) => {

    const confirmDelete = window.confirm(
      "Delete this product?"
    );

    if (!confirmDelete) return;

    try {

      await axiosInstance.delete(
        `/products/product/${id}`
      );

      fetchProducts();

    } catch (error) {

      console.log(error);

    }
  };

  return (
    <div
      className="
        bg-white
        rounded-2xl
        border
        shadow-sm
        p-4 md:p-5
      "
    >

      {/* HEADER */}
      <div
        className="
          flex items-center justify-between
          mb-5
        "
      >

        <div>

          <h2
            className="
              text-xl font-bold
              text-gray-800
            "
          >
            Products
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Manage all products
          </p>

        </div>

        <div
          className="
            bg-red-50
            text-red-500
            px-3 py-1.5
            rounded-lg
            text-sm font-semibold
          "
        >
          {products.length} Items
        </div>

      </div>

      {/* LOADING */}
      {loading ? (
        <div className="py-10 text-center text-gray-500">
          Loading products...
        </div>
      ) : products.length === 0 ? (

        /* EMPTY STATE */
        <div
          className="
            flex flex-col items-center justify-center
            py-12
          "
        >

          <PackageOpen
            size={60}
            className="text-gray-300"
          />

          <h3
            className="
              mt-4 text-lg font-semibold
              text-gray-700
            "
          >
            No Products Found
          </h3>

          <p className="text-sm text-gray-500 mt-1">
            Add products to display here
          </p>

        </div>

      ) : (

        /* PRODUCT GRID */
        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
            xl:grid-cols-4
            gap-5
          "
        >

          {products.map((p) => (

            <div
              key={p._id}
              className="
                border rounded-2xl
                overflow-hidden
                bg-white
                hover:shadow-lg
                transition-all duration-300
                group
              "
            >

              {/* IMAGE */}
              <div
                className="
                  h-52
                  overflow-hidden
                  bg-gray-100
                "
              >

                <img
                  src={p.image}
                  alt={p.name}
                  className="
                    w-full h-full
                    object-cover
                    group-hover:scale-105
                    transition-all duration-300
                  "
                />

              </div>

              {/* CONTENT */}
              <div className="p-4">

                <h3
                  className="
                    font-semibold
                    text-gray-800
                    line-clamp-1
                  "
                >
                  {p.name}
                </h3>

                <p
                  className="
                    text-sm text-gray-500
                    line-clamp-2
                    mt-1
                    min-h-[40px]
                  "
                >
                  {p.description || "No description"}
                </p>

                <div
                  className="
                    flex items-center justify-between
                    mt-4
                  "
                >

                  <span
                    className="
                      text-lg font-bold
                      text-red-500
                    "
                  >
                    ₹{p.price}
                  </span>

                </div>

                {/* BUTTONS */}
                <div
                  className="
                    flex gap-3
                    mt-5
                  "
                >

                  <button
                    className="
                      flex-1
                      flex items-center justify-center gap-2
                      border border-yellow-400
                      text-yellow-500
                      py-2 rounded-xl
                      hover:bg-yellow-50
                      transition-all duration-300
                    "
                  >

                    <Pencil size={16} />

                    Edit

                  </button>

                  <button
                    onClick={() =>
                      handleDelete(p._id)
                    }
                    className="
                      flex-1
                      flex items-center justify-center gap-2
                      bg-red-500
                      text-white
                      py-2 rounded-xl
                      hover:bg-red-600
                      transition-all duration-300
                    "
                  >

                    <Trash2 size={16} />

                    Delete

                  </button>

                </div>

              </div>

            </div>
          ))}

        </div>
      )}

    </div>
  );
}