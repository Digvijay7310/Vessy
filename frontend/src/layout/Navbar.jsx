import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar({ horizontal }) {

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Categories", path: "/categories" },
    { name: "Products", path: "/products" },
    { name: "Orders", path: "/orders" },
    { name: "Cart", path: "/cart" },
    { name: "About", path: "/about" },
    { name: "Join Us", path: "/join" },
    { name: "Login", path: "/customer/login" },
    { name: "Register", path: "/customer/register" },
  ]

  return (
    <nav className={`flex ${horizontal ? "flex-row" : "flex-col"} z-50 gap-3 p-2`}>
      {navLinks.map((link, index) => (
        <Link key={index} to={link.path} className="hover:text-red-600">
          {link.name}
        </Link>
      ))}
    </nav>
  )
}