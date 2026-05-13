import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen">

      {/* HEADER */}
      <Header />

      {/* MAIN CONTENT */}
      <main className="w-full max-w-7xl mx-auto px-1 py-6">
        <Outlet />
      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}