import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Header() {
  return (
    <div className='bg-gray-100 border-b flex w-full justify-between gap-3 px-3 py-1 overflow-x-auto scroll-m-1'>
        <NavLink to="#"
        className="bg-gray-200 px-3 py-1 hover:bg-red-600 hover:text-white rounded-lg"
        >Products</NavLink>
        <NavLink to="#"
        className="bg-gray-200 px-3 py-1 hover:bg-red-600 hover:text-white rounded-lg"
        >Category</NavLink>
        <NavLink to="#"
        className="bg-gray-200 px-3 py-1 hover:bg-red-600 hover:text-white rounded-lg"
        >SubCategory</NavLink>
        <NavLink to="#"
        className="bg-gray-200 px-3 py-1 hover:bg-red-600 hover:text-white rounded-lg"
        >Orders</NavLink>
        <NavLink to="#"
        className="bg-gray-200 px-3 py-1 hover:bg-red-600 hover:text-white rounded-lg"
        >Logout</NavLink>

    </div>
  )
}
