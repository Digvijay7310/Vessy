import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError(null);

      await axiosInstance.post("/admins/login", { email, password });

      navigate("/admin/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">

      {/* LEFT SECURITY PANEL */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-black via-gray-900 to-red-900 items-center justify-center p-10">
        <div className="text-center text-white">
          <h1 className="text-5xl font-extrabold tracking-tight">
            Admin Panel
          </h1>
          <p className="mt-4 text-gray-300 text-lg">
            Secure access only for authorized users
          </p>
        </div>
      </div>

      {/* RIGHT LOGIN FORM */}
      <div className="flex w-full md:w-1/2 items-center justify-center bg-gray-50 px-6">

        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-gray-200 p-8"
        >

          <h2 className="text-3xl font-bold text-gray-900">
            Admin Login
          </h2>

          <p className="text-gray-500 mt-1 mb-6">
            Sign in to manage your system
          </p>

          {/* Error */}
          {error && (
            <div className="mb-4 text-sm bg-red-50 text-red-600 border border-red-200 p-2 rounded">
              {error}
            </div>
          )}

          {/* Email */}
          <div className="mb-4">
            <label className="text-sm text-gray-600">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              className="mt-1 w-full p-3 rounded-lg border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-100 outline-none transition"
              required
            />
          </div>

          {/* Password */}
          <div className="mb-6">
            <label className="text-sm text-gray-600">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="mt-1 w-full p-3 rounded-lg border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-100 outline-none transition"
              required
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition flex items-center justify-center gap-2"
          >
            {loading && (
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            )}
            {loading ? "Authenticating..." : "Login"}
          </button>

          {/* Footer note */}
          <p className="text-center text-xs text-gray-400 mt-6">
            Unauthorized access is prohibited
          </p>

        </form>
      </div>
    </div>
  );
}