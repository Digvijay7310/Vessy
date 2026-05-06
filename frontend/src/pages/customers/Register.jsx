import React, { useState } from "react"
import axiosInstance from "../../utils/axiosInstance"
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai"
import { useNavigate } from "react-router-dom"

export default function Register() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: ""
  })

  const [showPass, setShowPass] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleRegister = async (e) => {
    e.preventDefault()

    try {
      const res = await axiosInstance.post("/customer/register", form)

      console.log(res.data)
      navigate("/login")
    } catch (err) {
      console.log(err.response?.data?.message)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">

      <form
        onSubmit={handleRegister}
        className="bg-white p-8 rounded-2xl shadow-lg w-[350px]"
      >

        <h2 className="text-2xl font-bold mb-6 text-center">
          Customer Register
        </h2>

        <input
          name="fullName"
          placeholder="Full Name"
          className="w-full p-2 border rounded mb-3"
          onChange={handleChange}
        />

        <input
          name="email"
          placeholder="Email"
          className="w-full p-2 border rounded mb-3"
          onChange={handleChange}
        />

        <input
          name="phone"
          placeholder="Phone"
          className="w-full p-2 border rounded mb-3"
          onChange={handleChange}
        />

        {/* Password */}
        <div className="relative mb-4">

          <input
            name="password"
            type={showPass ? "text" : "password"}
            placeholder="Password"
            className="w-full p-2 border rounded"
            onChange={handleChange}
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
          className="w-full bg-emerald-600 text-white py-2 rounded hover:bg-emerald-700"
        >
          Register
        </button>

        <span
        onClick={() => navigate("/customer/login")}
        className="text-xs border-b border-emerald-400 text-red-400 mt-2">Login</span>

      </form>
    </div>
  )
}