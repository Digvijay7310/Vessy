import { ShoppingBasketIcon } from "lucide-react";
import React from "react";

export default function NotificationToast({ notification }) {
  const { customerName, totalAmount } = notification;

  return (
    <div className="relative w-50 bg-white border border-gray-100 shadow-2xl rounded-2xl p-2 overflow-hidden animate-[slideIn_0.2s_ease-out]">

      {/* top gradient bar */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 via-green-500 to-teal-500"></div>

      {/* glow background effect */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-green-100 blur-2xl opacity-30 rounded-full"></div>

      {/* header */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-green-100 flex items-center justify-center shadow-sm">
          <span className="text-green-600 text-base"><ShoppingBasketIcon /></span>
        </div>

        <div>
          <p className="text-sm font-semibold text-gray-800 leading-tight">
            New Order Received
          </p>
          <p className="text-[11px] text-gray-400">
            Live notification
          </p>
        </div>
      </div>

      {/* body */}
      <div className="mt-3">
        <p className="text-xs text-gray-600">
          <span className="font-semibold text-gray-800">
            {customerName}
          </span>{" "}
          placed a new order.
        </p>
      </div>

      {/* footer */}
      <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
        <span className="text-[11px] text-gray-400">
          Just now
        </span>

        <span className="text-sm font-bold text-green-600 flex items-center gap-1">
          ₹{totalAmount}
        </span>
      </div>

      {/* inline animation (no extra file needed) */}
      <style>
        {`
          @keyframes slideIn {
            0% {
              transform: translateX(120%);
              opacity: 0;
            }
            60% {
              transform: translateX(-8%);
              opacity: 1;
            }
            100% {
              transform: translateX(0);
              opacity: 1;
            }
          }
        `}
      </style>
    </div>
  );
}