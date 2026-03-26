import React from 'react'
import {useAuth} from '../context/AuthContext'
import { Link } from 'react-router-dom'


function Sidebar() {
    const {admin} = useAuth()

  return (
    <aside className="w-64 bg-gray-100 min-h-screen p-4 hidden md:flex flex-col justify-between">
      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-bold mb-4">Admin Panel</h2>
        <Link to="/admin/dashboard" className="hover:text-blue-500">Dashboard</Link>
        <Link to="/admin/users" className="hover:text-blue-500">Users</Link>
      </div>
      {admin && (
        <div className="mt-auto border-t pt-4 text-center">
          <span className="font-medium">{admin.fullName}</span>
        </div>
      )}
    </aside>
  );
  
}

export default Sidebar