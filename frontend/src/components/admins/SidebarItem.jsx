import React from "react";
import { NavLink } from "react-router-dom";

export default function SidebarItem({ to, icon, label, onClick }) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        `
        flex items-center gap-3
        px-4 py-3
        rounded-xl
        text-sm font-medium
        transition-all duration-300

        ${
          isActive
            ? "bg-gradient-to-r from-red-600 to-orange-500 text-white shadow-md"
            : "text-gray-700 hover:text-white hover:bg-gradient-to-r hover:from-red-500 hover:to-orange-400 backdrop-blur-md"
        }
        `
      }
    >
      {icon}

      <span>{label}</span>
    </NavLink>
  );
}