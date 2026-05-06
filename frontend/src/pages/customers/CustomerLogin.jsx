import React, { useState } from "react"
import axiosInstance from "../../utils/axiosInstance"
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai"
import { useNavigate } from "react-router-dom"

export default function CustomerLogin() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPass, setShowPass] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const res = await axiosInstance.post("/customer/login", {
        email,
        password
      })

      console.log("Login success:", res.data)
      navigate("/")
    } catch (err) {
      console.log(err.response?.data?.message)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">

      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-2xl shadow-lg w-[350px]"
      >

        <h2 className="text-2xl font-bold mb-6 text-center">
          Customer Login
        </h2>

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded mb-4 outline-none"
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password */}
        <div className="relative mb-4">

          <input
            type={showPass ? "text" : "password"}
            placeholder="Password"
            className="w-full p-2 border rounded outline-none"
            onChange={(e) => setPassword(e.target.value)}
          />

          <div
            className="absolute right-3 top-2.5 cursor-pointer text-xl"
            onClick={() => setShowPass(!showPass)}
          >
            {showPass ? <AiFillEyeInvisible /> : <AiFillEye />}
          </div>

        </div>

        <button
          type="submit"
          className="w-full bg-emerald-600 text-white py-2 rounded hover:bg-emerald-700 transition"
        >
          Login
        </button>

        <span
        onClick={() => navigate("/customer/register")}
        className="text-xs border-b border-emerald-400 text-red-400 mt-2">Register</span>

      </form>
    </div>
  )
}