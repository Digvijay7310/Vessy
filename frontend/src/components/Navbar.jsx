import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useUserAuth } from "../hooks/userUserAuth";

export default function Navbar() {
  const { user, logout } = useUserAuth();

  return (
    <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center">
      {/* Logo */}
      <Link to="/" className="font-bold text-xl">
        MyShop
      </Link>

      {/* Links */}
      <div className="space-x-4">
        <NavLink to="/" className={({ isActive }) => isActive ? "underline" : ""}>
          Home
        </NavLink>
        <NavLink to="/products" className={({ isActive }) => isActive ? "underline" : ""}>
          Products
        </NavLink>
        <NavLink to="/carts" className={({ isActive }) => isActive ? "underline" : ""}>
          Cart
        </NavLink>
        <NavLink to="/orders" className={({ isActive }) => isActive ? "underline" : ""}>
          Orders
        </NavLink>
        {user ? (
          <>
            <NavLink to="/profile" className={({ isActive }) => isActive ? "underline" : ""}>
              Profile
            </NavLink>
            <button onClick={logout} className="ml-2 bg-red-500 px-3 py-1 rounded">
              Logout
            </button>
          </>
        ) : (
          <>
            <NavLink to="/users/login">Login</NavLink>
            <NavLink to="/users/register">Register</NavLink>
          </>
        )}
      </div>
    </nav>
  );
}
