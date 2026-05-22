import { Link } from "react-router-dom";

export default function Navbar({ mobile = false }) {

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/products" },
    { name: "Categories", path: "/categories" },
    { name: "Orders", path: "/my-orders" },
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

    </nav>
  );
}