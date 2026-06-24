import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Loader2 } from "lucide-react";
import { AiOutlineSearch } from "react-icons/ai";
import axiosInstance from "../utils/axiosInstance";
import SearchSuggestions from "./SearchSuggestions";

export default function Searchbar() {
  const navigate = useNavigate();
  const wrapperRef = useRef(null);

  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const [suggestions, setSuggestions] = useState({
    products: [],
    categories: [],
    subCategories: [],
  });

  // Fetch Suggestions
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
            params: { q: query },
          }
        );

        setSuggestions(data);
        setShowSuggestions(true);
        setActiveIndex(-1);
      } catch (err) {
        console.log(err);
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [search]);

  // Search Submit
  const handleSearch = async (e) => {
    e.preventDefault();

    const query = search.trim();

    if (!query || loading) return;

    try {
      setLoading(true);

      const { data } = await axiosInstance.get("/products", {
        params: { search: query },
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

  // Flatten Suggestions For Keyboard Nav
  const allSuggestions = [
    ...suggestions.products.map((item) => ({
      ...item,
      type: "product",
    })),
    ...suggestions.categories.map((item) => ({
      ...item,
      type: "category",
    })),
    ...suggestions.subCategories.map((item) => ({
      ...item,
      type: "subcategory",
    })),
  ];

  const goToSuggestion = (item) => {
    if (item.type === "product") {
      navigate(`/products/product/${item._id}`);
    }

    if (item.type === "category") {
      navigate(`/category/${item._id}`);
    }

    if (item.type === "subcategory") {
      navigate(`/sub-category/${item._id}`);
    }

    setShowSuggestions(false);
  };

  const handleKeyDown = (e) => {
    if (!allSuggestions.length) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActiveIndex((prev) =>
          prev < allSuggestions.length - 1 ? prev + 1 : 0
        );
        break;

      case "ArrowUp":
        e.preventDefault();
        setActiveIndex((prev) =>
          prev > 0 ? prev - 1 : allSuggestions.length - 1
        );
        break;

      case "Enter":
        if (activeIndex >= 0) {
          e.preventDefault();
          goToSuggestion(allSuggestions[activeIndex]);
        }
        break;

      case "Escape":
        setShowSuggestions(false);
        break;

      default:
        break;
    }
  };

  // Click Outside
  useEffect(() => {
    const handleOutside = (e) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleOutside);

    return () =>
      document.removeEventListener("mousedown", handleOutside);
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="relative w-full max-w-xl"
    >
      <form
        onSubmit={handleSearch}
        className="
          h-11
          flex
          items-center
          bg-slate-100
          border
          border-slate-200
          rounded-2xl
          overflow-hidden
          focus-within:bg-white
          focus-within:border-emerald-500
          focus-within:shadow-lg
          focus-within:shadow-emerald-100
        "
      >
        <div className="px-4 text-slate-400">
          <Search size={18} />
        </div>

        <input
          type="text"
          autoComplete="off"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onFocus={() => setShowSuggestions(true)}
          onKeyDown={handleKeyDown}
          placeholder="Search products..."
          className="
            flex-1
            bg-transparent
            outline-none
            text-sm
            text-slate-700
            placeholder:text-slate-400
          "
        />

        <button
          type="submit"
          disabled={loading}
          className="
            h-full
            px-4
            bg-emerald-600
            text-white
            flex
            items-center
            justify-center
          "
        >
          {loading ? (
            <Loader2
              size={18}
              className="animate-spin"
            />
          ) : (
            <AiOutlineSearch size={22} />
          )}
        </button>
      </form>

      <SearchSuggestions
        data={suggestions}
        show={showSuggestions}
        activeIndex={activeIndex}
        onSelect={goToSuggestion}
      />
    </div>
  );
}