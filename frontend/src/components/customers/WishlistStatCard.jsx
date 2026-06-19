import { useNavigate } from "react-router-dom";
import { AiOutlineHeart } from "react-icons/ai";

export default function WishlistStatCard({ count = 0 }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate("/customer/wishlist")}
      className="
        relative cursor-pointer

        bg-white/80 backdrop-blur-md
        border border-slate-200

        rounded-2xl
        p-5

        shadow-sm
        hover:shadow-xl
        hover:-translate-y-1

        transition-all duration-300

        flex items-center justify-between
        overflow-hidden
      "
    >
      {/* LEFT */}
      <div className="flex flex-col gap-1">
        <p className="text-xs font-medium text-slate-500">
          Wishlist
        </p>

        <h3 className="text-3xl font-bold text-rose-500">
          {count}
        </h3>

        <p className="text-[11px] text-slate-400">
          Saved items
        </p>
      </div>

      {/* ICON TILE */}
      <div className="h-12 w-12 rounded-xl bg-rose-50 flex items-center justify-center text-rose-500 shadow-inner">
        <AiOutlineHeart size={22} />
      </div>

      {/* GLOW */}
      <div className="absolute -top-10 -right-10 w-28 h-28 bg-rose-200 blur-3xl opacity-30 rounded-full" />
    </div>
  );
}