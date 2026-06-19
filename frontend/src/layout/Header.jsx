import { useState } from "react";
import { Menu, Search, User, X } from "lucide-react";

import Logo from "../components/Logo";
import Searchbar from "../components/Searchbar";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import CartItems from "../components/CartItems";

export default function Header() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [mobileSearch, setMobileSearch] = useState(false);

  const navigate = useNavigate();

  return (
    <header
      className="
        sticky top-0 z-50
        bg-white/80
        backdrop-blur-xl
        border-b border-slate-200/60
        shadow-[0_8px_30px_rgb(0,0,0,0.04)]
      "
    >
      {/* TOP BAR */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="h-[72px] flex items-center justify-between gap-4">

          {/* LEFT */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenu(true)}
              className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition"
            >
              <Menu size={22} />
            </button>

            <Logo />
          </div>

          {/* CENTER (DESKTOP SEARCH) */}
          <div className="hidden md:flex flex-1 justify-center px-6">
            <Searchbar />
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-3">

            {/* MOBILE SEARCH ICON */}
            <button
              onClick={() => setMobileSearch((p) => !p)}
              className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition"
            >
              <Search size={20} />
            </button>

            {/* PROFILE */}
            <button
              onClick={() => navigate("/customer/profile")}
              className="
                w-10 h-10
                rounded-full
                bg-slate-100
                hover:bg-emerald-50
                hover:text-emerald-600
                flex items-center justify-center
                transition
              "
            >
              <User size={20} />
            </button>

            {/* CART */}
            <CartItems />
          </div>
        </div>
      </div>

      {/* MOBILE SEARCH */}
      {
  mobileSearch && (
    <>
      <div
        className="fixed inset-0 bg-black/40 z-50"
        onClick={() => setMobileSearch(false)}
      />

      <div
        className="
          fixed
          top-0
          left-0
          right-0
          z-[60]
          bg-white
          p-4
          shadow-lg
          animate-slideDown
        "
      >
        <Searchbar />

        <button
          onClick={() => setMobileSearch(false)}
          className="
            absolute
            top-4
            right-4
            p-2
          "
        >
          <X size={20} />
        </button>
      </div>
    </>
  )
}

      {/* DESKTOP NAV */}
      <div className="hidden md:block border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4">
          <Navbar />
        </div>
      </div>

      {/* MOBILE SIDEBAR */}
      {mobileMenu && (
        <>
          {/* OVERLAY */}
          <div
            className="fixed inset-0 bg-black/40 z-40"
            onClick={() => setMobileMenu(false)}
          />

          {/* SIDEBAR */}
          <div
            className="
              fixed top-0 left-0
              h-full w-full
              bg-white
              shadow-2xl
              z-50
              p-5
              animate-slideIn
            "
          >
            <div className="flex items-center justify-between mb-2">
              <Logo />

              <button
                onClick={() => setMobileMenu(false)}
                className="p-2 rounded-lg hover:bg-slate-100 transition"
              >
                <X size={20} />
              </button>
            </div>

            <Navbar mobile />
          </div>
        </>
      )}
    </header>
  );
}