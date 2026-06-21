import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Loader2 } from "lucide-react";
import axiosInstance from "../utils/axiosInstance";
import SearchSuggestions from "./SearchSuggestions";
import { AiOutlineSearch } from "react-icons/ai";

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

  // SEARCH SUBMIT
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

  // CLICK OUTSIDE
  useEffect(() => {
    const handleOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  return (
    <div ref={wrapperRef} className="relative w-full">
      
      {/* INPUT */}
      <form
        onSubmit={handleSearch}
        className="
          h-10 flex items-center
          bg-slate-100 border border-slate-200
          rounded-2xl overflow-hidden
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
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setShowSuggestions(true);
          }}
          placeholder="Search products..."
          className="flex-1 outline-none text-sm text-slate-700"
        />

        <button
          type="submit"
          disabled={loading}
          className="p-2 h-full bg-emerald-600 text-white"
        >
          {loading ? <Loader2 className="animate-spin" size={16} /> : <AiOutlineSearch size={25} />}
        </button>
      </form>

      {/* SUGGESTIONS COMPONENT */}
      <SearchSuggestions
        search={search}
        show={showSuggestions}
        setShow={setShowSuggestions}
      />
    </div>
  );
} 