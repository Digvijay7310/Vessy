import React from 'react'
import { useAuth } from '../../hooks/useAuth'
import { useToast } from '../../hooks/useToast'
import { useState } from 'react'
import { adminLogin } from '../../api/adminApi'
import { useNavigate } from 'react-router-dom'

function Login() {
    const {setAdmin} = useAuth()
    const {toast} = useToast()
    
    const navigate = useNavigate()

    const [form, setForm] = useState({email: "", password: ""})

    const handleSubmit = async(e) => {
        e.preventDefault()

        try {
            const res = await adminLogin(form)
            setAdmin(res.data.data)

            navigate("/admins")
            toast.success("Welcome admin!")
        } catch (error) {
            toast.error(error.response?.data?.message || "Login failed")
        }
    }
  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-200'>

        <div className="bg-white p-4 rounded shadow-md w-full max-w-md">
            <h2 className="text-2xl font-bold text-center mb-6">Admin Login</h2>

            <form onSubmit={handleSubmit} className='space-y-4'>
                <input type="email"
                placeholder='Email'
                className='w-full p-3 border rounded'
                value={form.email}
                onChange={(e) => setForm({...form, email: e.target.value})}
                />

                <input type="password"
                placeholder='password'
                className='w-full p-3 border rounded'
                value={form.password}
                onChange={(e) => setForm({...form, password: e.target.value})}
                />

                <button className="w-full bg-gray-900 text-white p-3 rounded hover:bg-gray-800">
                    Login
                </button>
            </form>
        </div>
    </div>
  )
}

export default Login