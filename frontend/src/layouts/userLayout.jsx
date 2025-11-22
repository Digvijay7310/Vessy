
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function UserLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Main content */}
      <main className="flex-1 container mx-auto px-4 py-6">
        <Outlet /> {/* This will render the current page component */}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
