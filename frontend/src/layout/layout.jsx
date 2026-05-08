import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">

      {/* HEADER */}
      <Header />

      {/* NAVBAR (desktop only optional inside header if needed) */}

      {/* MAIN CONTENT */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-6">
        <Outlet />
      </main>

      {/* FOOTER */}
      <Footer />

    </div>
  );
}