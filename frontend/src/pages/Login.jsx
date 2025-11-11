import { useState } from "react";
import axios from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../components/CustomToast";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/auth/login", { email, password });
      const { data } = await axios.get("/auth/my-profile");
      setUser(data);
      showToast("Logged in successfully!", "success");
      navigate("/dashboard");
    } catch (err) {
      showToast(err.response?.data?.message || "Login failed", "error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md w-80"
      >
        <h2 className="text-xl font-bold text-orange-500 mb-4">Admin Login</h2>
        <input
          type="email"
          placeholder="Email"
          className="w-full text-white mb-3 p-2 border rounded dark:bg-gray-800 dark:border-gray-700"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full text-white mb-4 p-2 border rounded dark:bg-gray-800 dark:border-gray-700"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
}
