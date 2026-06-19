import React, { useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import Logo from "../../components/Logo";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function CustomerLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) return;

    try {
      setLoading(true);
      setError(null);

      // 1. LOGIN API CALL
      const res = await axiosInstance.post("/customer/login", {
        email,
        password,
      });

      // 2. FETCH PROFILE (IMPORTANT FOR SYNC)
      const me = await axiosInstance.get("/customer/me");

      // 3. UPDATE GLOBAL AUTH STATE
      login(me.data.customer);

      // 4. REDIRECT
      navigate("/");
    } catch (err) {
      setError(
        err.response?.data?.message || "Login failed. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-100 px-4">

      {/* BACKGROUND GLOW */}
      <div className="absolute w-[400px] h-[400px] bg-emerald-200 blur-[120px] opacity-40 top-10 left-10 rounded-full"></div>
      <div className="absolute w-[400px] h-[400px] bg-blue-200 blur-[120px] opacity-40 bottom-10 right-10 rounded-full"></div>

      {/* LOGIN CARD */}
      <div className="relative w-full max-w-md">

        <form
          onSubmit={handleLogin}
          className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8"
        >

          {/* LOGO */}
          <div className="text-center text-3xl font-bold text-gray-900">
            <Logo />
          </div>

          <p className="text-center text-gray-500 text-sm mt-2 mb-6">
            Welcome back — sign in to continue shopping
          </p>

          {/* ERROR */}
          {error && (
            <div className="mb-4 text-sm bg-red-50 text-red-600 border border-red-200 p-2 rounded-lg">
              {error}
            </div>
          )}

          {/* EMAIL */}
          <div className="mb-4">
            <label className="text-sm text-gray-600">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="mt-1 w-full p-3 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none transition"
              required
            />
          </div>

          {/* PASSWORD */}
          <div className="mb-6">
            <label className="text-sm text-gray-600">Password</label>

            <div className="relative mt-1">
              <input
                type={showPass ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full p-3 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none transition"
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

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-emerald-500 to-blue-500 text-white py-3 rounded-xl font-semibold shadow-md hover:shadow-lg hover:scale-[1.01] transition flex items-center justify-center gap-2"
          >
            {loading && (
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            )}
            {loading ? "Signing in..." : "Sign In"}
          </button>

          {/* FOOTER */}
          <p className="text-center text-sm text-gray-500 mt-6">
            Don’t have an account?{" "}
            <span
              onClick={() => navigate("/customer/register")}
              className="text-emerald-600 font-medium cursor-pointer hover:underline"
            >
              Create one
            </span>
          </p>

          <Link
            to="/admin/login"
            className="block text-center text-xs mt-4 text-gray-500 hover:text-gray-900 transition"
          >
            Admin Login
          </Link>

        </form>
      </div>
    </div>
  );
}