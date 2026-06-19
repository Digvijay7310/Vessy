import { NavLink } from "react-router-dom";
import Logout from "../components/customers/Logout";

export default function Navbar({ mobile = false }) {
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/products" },
    { name: "Categories", path: "/categories" },
    { name: "Orders", path: "/my-orders" },
    { name: "Cart", path: "/my-cart" },
    { name: "Login", path: "/customer/login" },
    { name: "Profile", path: "/customer/profile" },
    { name: "Wishlist", path: "/customer/wishlist" },
  ];

  return (
    <nav
      className={
        mobile
          ? "flex flex-col gap-3 bg-slate-50"
          : "flex items-center gap-6 h-14"
      }
    >
      {navLinks.map((link) => (
        <NavLink
          key={link.path}
          to={link.path}
          className={({ isActive }) =>
            `
              relative
              text-sm font-medium
              transition-all duration-200

              ${
                isActive
                  ? "bg-emerald-500 text-white"
                  : "text-slate-700 hover:text-emerald-600"
              }

              ${mobile ? "py-2 px-2 rounded-md w-full hover:bg-emerald-700" : ""}
            `
          }
        >
          {link.name}
        </NavLink>
      ))}

      {/* Logout section */}
      <div
        className={
          mobile
            ? "mt-4 pt-4 border-t border-slate-200 w-full"
            : ""
        }
      >
        <Logout />
      </div>
    </nav>
  );
}