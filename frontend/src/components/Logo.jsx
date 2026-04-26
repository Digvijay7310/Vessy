import React from "react";
import { useNavigate } from "react-router-dom";

export default function Logo() {
  const navigate = useNavigate()
  const handleClick = () => {
    navigate("/")
  }
  return (
    <div className="flex items-center gap-2 select-none cursor-pointer">

      {/* Icon (SVG) */}
      <div
      onClick={handleClick}
      className="w-10 h-10 md:w-11 md:h-11 rounded-xl bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-md">
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Leaf / freshness icon */}
          <path
            d="M20 4C14 4 9 6 6 10C3 14 3 20 3 20C3 20 9 20 13 17C17 14 20 9 20 4Z"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M6 18C10 14 14 10 20 4"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Brand Name */}
      <h1 className="text-xl md:text-2xl font-bold tracking-tight">
        <span className="text-gray-900">Ve</span>
        <span className="text-green-600">ssy</span>
      </h1>

    </div>
  );
}