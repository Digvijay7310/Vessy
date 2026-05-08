import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BiSearch, BiX } from "react-icons/bi";
import axiosInstance from "../utils/axiosInstance";

export default function Searchbar() {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const searchProducts = async (e) => {
    e.preventDefault();

    if (!search.trim() || loading) return;

    try {
      setLoading(true);

      const res = await axiosInstance.get("/products/", {
        params: { search },
      });

      navigate("/search", {
        state: {
          products: res.data.products,
          total: res.data.totalProducts,
        },
      });

      setSearch("");
    } catch (error) {
      console.log("Error in search:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={searchProducts}
      className="
        flex items-center w-full
        bg-white rounded-full
        shadow-sm border
        focus-within:border-emerald-600
        overflow-hidden
      "
    >

      {/* INPUT */}
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search products..."
        className="flex-1 px-4 py-2 text-sm outline-none"
      />

      {/* CLEAR BUTTON */}
      {search && !loading && (
        <button
          type="button"
          onClick={() => setSearch("")}
          className="px-2 text-gray-400 hover:text-gray-600"
        >
          <BiX size={20} />
        </button>
      )}

      {/* SEARCH BUTTON */}
      <button
        type="submit"
        disabled={loading}
        className="
          bg-green-600 hover:bg-green-700
          px-4 py-2 text-white
          flex items-center justify-center
          disabled:opacity-60 disabled:cursor-not-allowed
          transition
        "
      >
        {loading ? (
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
        ) : (
          <BiSearch size={18} />
        )}
      </button>

    </form>
  );
}