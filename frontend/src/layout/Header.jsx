import React, { useEffect, useRef, useState } from "react";
import Navbar from "./Navbar";
import Searchbar from "../components/Searchbar";
import Logo from "../components/Logo";
import CartItems from "../components/CartItems";
import YourOrders from "../components/YourOrders";
import { BiSearch } from "react-icons/bi";
import { IoMdClose } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";

export default function Header() {
  const [showNav, setShowNav] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const navRef = useRef();
  const searchRef = useRef();

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setShowNav(false);
      }
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSearch(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">

      {/* MAIN BAR */}
      <div className="flex items-center justify-between px-4 py-3">

        <Logo />

        {/* Desktop Search */}
        <div className="hidden sm:flex flex-1 max-w-xl mx-6">
          <Searchbar />
        </div>

        {/* Right Icons */}
        <div className="flex items-center gap-4">

          <YourOrders />

          <CartItems />

          {/* Mobile Search */}
          <button
            onClick={() => setShowSearch((p) => !p)}
            className="sm:hidden text-xl text-gray-700"
          >
            {showSearch ? <IoMdClose /> : <BiSearch />}
          </button>

          {/* Menu */}
          <button
            onClick={() => setShowNav((p) => !p)}
            className="text-2xl text-gray-700"
          >
            <GiHamburgerMenu />
          </button>

        </div>
      </div>

      {/* MOBILE SEARCH */}
      <div
        ref={searchRef}
        className={`sm:hidden px-4 pb-3 transition-all duration-300 ${
          showSearch ? "block opacity-100" : "hidden opacity-0"
        }`}
      >
        <Searchbar />
      </div>

      {/* MOBILE NAV */}
      {showNav && (
        <div
          ref={navRef}
          className="absolute top-full left-0 w-full bg-white shadow-lg border-t animate-fadeIn"
        >
          <Navbar />
        </div>
      )}

    </header>
  );
}