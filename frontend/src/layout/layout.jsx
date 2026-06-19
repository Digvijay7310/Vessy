import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { CartProvider } from "../context/CartContext";

export default function Layout() {
  return (
    <CartProvider>
      <div
        className="
          min-h-screen
          flex flex-col
          bg-gradient-to-b from-white via-zinc-50 to-zinc-100
          text-slate-900
        "
      >
        {/* HEADER */}
        <Header />

        {/* MAIN */}
        <main
          className="
            flex-1
            w-full
            max-w-7xl
            mx-auto
            px-4 sm:px-6 lg:px-8
            py-6
          "
        >
          <Outlet />
        </main>

        {/* FOOTER */}
        <Footer />
      </div>
    </CartProvider>
  );
}