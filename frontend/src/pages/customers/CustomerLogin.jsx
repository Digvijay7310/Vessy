import React, { useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import Logo from '../../components/Logo'
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

export default function CustomerLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError(null);

      await axiosInstance.post("/customer/login", {
        email,
        password,
      });

      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">

      {/* LEFT SIDE BRAND PANEL */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-black via-orange-800 to-gray-800 items-center justify-center p-10">
        <div className="text-center text-white">
          <h1 className="text-5xl font-extrabold tracking-tight"><Logo /> </h1>
          <p className="mt-4 text-gray-300 text-lg">Shop smarter. Experience better.</p>
        </div>
      </div>

      {/* RIGHT SIDE LOGIN */}
      <div className="flex w-full md:w-1/2 items-center justify-center bg-gray-50">

        <form
          onSubmit={handleLogin}
          className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-200 p-8"
        >

          {/* Title */}
          <h2 className="text-3xl font-bold text-gray-900">Welcome back</h2>
          <p className="text-gray-500 mt-1 mb-6">Login to continue to your account</p>

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
              placeholder="you@example.com"
              className="mt-1 w-full p-3 rounded-lg border border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none transition"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div className="mb-6">
            <label className="text-sm text-gray-600">Password</label>

            <div className="relative mt-1">
              <input
                type={showPass ? "text" : "password"}
                placeholder="••••••••"
                className="w-full p-3 rounded-lg border border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none transition"
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <div
                className="absolute right-3 top-3 text-xl text-gray-500 cursor-pointer"
                onClick={() => setShowPass(!showPass)}
              >
                {showPass ? <AiFillEyeInvisible /> : <AiFillEye />}
              </div>
            </div>
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
            {loading ? "Signing in..." : "Sign In"}
          </button>

          {/* Footer */}
          <p className="text-center text-sm text-gray-500 mt-6">
            Don’t have an account?{" "}
            <span
              onClick={() => navigate("/customer/register")}
              className="text-emerald-600 font-medium cursor-pointer hover:underline"
            >
              Create one
            </span>
          </p>

        </form>
      </div>
    </div>
  );
}