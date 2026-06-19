import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { Shield, Mail, Lock } from "lucide-react";

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

      await axiosInstance.post("/admins/login", {
        email,
        password,
      });

      navigate("/admin/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.message || "Invalid credentials"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-gray-950 via-gray-900 to-black">

      {/* LEFT PANEL */}
      <div className="hidden md:flex w-1/2 items-center justify-center p-12">
        <div className="text-center text-white max-w-md">
          <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-white/10 flex items-center justify-center">
            <Shield className="text-white" />
          </div>

          <h1 className="text-5xl font-bold tracking-tight">
            Admin Portal
          </h1>

          <p className="mt-4 text-gray-400">
            Secure dashboard for managing products, orders and users
          </p>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="flex w-full md:w-1/2 items-center justify-center px-6">

        <form
          onSubmit={handleSubmit}
          className="
            w-full max-w-md

            bg-white/95
            backdrop-blur-xl

            rounded-3xl
            shadow-2xl

            p-8
          "
        >

          {/* HEADER */}
          <h2 className="text-3xl font-bold text-gray-900">
            Welcome back
          </h2>

          <p className="text-sm text-gray-500 mt-1 mb-6">
            Sign in to continue to dashboard
          </p>

          {/* ERROR */}
          {error && (
            <div className="mb-4 text-sm bg-red-50 text-red-600 border border-red-100 p-3 rounded-xl">
              {error}
            </div>
          )}

          {/* EMAIL */}
          <div className="mb-4">
            <label className="text-sm text-gray-600 flex items-center gap-2">
              <Mail size={14} /> Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              placeholder="admin@example.com"
              className="
                mt-2
                w-full
                p-3

                rounded-xl

                bg-gray-50

                border border-gray-200

                focus:border-black
                focus:ring-2
                focus:ring-black/10

                outline-none

                transition
              "
              required
            />
          </div>

          {/* PASSWORD */}
          <div className="mb-6">
            <label className="text-sm text-gray-600 flex items-center gap-2">
              <Lock size={14} /> Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              placeholder="••••••••"
              className="
                mt-2
                w-full
                p-3

                rounded-xl

                bg-gray-50

                border border-gray-200

                focus:border-black
                focus:ring-2
                focus:ring-black/10

                outline-none

                transition
              "
              required
            />
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="
              w-full

              py-3

              rounded-xl

              bg-black
              text-white

              font-semibold

              hover:bg-gray-900

              transition

              flex
              items-center
              justify-center
              gap-2
            "
          >
            {loading && (
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            )}

            {loading
              ? "Signing in..."
              : "Login"}
          </button>

          {/* FOOTER */}
          <p className="text-center text-xs text-gray-400 mt-6">
            Unauthorized access is prohibited
          </p>

          <Link
            to="/customer/login"
            className="
              block
              text-center

              mt-4

              text-sm

              text-gray-600
              hover:text-black

              transition
            "
          >
            Login as Customer →
          </Link>
        </form>
      </div>
    </div>
  );
}