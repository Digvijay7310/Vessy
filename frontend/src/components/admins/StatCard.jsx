import React from "react";

export default function StatCard({
  title,
  value,
  color,
  bgColor,
}) {
  return (
    <div
      className={`
        ${bgColor}
        rounded-xl
        border
        p-4
        shadow-sm
        hover:shadow-md
        transition-all
        h-[120px]
        flex
        flex-col
        justify-between
      `}
    >
      <h3 className="text-sm font-medium text-gray-600">
        {title}
      </h3>

      <p className={`text-2xl font-bold ${color}`}>
        {value}
      </p>
    </div>
  );
}