import React, { useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: ""
  });

  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError(null);

      await axiosInstance.post("/customer/register", form);

      navigate("/customer/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-100 px-4">

      {/* BACKGROUND GLOW */}
      <div className="absolute w-[400px] h-[400px] bg-emerald-200 blur-[120px] opacity-40 top-10 left-10 rounded-full"></div>
      <div className="absolute w-[400px] h-[400px] bg-blue-200 blur-[120px] opacity-40 bottom-10 right-10 rounded-full"></div>

      {/* CARD */}
      <div className="w-full max-w-md relative">

        <form
          onSubmit={handleRegister}
          className="bg-white border border-gray-100 shadow-xl rounded-2xl p-8"
        >

          {/* TITLE */}
          <h2 className="text-3xl font-bold text-gray-900">
            Create account
          </h2>

          <p className="text-sm text-gray-500 mt-1 mb-6">
            It takes less than a minute
          </p>

          {/* ERROR */}
          {error && (
            <div className="mb-4 text-sm bg-red-50 text-red-600 border border-red-200 p-2 rounded-lg">
              {error}
            </div>
          )}

          {/* FULL NAME */}
          <input
            name="fullName"
            placeholder="Full Name"
            className="w-full p-3 mb-3 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none transition"
            onChange={handleChange}
            required
          />

          {/* EMAIL */}
          <input
            name="email"
            placeholder="Email address"
            type="email"
            className="w-full p-3 mb-3 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none transition"
            onChange={handleChange}
            required
          />

          {/* PHONE */}
          <input
            name="phone"
            placeholder="Phone number"
            className="w-full p-3 mb-3 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none transition"
            onChange={handleChange}
            required
          />

          {/* PASSWORD */}
          <div className="relative mb-5">
            <input
              name="password"
              type={showPass ? "text" : "password"}
              placeholder="Password"
              className="w-full p-3 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none transition"
              onChange={handleChange}
              required
            />

            <div
              className="absolute right-3 top-3 text-xl text-gray-500 cursor-pointer"
              onClick={() => setShowPass(!showPass)}
            >
              {showPass ? <AiFillEyeInvisible /> : <AiFillEye />}
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
            {loading ? "Creating account..." : "Register"}
          </button>

          {/* LOGIN LINK */}
          <p className="text-center text-sm text-gray-500 mt-6">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/customer/login")}
              className="text-emerald-600 font-medium cursor-pointer hover:underline"
            >
              Login
            </span>
          </p>

        </form>

      </div>

    </div>
  );
}