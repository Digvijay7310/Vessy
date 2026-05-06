import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function NotFound() {
  const navigate = useNavigate()

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100 px-4">

      <div className="text-center bg-white p-8 rounded-2xl shadow-lg max-w-md w-full">

        {/* Big 404 */}
        <h1 className="text-6xl font-bold text-red-500">404</h1>

        <h2 className="text-xl font-semibold mt-2">
          Page Not Found
        </h2>

        <p className="text-sm text-gray-500 mt-2 mb-6">
          The page you are looking for doesn’t exist or has been moved.
        </p>

        <div className="flex gap-3 justify-center">

          {/* Home */}
          <button
            onClick={() => navigate("/")}
            className="bg-emerald-600 px-4 py-2 rounded-lg text-white hover:bg-emerald-700 transition"
          >
            Home
          </button>

          {/* Back */}
          <button
            onClick={() => navigate(-1)}
            className="bg-gray-500 px-4 py-2 rounded-lg text-white hover:bg-gray-600 transition"
          >
            Go Back
          </button>

        </div>

      </div>

    </div>
  )
}