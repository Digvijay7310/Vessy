import React from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import axiosInstance from '../../utils/axiosInstance'

function Sidebar() {
  const navigate = useNavigate()

  const routes = [
    { path: "/dashboard", name: "Dashboard" },
    { path: "/create-product", name: "Add Product" },
    { path: "/categories", name: "Categories" },
    { path: "/sub", name: "Sub Categories" },
  ]

  const handleLogout = async()=>{
    try {
      await axiosInstance.post("/admins/logout")
      navigate("/login")
    } catch (error) {
      console.log("Login error")
    }
  }

  return (
    <div className='w-56 p-4 bg-white flex flex-col justify-between shadow h-screen'>
    <div className='flex flex-col gap-3' >
      <h2 className='text-lg font-bold text-center'>Admin</h2>

      {routes.map((route) => (
        <NavLink
          key={route.path}
          to={route.path}
          className={({isActive}) => `p-2 rounded ${isActive ? "bg-red-200" : "bg-gray-100"} hover:bg-red-100`}
        >
          {route.name}
        </NavLink>
      ))}
    </div>

    <button onClick={handleLogout}
     type='button'
     className='bg-red-500 text-white py-2 rounded mt-5 hover:bg-red-600 hover:cursor-pointer hover:scale-110'
     >Logout</button>
     </div>
  )
}

export default Sidebar