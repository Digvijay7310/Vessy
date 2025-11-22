import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Link, Outlet } from 'react-router-dom';

export default function AdminLayout() {
  const { logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 w-64 bg-gray-900 text-white flex flex-col transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:static md:flex`}
      >
        <div className="flex justify-between items-center px-5 py-4 border-b border-gray-700">
          <h2 className="text-2xl font-bold">Admin Panel</h2>
          <button className="md:hidden font-bold" onClick={() => setSidebarOpen(false)}>
            ✕
          </button>
        </div>

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
            Add Product
          </Link>
        </nav>

        <button
          onClick={logout}
          className="p-3 bg-red-600 hover:bg-red-700 text-center"
        >
          Logout
        </button>
      </aside>

      {/* Main content */}
      <div className="flex-1 md:ml-64">
        {/* Toggle button for mobile */}
        <button
          className="md:hidden p-2 m-2 bg-gray-900 text-white rounded"
          onClick={() => setSidebarOpen(true)}
        >
          ☰ Menu
        </button>

        <main className="p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
