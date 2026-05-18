import React, { useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { Plus } from "lucide-react";

export default function CreateCategory({ onSuccess }) {

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreate = async (e) => {

    e.preventDefault();

    if (!name.trim()) return;

    try {

      setLoading(true);

      await axiosInstance.post("/categories/", { name });

      setName("");

      if (onSuccess) onSuccess();

    } catch (error) {

      console.log("Error in create category", error);

    } finally {

      setLoading(false);

    }
  };

  return (
    <form
      onSubmit={handleCreate}
      className="
        flex items-center gap-2
        bg-white
        border
        rounded-xl
        shadow-sm
        p-2
      "
    >

      {/* INPUT */}
      <input
        type="text"
        placeholder="Enter category name..."
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="
          flex-1
          px-3 py-2
          text-sm
          outline-none
          bg-transparent
        "
      />

      {/* BUTTON */}
      <button
        disabled={loading}
        className={`
          flex items-center gap-1
          px-4 py-2
          rounded-lg
          text-sm font-medium
          transition-all duration-300

          ${
            loading
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-green-500 hover:bg-green-600 text-white"
          }
        `}
      >

        <Plus size={16} />

        {loading ? "Adding..." : "Add"}

      </button>

    </form>
  );
}