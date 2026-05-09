import React, { useState, useEffect } from "react";
import axiosInstance from "../../utils/axiosInstance";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function LoginDialog({ onSuccess, onClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate()

  // Close modal on ESC key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axiosInstance.post("/customer/login", { email, password });
      toast.success("Login successful!");
      onSuccess();
      onClose(); // close after successful login
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-transparent bg-opacity-70 backdrop-blur-[1px]"
      onClick={onClose} // click outside to close
    >
      <form
        onSubmit={handleLogin}
        className="bg-white w-11/12 md:w-2/3 lg:w-1/2 p-8 rounded-2xl shadow-2xl flex flex-col gap-4 relative"
        onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 font-bold text-xl"
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold text-center text-gray-800">
          Sign In to Your Account
        </h2>
        <p className="text-sm text-gray-500 text-center mb-4">
          Welcome back! Please enter your details.
        </p>

        <div className="flex flex-col gap-3">
          <input
            type="email"
            placeholder="Email Address"
            className="w-full px-4 py-3 text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 outline-none transition"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 outline-none transition"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-emerald-500 text-white font-semibold rounded-lg hover:bg-emerald-600 transition flex items-center justify-center gap-2 mt-2"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-xs text-gray-500 text-center mt-4">
          Don’t have an account?{" "}
          <span
          onClick={() => navigate("/customer/register")}
          className="text-emerald-600 cursor-pointer hover:underline">
            Sign Up
          </span>
        </p>
      </form>
    </div>
  );
}