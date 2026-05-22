import { useState } from "react";
import {
  Menu,
  Search,
  ShoppingCart,
  User,
  X
} from "lucide-react";

import Logo from "../components/Logo";
import Searchbar from "../components/Searchbar";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import CartItems from "../components/CartItems"

export default function Header() {

  const [mobileMenu, setMobileMenu] = useState(false);
  const [mobileSearch, setMobileSearch] = useState(false);

  const navigate = useNavigate()

  return (
    <header className="sticky top-0 z-50 bg-white border-b">

      {/* TOP HEADER */}
      <div className="max-w-7xl mx-auto px-4">

        <div className="h-16 flex items-center justify-between gap-4">

          {/* LEFT */}
          <div className="flex items-center gap-3">

            <button
              onClick={() => setMobileMenu(true)}
              className="md:hidden"
            >
              <Menu size={24} />
            </button>

            <Logo />
          </div>

          {/* DESKTOP SEARCH */}
          <div className="hidden md:flex flex-1 max-w-2xl">
            <Searchbar />
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-5">

            {/* Mobile Search */}
            <button
              onClick={() => setMobileSearch(!mobileSearch)}
              className="md:hidden"
            >
              <Search size={22} />
            </button>

            {/* Account */}
            <button className="hover:text-emerald-600 transition">
              <User onClick={() => navigate("/customer/profile")} size={24} />
            </button>

            
            <CartItems />

          </div>
        </div>

      </div>

      {/* MOBILE SEARCH */}
      {mobileSearch && (
        <div className="md:hidden border-t px-4 py-3">
          <Searchbar />
        </div>
      )}

      {/* DESKTOP NAV */}
      <div className="hidden md:block border-t">
        <div className="max-w-7xl mx-auto px-4">
          <Navbar />
        </div>
      </div>

      {/* MOBILE SIDEBAR */}
      {mobileMenu && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/40 z-40"
            onClick={() => setMobileMenu(false)}
          />

          {/* Sidebar */}
          <div className="fixed top-0 left-0 h-full w-72 bg-white z-50 shadow-xl p-5">

            <div className="flex items-center justify-between mb-8">

              <Logo />

              <button onClick={() => setMobileMenu(false)}>
                <X />
              </button>

            </div>

            <Navbar mobile />

          </div>
        </>
      )}

    </header>
  );
}