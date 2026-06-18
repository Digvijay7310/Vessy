import { ShoppingBag, Lock, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function LoginRequiredCard() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-gradient-to-br from-slate-50 via-white to-indigo-50 px-4">
      <div className="w-full max-w-lg overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">
        
        {/* Top Banner */}
        <div className="relative bg-gradient-to-r from-green-600 to-green-600 px-8 py-10">
          <div className="absolute inset-0 opacity-10">
            <div className="h-full w-full bg-[radial-gradient(circle_at_top_right,white,transparent_40%)]" />
          </div>

          <div className="relative flex items-center justify-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/20 backdrop-blur">
              <Lock className="h-10 w-10 text-white" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 text-center">
          <h2 className="mb-3 text-3xl font-bold text-slate-900">
            Login Required
          </h2>

          <p className="mb-8 text-slate-600">
            We couldn't find the information you're looking for. Sign in to
            access your account, orders, wishlist, and personalized shopping
            experience.
          </p>

          {/* Features */}
          <div className="mb-8 grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-slate-50 p-3 text-sm font-medium text-slate-700">
              Order History
            </div>

            <div className="rounded-xl bg-slate-50 p-3 text-sm font-medium text-slate-700">
              Wishlist
            </div>

            <div className="rounded-xl bg-slate-50 p-3 text-sm font-medium text-slate-700">
              Faster Checkout
            </div>

            <div className="rounded-xl bg-slate-50 p-3 text-sm font-medium text-slate-700">
              Exclusive Offers
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <button
              onClick={() => navigate("/customer/login")}
              className="group flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 px-5 py-3 font-semibold text-white transition-all duration-300 hover:bg-indigo-700 hover:shadow-lg"
            >
              Sign In
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>

            <button
              onClick={() => navigate("/")}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-300 px-5 py-3 font-medium text-slate-700 transition-all hover:bg-slate-50"
            >
              <ShoppingBag className="h-4 w-4" />
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}