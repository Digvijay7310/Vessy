import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { CartProvider } from "../context/CartContext";

export default function Layout() {
  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col bg-white">
        
        {/* HEADER */}
        <Header />

        {/* MAIN */}
        <main className="flex-1 w-full max-w-7xl mx-auto px-3 sm:px-4 py-4">
          <Outlet />
        </main>

        {/* FOOTER */}
        <Footer />
        
      </div>
    </CartProvider>
  );
}