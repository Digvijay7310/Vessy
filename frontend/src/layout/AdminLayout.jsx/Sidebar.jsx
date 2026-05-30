import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";

import {
  LayoutDashboard,
  Package,
  Layers3,
  Shapes,
  LogOut,
  X,
  ListOrdered
} from "lucide-react";

import SidebarItem from "../../components/admins/SidebarItem";

export default function Sidebar({ isOpen, setIsOpen }) {

  const navigate = useNavigate();


  const routes = [
    {
      path: "/admin/dashboard",
      label: "Dashboard",
      icon: <LayoutDashboard size={18} />,
    },
    {
      path: "/admin/products",
      label: "Products",
      icon: <Package size={18} />,
    },
    {
      path: "/admin/categories",
      label: "Categories",
      icon: <Layers3 size={18} />,
    },
    {
      path: "/admin/subcategories",
      label: "SubCategories",
      icon: <Shapes size={18} />,
    },
    {
      path: "/admin/orders",
      label: "Orders",
      icon: <ListOrdered size={18} />,
    },
  ];

  const handleLogout = async () => {
    try {

      await axiosInstance.post("/admins/logout");

      navigate("/admins/login");

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {/* Overlay */}
      <div
        onClick={() => setIsOpen(false)}
        className={`
          fixed inset-0 bg-black/40 z-40 lg:hidden
          transition-opacity duration-300

          ${
            isOpen
              ? "opacity-100 visible"
              : "opacity-0 invisible"
          }
        `}
      />

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static top-0 left-0 z-50
          w-72 h-screen bg-white border-r

          flex flex-col justify-between

          transition-transform duration-300 ease-in-out

          ${
            isOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }
        `}
      >

        {/* Top */}
        <div>

          {/* Logo */}
          <div className="flex items-center justify-between p-5 border-b">

            <h1 className="text-2xl font-bold text-red-500">
              Admin Panel
            </h1>

            <button
              onClick={() => setIsOpen(false)}
              className="lg:hidden"
            >
              <X size={22} />
            </button>

          </div>

          {/* Nav */}
          <div className="p-4 space-y-2">

            {routes.map((route) => (
              <SidebarItem
                key={route.path}
                to={route.path}
                icon={route.icon}
                label={route.label}
                onClick={() => setIsOpen(false)}
              />
            ))}

          </div>

        </div>

        {/* Logout */}
        <div className="p-4 border-t">

          <button
            onClick={handleLogout}
            className="
              w-full
              flex items-center justify-center gap-2
              bg-red-500 hover:bg-red-600
              text-white
              py-3 rounded-xl
              transition-all duration-300
            "
          >

            <LogOut size={18} />

            Logout

          </button>

        </div>

      </aside>
    </>
  );
}