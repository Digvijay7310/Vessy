import React from "react";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black px-4">

      <div className="text-center bg-white/10 backdrop-blur-xl border border-white/20 p-10 rounded-2xl shadow-2xl max-w-md w-full text-white">

        {/* ICON */}
        <div className="text-6xl mb-4">🚧</div>

        {/* 404 */}
        <h1 className="text-7xl font-extrabold text-red-400 tracking-tight">
          404
        </h1>

        {/* TITLE */}
        <h2 className="text-xl font-semibold mt-3">
          Page not found
        </h2>

        {/* DESCRIPTION */}
        <p className="text-sm text-gray-300 mt-3 mb-8">
          The page you are looking for doesn’t exist, was removed, or the link is broken.
        </p>

        {/* BUTTONS */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">

          <button
            onClick={() => navigate("/")}
            className="bg-emerald-600 px-5 py-2 rounded-lg text-white font-medium hover:bg-emerald-700 transition"
          >
            Go Home
          </button>

          <button
            onClick={() => navigate(-1)}
            className="bg-white/10 border border-white/20 px-5 py-2 rounded-lg text-white hover:bg-white/20 transition"
          >
            Go Back
          </button>

        </div>

      </div>
    </div>
  );
}