import { useState, useEffect } from "react"
import {useNavigate} from "react-router-dom"
import axiosInstance from "../utils/axiosInstance"


export default function Login() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      setLoading(true)
      setError(null)

      await axiosInstance.post("/admins/login", { email, password })

      navigate("/dashboard")
    } catch (error) {
      setError("Invalid Credentials")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='max-w-lg mx-auto bg-gray-100 p-5 rounded shadow'>
      <h3 className='text-xl font-semibold mb-3'>Login As Admin</h3>

      {error && (
        <div className="bg-red-100 text-red-500 p-2 mb-3 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='abc@abc.com'
          className='border p-2 rounded'
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
          className='border p-2 rounded'
        />

        <button
          type='submit'
          disabled={loading}
          className='bg-red-500 text-white px-3 py-2 rounded'
        >
          {loading ? "Authenticating..." : "Login"}
        </button>
      </form>
    </div>
  )
}