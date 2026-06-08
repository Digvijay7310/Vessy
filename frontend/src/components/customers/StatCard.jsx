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
    <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">
      <div className="flex items-center flex-col gap-3">
        <div
          className={`h-11 w-11 rounded-xl flex items-center justify-center ${current?.bg}`}
        >
          <Icon size={20} className={current?.color} />
        </div>

        <div className="min-w-0">
          <p className="text-[11px] text-gray-500 font-medium">
            {label}
          </p>

          <h3 className="text-xl text-center font-bold text-gray-900 leading-none mt-1">
            {value}
          </h3>
        </div>
      </div>
    </div>
  );
}