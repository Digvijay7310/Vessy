import { Link } from "react-router-dom";
import Logout from "../components/customers/Logout"

export default function Navbar({ mobile = false }) {

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/products" },
    { name: "Categories", path: "/categories" },
    { name: "Orders", path: "/my-orders" },
    { name: "Cart", path: "/my-cart" },
    {name: "login", path: "/customer/login"},
    { name: "My  Profile", path: "/customer/profile"},
    
  ];

  return (
    <nav
      className={`flex ${
        mobile
          ? "flex-col items-start gap-5"
          : "items-center gap-8 h-14"
      }`}
    >

      {navLinks.map((link) => (

        <Link
          key={link.path}
          to={link.path}
          className="
            text-sm
            font-medium
            text-gray-700
            hover:text-emerald-600
            transition-colors
          "
        >
          {link.name}
        </Link>
        
      ))}
      <Logout />
    </nav>
  );
}