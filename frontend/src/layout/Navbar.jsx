import { NavLink } from "react-router-dom";
import Logout from "../components/customers/Logout";

const navLinks = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Shop",
    path: "/products",
  },
  {
    name: "Categories",
    path: "/categories",
  },
  {
    name: "Orders",
    path: "/my-orders",
  },
];

export default function Navbar({ mobile = false }) {
  return (
    <nav
      className={
        mobile
          ? "flex flex-col gap-1"
          : "flex items-center gap-2 h-10"
      }
    >
      {navLinks.map((link) => (
        <NavLink
          key={link.path}
          to={link.path}
          className={({ isActive }) =>
            `
            px-4
            py-2.5
            rounded-xl
            text-sm
            font-semibold
            transition-all
            duration-200

            ${
              isActive
                ? "bg-emerald-600 text-white shadow-sm"
                : "text-slate-700 hover:bg-slate-100"
            }

            ${mobile ? "w-full" : ""}
          `
          }
        >
          {link.name}
        </NavLink>
      ))}

      {mobile && (
        <>
          <div className="h-px bg-slate-200 my-3" />

          <NavLink
            to="/customer/profile"
            className="
              px-4
              py-2.5
              rounded-xl
              text-sm
              font-semibold
              text-slate-700
              hover:bg-slate-100
              transition
            "
          >
            My Profile
          </NavLink>

          <NavLink
            to="/customer/wishlist"
            className="
              px-4
              py-2.5
              rounded-xl
              text-sm
              font-semibold
              text-slate-700
              hover:bg-slate-100
              transition
            "
          >
            Wishlist
          </NavLink>

          <div className="mt-4 pt-4 border-t border-slate-200">
            <Logout />
          </div>
        </>
      )}
    </nav>
  );
}