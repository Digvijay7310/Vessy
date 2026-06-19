import {
  ShoppingBag,
  CheckCircle2,
  Wallet,
  ShoppingCart,
} from "lucide-react";

export default function StatCard({ label, value }) {
  const config = {
    "Total Orders": {
      icon: ShoppingBag,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    Delivered: {
      icon: CheckCircle2,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    "Total Spent": {
      icon: Wallet,
      color: "text-violet-600",
      bg: "bg-violet-50",
    },
    "Cart Items": {
      icon: ShoppingCart,
      color: "text-orange-600",
      bg: "bg-orange-50",
    },
  };

  const current = config[label];
  const Icon = current?.icon;

  return (
    <div
      className="
        bg-white/80 backdrop-blur-md
        border border-slate-200

        rounded-2xl
        p-5

        shadow-sm
        hover:shadow-xl
        hover:-translate-y-1

        transition-all duration-300

        flex items-center justify-between
      "
    >
      {/* LEFT TEXT */}
      <div className="flex flex-col gap-1">
        <p className="text-xs font-medium text-slate-500">
          {label}
        </p>

        <h3 className="text-2xl font-bold text-slate-900">
          {value}
        </h3>
      </div>

      {/* ICON TILE */}
      <div
        className={`
          h-12 w-12 rounded-xl
          flex items-center justify-center
          ${current?.bg}
        `}
      >
        {Icon && <Icon size={20} className={current?.color} />}
      </div>
    </div>
  );
}