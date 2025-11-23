import { Link, NavLink } from "react-router-dom";
import { useUserAuth } from "../hooks/userUserAuth";

export default function Navbar({ cart }) { // cart state prop pass karo
  const { user, logout } = useUserAuth();

  const totalItems = cart?.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;

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
        <NavLink to="/cart" className={({ isActive }) => isActive ? "underline" : ""}>
          Cart: {totalItems} {/* show total items */}
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
