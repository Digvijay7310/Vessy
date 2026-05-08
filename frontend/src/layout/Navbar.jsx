import { Link } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import Logout from "../components/customers/Logout";

export default function Navbar({ horizontal = true }) {
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Categories", path: "/categories" },
    { name: "Products", path: "/products" },
    { name: "Orders", path: "/orders" },
    { name: "Cart", path: "/my-cart" },
    { name: "Login", path: "/customer/login" },
    
  ];

  return (
    <nav
      className={`
        ${horizontal ? "flex-row justify-center" : "flex-col"}
        flex items-center gap-6 px-6 py-3
        text-sm font-medium text-gray-600
        bg-white border-b
      `}
    >
      {navLinks.map((link) => (
        <Link
          key={link.path}
          to={link.path}
          className="
            relative group transition
            hover:text-black
          "
        >
          {link.name}

          {/* hover underline animation */}
          <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-black transition-all group-hover:w-full"></span>
        </Link>
      ))}
      <Logout />
    </nav>
  );
}