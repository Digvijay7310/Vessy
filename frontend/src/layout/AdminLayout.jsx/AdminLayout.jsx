import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Outlet } from "react-router-dom";

export default function AdminLayout() {

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-gray-100">

      <Sidebar
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />

      <div className="flex-1 flex flex-col lg:ml-0">

        <Header setIsOpen={setIsOpen} />

        <main className="p-4 md:p-6">
          <Outlet />
        </main>

      </div>

    </div>
  );
}