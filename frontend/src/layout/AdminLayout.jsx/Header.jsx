import React from "react";
import { Menu } from "lucide-react";

export default function Header({ setIsOpen }) {

  return (
    <header
      className="
        h-16
        bg-white
        border-b
        flex items-center justify-between
        px-4 md:px-6
        sticky top-0 z-30
      "
    >

      <div className="flex items-center gap-3">

        <button
          onClick={() => setIsOpen(true)}
          className="lg:hidden"
        >
          <Menu size={24} />
        </button>

        <h2 className="text-lg font-semibold text-gray-800">
          Admin Dashboard
        </h2>

      </div>

    </header>
  );
}