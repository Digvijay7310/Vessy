import { Link } from "react-router-dom";

export default function Navbar({ horizontal }) {
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
      className={`${ 
        horizontal ? "flex-row" : "flex-col"
      } flex gap-3 p-4 max-w-sm text-gray-700 font-medium` }
    >
      {navLinks.map((link) => (
        <Link
          key={link.path}
          to={link.path}
          className="hover:text-black transition"
        >
          {link.name}
        </Link>
      ))}
    </nav>
  );
}