import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, X } from "lucide-react";
import axiosInstance from "../utils/axiosInstance";
import { AiFillCrown } from "react-icons/ai";

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
        group
        w-full max-w-2xl
        h-14
        flex items-center
        rounded-2xl
        bg-slate-50/80
        border border-slate-200
        shadow-sm
        backdrop-blur-xl
        transition-all duration-300
        focus-within:bg-white
        focus-within:border-emerald-500
        focus-within:shadow-[0_0_0_6px_rgba(16,185,129,0.12)]
      "
    >
      {/* ICON */}
      <div className="pl-4 pr-2 text-slate-400 group-focus-within:text-emerald-600 transition">
        <Search size={20} strokeWidth={2.2} />
      </div>

      {/* INPUT */}
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search for groceries, fruits, snacks..."
        className="
          flex-1
          h-full
          bg-transparent
          text-[15px]
          font-medium
          text-slate-700
          placeholder:text-slate-400
          outline-none
        "
      />

      {/* CLEAR */}
      {search && !loading && (
        <button
          type="button"
          onClick={() => setSearch("")}
          className="
            px-2
            text-slate-400
            hover:text-slate-700
            transition
          "
        >
          <X size={18} />
        </button>
      )}

    
    </form>
  );
}