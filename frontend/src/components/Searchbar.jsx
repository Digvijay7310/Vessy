import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, X } from "lucide-react";
import axiosInstance from "../utils/axiosInstance";

export default function Searchbar() {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

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

      setSearch("");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSearch}
      className="
        w-full max-w-xl
        h-12
        flex items-center
        bg-white
        border border-gray-200
        rounded-lg
        overflow-hidden
        transition
        focus-within:border-emerald-500
        focus-within:ring-2
        focus-within:ring-emerald-100
      "
    >
      {/* SEARCH ICON */}
      <div className="px-3 text-gray-400">
        <Search size={18} strokeWidth={2.2} />
      </div>

      {/* INPUT */}
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search products"
        className="
          flex-1
          h-full
          text-sm
          text-gray-700
          placeholder:text-gray-400
          outline-none
        "
      />

      {/* CLEAR BUTTON */}
      {search && !loading && (
        <button
          type="button"
          onClick={() => setSearch("")}
          className="
            px-2
            text-gray-400
            hover:text-gray-700
            transition
          "
        >
          <X size={18} strokeWidth={2.2} />
        </button>
      )}

      {/* SEARCH BUTTON */}
      <button
        type="submit"
        disabled={loading}
        className="
          h-full
          px-2
          bg-emerald-600
          hover:bg-emerald-700
          text-white
          text-sm
          font-medium
          transition
          disabled:opacity-70
        "
      >
        {loading ? (
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
        ) : (
          <p className="text-xs">Search</p>
        )}
      </button>
    </form>
  );
}