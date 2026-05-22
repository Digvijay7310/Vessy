import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import { CartProvider } from "../context/CartContext";

export default function Layout() {
  return (
    <>
    <CartProvider>
      {/* HEADER */}
      <Header />

      {/* MAIN CONTENT */}
      <main className="w-full max-w-7xl mx-auto px-1 py-6">
        <Outlet />
      </main>

      {/* FOOTER */}
      <Footer />
    </CartProvider>
    </>
  );
}