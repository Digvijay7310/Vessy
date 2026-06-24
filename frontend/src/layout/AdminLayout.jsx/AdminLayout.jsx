import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import NotificationToast from "../../components/admins/NotificationToast";
import { socket } from "../../utils/socket";

export default function AdminLayout() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);

  // ---------------- SOCKET NOTIFICATIONS ----------------
  useEffect(() => {
    const handler = (data) => {
      setNotifications((prev) => [data, ...prev]);

      // auto remove after 5 sec
      setTimeout(() => {
        setNotifications((prev) =>
          prev.filter((n) => n.orderId !== data.orderId)
        );
      }, 5000);
    };

    socket.on("new-order-notification", handler);

    return () => {
      socket.off("new-order-notification", handler);
    };
  }, []);

  return (
    <div className="min-h-screen flex bg-gray-100 relative">

      {/* ---------------- SIDEBAR ---------------- */}
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      {/* ---------------- MAIN ---------------- */}
      <div className="flex-1 flex flex-col lg:ml-0">
        <Header setIsOpen={setIsOpen} />

        <main className="p-4 md:p-6">
          <Outlet />
        </main>
      </div>

      {/* ---------------- GLOBAL NOTIFICATIONS ---------------- */}
      <div className="fixed top-4 right-4 z-50 space-y-3">
        {notifications.map((n) => (
          <NotificationToast
            key={n.orderId}
            notification={n}
          />
        ))}
      </div>

    </div>
  );
}