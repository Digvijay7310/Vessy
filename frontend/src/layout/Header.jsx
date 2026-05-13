import React, { useEffect, useRef, useState } from "react";
import Navbar from "./Navbar";
import Searchbar from "../components/Searchbar";
import Logo from "../components/Logo";
import CartItems from "../components/CartItems";
import YourOrders from "../components/customers/YourOrders";
import { BiSearch, BiUserCircle } from "react-icons/bi";
import { IoMdClose } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineUser } from "react-icons/ai";

export default function Header() {
  const [showNav, setShowNav] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const navRef = useRef();
  const searchRef = useRef();

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
    <header className="sticky top-0 z-50 bg-white shadow-sm">

      {/* TOP BAR */}
      <div className="flex items-center justify-between md:justify-evenly px-1 py-3">

        <Logo />

        {/* Desktop Search */}
        <div className="hidden md:flex flex-1 max-w-2xl mx-6">
          <Searchbar />
        </div>

        {/* RIGHT ACTIONS */}
        <div className="flex items-center gap-5">


          {/* Mobile search */}
          <button
            onClick={() => setShowSearch(!showSearch)}
            className="md:hidden text-xl"
          >
            {showSearch ? <IoMdClose /> : <BiSearch />}
          </button>
          <CartItems />

          <button className="bg-emerald-600 p-0.5 rounded-full text-white font-medium">
            <AiOutlineUser size={22} />
          </button>


          {/* Mobile menu */}
          <button
            onClick={() => setShowNav(!showNav)}
            className="md:hidden text-2xl"
          >
            <GiHamburgerMenu />
          </button>

        </div>
      </div>

      {/* SEARCH MOBILE */}
      {showSearch && (
        <div ref={searchRef} className="md:hidden px-4 pb-3">
          <Searchbar />
        </div>
      )}

      {/* DESKTOP NAVBAR */}
      <div className="hidden md:block">
        <Navbar horizontal />
      </div>

      {/* MOBILE NAV */}
      {showNav && (
        <div
          ref={navRef}
          className="absolute top-full left-0 w-full bg-white shadow-lg border-t"
        >
          <Navbar horizontal={false} />
        </div>
      )}

    </header>
  );
}