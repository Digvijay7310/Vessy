import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Search, X } from "lucide-react";
import axiosInstance from "../utils/axiosInstance";

export default function Searchbar() {
  const navigate = useNavigate();
  const wrapperRef = useRef(null);

  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const [showSuggestions, setShowSuggestions] = useState(false);

  const [suggestions, setSuggestions] = useState({
    products: [],
    categories: [],
    subCategories: [],
  });

  // Search Submit
  const handleSearch = async (e) => {
    e.preventDefault();

    const query = search.trim();

    if (!query || loading) return;

    try {
      setLoading(true);

      const { data } = await axiosInstance.get("/products", {
        params: {
          search: query,
        },
      });

      navigate("/search", {
        state: {
          products: data.products,
          total: data.totalProducts,
          query,
        },
      });

      setShowSuggestions(false);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // Suggestions
  useEffect(() => {
    const timer = setTimeout(async () => {
      const query = search.trim();

      if (!query) {
        setSuggestions({
          products: [],
          categories: [],
          subCategories: [],
        });

        return;
      }

      try {
        const { data } = await axiosInstance.get(
          "/products/search-suggestion",
          {
            params: {
              q: query,
            },
          }
        );

        setSuggestions(data);
        setShowSuggestions(true);
      } catch (err) {
        console.log(err);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  // Outside Click
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleOutsideClick
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        handleOutsideClick
      );
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="relative w-full"
    >
      {/* SEARCH FORM */}
      <form
        onSubmit={handleSearch}
        className="
          flex items-center
          h-12 md:h-14
          w-full

          bg-slate-100
          hover:bg-slate-50

          rounded-2xl
          border border-transparent

          transition-all duration-300

          focus-within:bg-white
          focus-within:border-emerald-500
          focus-within:shadow-lg
          focus-within:shadow-emerald-100
        "
      >
        {/* ICON */}
        <div className="pl-4 text-slate-400">
          <Search size={20} />
        </div>

        {/* INPUT */}
        <input
          type="text"
          value={search}
          onFocus={() => setShowSuggestions(true)}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          placeholder="Search products, fruits, snacks..."
          className="
            flex-1
            h-full
            px-3

            bg-transparent
            outline-none

            text-sm md:text-base
            font-medium

            text-slate-700
            placeholder:text-slate-400
          "
        />

      
      
        {/* DESKTOP SEARCH BTN */}
        <button
          type="submit"
          disabled={loading}
          className="
            hidden md:flex

            h-full
            px-6

            items-center
            justify-center

            bg-emerald-600
            hover:bg-emerald-700

            rounded-r-2xl

            text-white
            font-medium

            transition
          "
        >
          {loading ? "..." : "Search"}
        </button>
      </form>

      {/* SUGGESTIONS */}
      {showSuggestions &&
        (
          suggestions.products.length > 0 ||
          suggestions.categories.length > 0 ||
          suggestions.subCategories.length > 0
        ) && (
          <div
            className="
              absolute
              top-full
              left-0
              right-0

              mt-2

              bg-white
              border

              rounded-2xl
              shadow-2xl

              overflow-hidden
              z-50
            "
          >
            {/* PRODUCTS */}
            {suggestions.products.length > 0 && (
              <>
                <div className="px-4 py-2 bg-slate-50 text-xs font-semibold text-slate-500">
                  PRODUCTS
                </div>

                {suggestions.products.map(
                  (product) => (
                    <button
                      key={product._id}
                      type="button"
                      onClick={() => {
                        navigate(
                          `/products/product/${product._id}`
                        );

                        setShowSuggestions(
                          false
                        );
                      }}
                      className="
                        w-full
                        flex
                        items-center
                        gap-3

                        px-4
                        py-3

                        hover:bg-slate-50
                      "
                    >
                      {product.image?.[0] && (
                        <img
                          src={product.image[0]}
                          alt={product.name}
                          className="
                            w-10
                            h-10
                            rounded-lg
                            object-cover
                          "
                        />
                      )}

                      <span className="font-medium text-sm">
                        {product.name}
                      </span>
                    </button>
                  )
                )}
              </>
            )}

            {/* CATEGORIES */}
            {suggestions.categories.length >
              0 && (
              <>
                <div className="px-4 py-2 bg-slate-50 text-xs font-semibold text-slate-500 border-t">
                  CATEGORIES
                </div>

                {suggestions.categories.map(
                  (category) => (
                    <button
                      key={category._id}
                      type="button"
                      className="
                        w-full
                        text-left

                        px-4
                        py-3

                        hover:bg-slate-50
                      "
                    >
                      📂 {category.name}
                    </button>
                  )
                )}
              </>
            )}

            {/* SUB CATEGORIES */}
            {suggestions.subCategories
              .length > 0 && (
              <>
                <div className="px-4 py-2 bg-slate-50 text-xs font-semibold text-slate-500 border-t">
                  SUB CATEGORIES
                </div>

                {suggestions.subCategories.map(
                  (subCategory) => (
                    <button
                      key={subCategory._id}
                      type="button"
                      className="
                        w-full
                        text-left

                        px-4
                        py-3

                        hover:bg-slate-50
                      "
                    >
                      🏷️{" "}
                      {subCategory.name}
                    </button>
                  )
                )}
              </>
            )}
          </div>
        )}
    </div>
  );
}