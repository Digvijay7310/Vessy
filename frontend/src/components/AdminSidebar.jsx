// src/components/AdminSidebar.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import {
  AiOutlineUser,
  AiOutlineAppstore,
  AiOutlinePlus,
  AiOutlineLogout,
  AiOutlineClose,
} from "react-icons/ai";

const sidebarItems = [
  { name: "Dashboard", path: "/admins/dashboard", icon: <AiOutlineAppstore /> },
  { name: "Users", path: "/admins/users", icon: <AiOutlineUser /> },
  { name: "Products", path: "/admins/products", icon: <AiOutlineAppstore /> },
  { name: "Create Product", path: "/admins/create-product", icon: <AiOutlinePlus /> },
  { name: "Create Admin", path: "/admins/create-admin", icon: <AiOutlinePlus /> },
  { name: "Logout", path: "/admins/logout", icon: <AiOutlineLogout /> },
];

const AdminSidebar = ({handleTogggle, dialogOpen}) => {
    
  return (
    <div className={`fixed top-0 left-0 min-h-screen max-w-sm bg-gray-900 text-white flex flex-col z-50 transform transition-transform ${dialogOpen ? "translate-x-0" : "-translate-x-full"}`}>
      
      {dialogOpen && (
        <>
        <div className="flex justify-between px-5 font-bold text-xl py-6 border-b border-gray-700">
        <h2>Admin Panel</h2>
        <button onClick={handleTogggle}><AiOutlineClose /> </button>
      </div>
        <nav className="flex-1 mt-6">
        {sidebarItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center px-6 py-3 hover:bg-gray-800 transition ${
                isActive ? "bg-gray-800 border-l-4 border-purple-500" : ""
              }`
            }
          >
            <span className="mr-3">{item.icon}</span>
            {item.name}
          </NavLink>
        ))}
      </nav>
      </>
      )}
    </div>
  );
};

export default AdminSidebar;
