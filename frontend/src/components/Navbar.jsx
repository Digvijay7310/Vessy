import React, { useState } from "react";
import { FaShoppingCart, FaUser, FaBars } from "react-icons/fa";

const Navbar = () => {
  const [cartCount, setCartCount] = useState(2);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
  

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-6">
            <a href="#" className="text-gray-700 hover:text-pink-600 font-medium">Home</a>
            <a href="#" className="text-gray-700 hover:text-pink-600 font-medium">Shop</a>
            <a href="#" className="text-gray-700 hover:text-pink-600 font-medium">Categories</a>
            <a href="#" className="text-gray-700 hover:text-pink-600 font-medium">About Us</a>
            <a href="#" className="text-gray-700 hover:text-pink-600 font-medium">Contact</a>
          </div>

          {/* Search + Icons */}
          <div className="flex items-center space-x-4">
            
            <div className="relative text-gray-700 cursor-pointer">
              <FaShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-pink-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </div>
            <div className="text-gray-700 cursor-pointer">
              <FaUser size={20} />
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden text-gray-700 cursor-pointer" onClick={toggleMobileMenu}>
              <FaBars size={20} />
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-2 space-y-2 pb-4">
            <a href="#" className="block text-gray-700 hover:text-pink-600">Home</a>
            <a href="#" className="block text-gray-700 hover:text-pink-600">Shop</a>
            <a href="#" className="block text-gray-700 hover:text-pink-600">Categories</a>
            <a href="#" className="block text-gray-700 hover:text-pink-600">About Us</a>
            <a href="#" className="block text-gray-700 hover:text-pink-600">Contact</a>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;