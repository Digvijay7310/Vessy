import React from 'react'
import { useTheme } from '../hooks/useTheme'
import { useAuth } from '../context/AuthContext'

function Navbar() {
    const {theme, toggleTheme} = useTheme()
    const {user} = useAuth()

  return (
    <nav className="flex items-center justify-between px-6 py-3 bg-orange-500 text-white dark:bg-gray-900 dark:text-gray-100">
        <h1 className='font-bold text-lg'>Admin Dashboard</h1>
        <button onClick={toggleTheme}
         className="bg-white text-orange-600 px-3 py-1 rounded font-medium hover:bg-orange-100 dark:bg-gray-800 dark:text-orange-400 dark:hover:bg-gray-700 transition">
            {theme === "light" ? "Dark": "Light"}
         </button>
         {user}
    </nav>
  )
}

export default Navbar