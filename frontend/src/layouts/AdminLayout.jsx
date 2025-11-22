import React from 'react'
import { useAuth } from '../hooks/useAuth'
import {Link, Outlet} from 'react-router-dom'

function AdminLayout() {
    const {admin, logout} = useAuth()
  return (
    <div className='flex min-h-screen bg-gray-100'>

        {/* Sidebar */}
        <aside className='w-64 bg-gray-900 text-white flex flex-col'>
            <h2 className="text-2xl font-bold px-5 py-4 border-b border-gray-700">
                Admin Panel
            </h2>

            <nav className="flex-1 px-4 py-6 space-y-3">
                <Link className="block p-2 rounded hover:bg-gray-700" to="/admins">
                Dashboard
                </Link>
                <Link className="block p-2 rounded hover:bg-gray-700" to="/admins/users">
                Users
                </Link>
                <Link className="block p-2 rounded hover:bg-gray-700" to="/products">
                Products
                </Link>
                <Link className="block p-2 rounded hover:bg-gray-700" to="/products/add">
                Add Products
                </Link>
                
            </nav>

            <button onClick={logout}
            className='p-3 bg-red-600 hover:bg-red-700 text-center'>
                Logout
            </button>
        </aside>

        <main className='flex-1 p-6 overflow-y-auto'>
            <Outlet />
        </main>
    </div>
  )
}

export default AdminLayout