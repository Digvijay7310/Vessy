import React, { useState } from "react";
import { BiUserMinus } from "react-icons/bi";
import axiosInstance from "../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      setLoading(true);

      await axiosInstance.post("/customer/logout");

      navigate("/");

      window.location.reload(); // optional full reset

    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className="
        bg-red-600 flex items-center gap-1
        font-medium px-3 py-1
        text-white text-xs rounded-lg
        hover:bg-red-700 hover:scale-95
        transition-all duration-300
        disabled:opacity-60 disabled:cursor-not-allowed
      "
    >
      <BiUserMinus size={20} />
      {loading ? "Logging out..." : "Logout"}
    </button>
  );
}