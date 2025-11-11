import {useState} from 'react'
import { NavLink } from 'react-router-dom'

function Sidebar() {
    const [open,setOpen] = useState(true)
  return (
    <aside className={`${open ? "w-64": "w-16"} bg-gray-100 dark:bg-gray-900 border-r border-gray-300 dark:border-gray-800 transition-all duration-300 flex flex-col`}>
        <button 
        onClick={() => setOpen(!open)}
        className='p-3 text-orange-500 hoverLtext-orange-600 dark:text-orange-400 self-end'
        >
            {open ? "close": "open"}
        </button>

        <nav className="flex-1 flex flex-col gap-1 px-3">
            <NavLink
            to='/dashboard'
            className={({isActive}) => `block px-3 py-2 rounded-md font-medium ${isActive ? "bg-orange-500 text-white": "text-gray-700 hover:bg-orange-100 dark:text-gray-300 dark:hover:bg-gray-800"}`}>
                {open && "Dashboard"}
            </NavLink>

            <NavLink to="/products" className={({isActive}) => `block px-3 py-2 rounded-md font-medium ${isActive ? "bg-orange-500 text-white" : "text-gray-700 hover:bg-orange-100 dark:text-gray-300 dark:hover:bg-gray-800"}`}>
            {open && "Products"}
            </NavLink>

            <NavLink to="/profile"
            className={({isActive}) => `block px-3 py-2 rounded-md font-medium ${isActive ? "bg-orange-500 text-white" : "text-gray-700 hober:bg-orange-100 dark:text-gray-300 dark:hover:bg-gray-800"}`}>
                {open && "Profile"}
            </NavLink>
        </nav>
    </aside>
  )
}

export default Sidebar