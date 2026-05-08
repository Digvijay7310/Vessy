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

      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">

      {/* LEFT BRAND SECTION */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-emerald-900 via-black to-gray-900 items-center justify-center p-10">
        <div className="text-center text-white">
          <h1 className="text-5xl font-extrabold">
            Join Us Today
          </h1>
          <p className="mt-4 text-gray-300 text-lg">
            Create your account and start shopping smarter
          </p>
        </div>
      </div>

      {/* RIGHT FORM SECTION */}
      <div className="flex w-full md:w-1/2 items-center justify-center bg-gray-50 px-6">

        <form
          onSubmit={handleRegister}
          className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-200 p-8"
        >

          <h2 className="text-3xl font-bold text-gray-900">
            Create account
          </h2>

          <p className="text-gray-500 mt-1 mb-6">
            It takes less than a minute
          </p>

          {/* Error */}
          {error && (
            <div className="mb-4 text-sm bg-red-50 text-red-600 border border-red-200 p-2 rounded">
              {error}
            </div>
          )}

          {/* Full Name */}
          <input
            name="fullName"
            placeholder="Full Name"
            className="w-full p-3 mb-3 border border-gray-300 rounded-lg focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none transition"
            onChange={handleChange}
            required
          />

          {/* Email */}
          <input
            name="email"
            placeholder="Email address"
            type="email"
            className="w-full p-3 mb-3 border border-gray-300 rounded-lg focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none transition"
            onChange={handleChange}
            required
          />

          {/* Phone */}
          <input
            name="phone"
            placeholder="Phone number"
            className="w-full p-3 mb-3 border border-gray-300 rounded-lg focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none transition"
            onChange={handleChange}
            required
          />

          {/* Password */}
          <div className="relative mb-5">

            <input
              name="password"
              type={showPass ? "text" : "password"}
              placeholder="Password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none transition"
              onChange={handleChange}
              required
            />

            <div
              className="absolute right-3 top-3 cursor-pointer text-xl text-gray-500"
              onClick={() => setShowPass(!showPass)}
            >
              {showPass ? <AiFillEyeInvisible /> : <AiFillEye />}
            </div>
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-600 text-white py-3 rounded-lg font-semibold hover:bg-emerald-700 transition flex items-center justify-center gap-2"
          >
            {loading && (
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            )}
            {loading ? "Creating account..." : "Register"}
          </button>

          {/* Login Link */}
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