import { NavLink, useNavigate } from "react-router-dom"
import axiosInstance from "../../utils/axiosInstance"

import {
  LayoutDashboard,
  Package,
  Layers3,
  Shapes,
  LogOut
} from "lucide-react"

// import Profile from "./Profile"

export default function Sidebar() {

  const navigate = useNavigate()

  const routes = [
    {
      path: "/admin/dashboard",
      name: "Dashboard",
      icon: <LayoutDashboard size={18} />
    },
    {
      path: "/admin/products",
      name: "Products",
      icon: <Package size={18} />
    },
    {
      path: "/admin/categories",
      name: "Categories",
      icon: <Layers3 size={18} />
    },
    {
      path: "/admin/subcategories",
      name: "SubCategories",
      icon: <Shapes size={18} />
    }
  ]

  const handleLogout = async () => {
    try {

      await axiosInstance.post("/admins/logout")

      navigate("/login")

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="w-72 min-h-screen bg-white border-r flex flex-col justify-between">

      {/* TOP */}
      <div>

        {/* LOGO */}
        <div className="p-5 border-b">

          <h1 className="text-2xl font-bold text-red-500">
            Admin Panel
          </h1>

        </div>

        {/* PROFILE */}
        <div className="p-4 border-b">
          {/* <Profile /> */}
        </div>

        {/* NAVIGATION */}
        <div className="p-3 flex flex-col gap-2">

          {routes.map((route) => (

            <NavLink
              key={route.path}
              to={route.path}
              className={({ isActive }) =>
                `
                flex items-center gap-3
                px-4 py-3 rounded-lg
                transition-all duration-200

                ${isActive
                  ? "bg-red-500 text-white shadow"
                  : "hover:bg-red-50 text-gray-700"}
                `
              }
            >

              {route.icon}

              <span className="font-medium">
                {route.name}
              </span>

            </NavLink>
          ))}

        </div>

      </div>

      {/* LOGOUT */}
      <div className="p-4 border-t">

        <button
          onClick={handleLogout}
          className="
            w-full
            flex items-center justify-center gap-2
            bg-red-500 hover:bg-red-600
            text-white
            py-3 rounded-lg
            transition-all duration-200
          "
        >

          <LogOut size={18} />

          Logout

        </button>

      </div>

    </div>
  )
}