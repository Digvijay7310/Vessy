import { useState } from "react";
import {
  Menu,
  Search,
  User,
  Heart,
  X,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import Logo from "../components/Logo";
import Searchbar from "../components/Searchbar";
import Navbar from "./Navbar";

export default function Header() {
  const navigate = useNavigate();

  const [mobileMenu, setMobileMenu] = useState(false);
  const [mobileSearch, setMobileSearch] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      {/* TOP HEADER */}
      <div className="max-w-7xl mx-auto lg:px-8">
        <div className="h-[72px] flex items-center justify-between gap-2">

          {/* LEFT */}
          <div className="flex items-center gap-3">

            <button
              onClick={() => setMobileMenu(true)}
              className="
                lg:hidden
                p-2
                rounded-xl
                hover:bg-slate-100
                transition
              "
            >
              <Menu size={22} />
            </button>

            <Logo />
          </div>

          {/* DESKTOP SEARCH */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-auto">
            <Searchbar />
          </div>

          {/* RIGHT ACTIONS */}
          <div className="flex items-center gap-2">

            {/* MOBILE SEARCH */}
            <button
              onClick={() => setMobileSearch(true)}
              className="
                md:hidden
                h-10
                w-10
                rounded-xl
                hover:bg-slate-100
                flex
                items-center
                justify-center
                transition
              "
            >
              <Search size={20} />
            </button>

            {/* WISHLIST */}
            <button
              onClick={() =>
                navigate("/customer/wishlist")
              }
              className="
                hidden sm:flex
                h-10
                w-10
                rounded-xl
                hover:bg-slate-100
                items-center
                justify-center
                transition
              "
            >
              <Heart size={20} />
            </button>

            {/* PROFILE */}
            <button
              onClick={() =>
                navigate("/customer/profile")
              }
              className="
                h-10
                w-10
                rounded-xl
                hover:bg-slate-100
                flex
                items-center
                justify-center
                transition
              "
            >
              <User size={20} />
            </button>

          </div>
        </div>
      </div>

      {/* DESKTOP NAVBAR */}
      <div className="hidden lg:block border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-2 lg:px-8">
          <Navbar />
        </div>
      </div>

      {/* MOBILE SEARCH */}
      {mobileSearch && (
        <>
          <div
            className="
              fixed
              inset-0
              bg-black/40
              z-40
            "
            onClick={() =>
              setMobileSearch(false)
            }
          />

          <div
            className="
              fixed
              top-0
              left-0
              right-0
              bg-white
              z-50
              p-4
              border-b
              shadow-lg
            "
          >
            <div className="relative">
              <Searchbar />

              <button
                onClick={() =>
                  setMobileSearch(false)
                }
                className="
                  absolute
                  -top-1
                  right-0
                  p-2
                "
              >
                <X size={20} />
              </button>
            </div>
          </div>
        </>
      )}

      {/* MOBILE DRAWER */}
      {mobileMenu && (
        <>
          <div
            className="
              fixed
              inset-0
              bg-black/40
              z-40
            "
            onClick={() =>
              setMobileMenu(false)
            }
          />

          <div
            className="
              fixed
              top-0
              left-0
              h-screen
              w-[320px]
              max-w-[85vw]
              bg-white
              z-50
              shadow-2xl
              border-r
              p-5
              animate-slideIn
            "
          >
            {/* HEADER */}
            <div className="flex items-center justify-between mb-6">

              <Logo />

              <button
                onClick={() =>
                  setMobileMenu(false)
                }
                className="
                  p-2
                  rounded-xl
                  hover:bg-slate-100
                "
              >
                <X size={20} />
              </button>
            </div>

            {/* MOBILE NAV */}
            <Navbar mobile />
          </div>
        </>
      )}
    </header>
  );
}