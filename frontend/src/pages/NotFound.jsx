import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div
      className="
        min-h-screen
        flex items-center justify-center
        bg-gradient-to-b from-white via-zinc-50 to-zinc-100
        px-4
      "
    >
      <div
        className="
          text-center
          bg-white
          border border-slate-200
          shadow-xl
          p-8 sm:p-10
          rounded-2xl
          max-w-md w-full
        "
      >
        {/* ICON */}
        <div className="text-5xl mb-3">🚧</div>

        {/* 404 */}
        <h1 className="text-6xl font-extrabold text-emerald-600 tracking-tight">
          404
        </h1>

        {/* TITLE */}
        <h2 className="text-xl font-semibold mt-3 text-slate-800">
          Page not found
        </h2>

        {/* DESCRIPTION */}
        <p className="text-sm text-slate-500 mt-3 mb-8 leading-relaxed">
          The page you’re looking for doesn’t exist, was moved, or the link is broken.
        </p>

        {/* BUTTONS */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">

          <button
            onClick={() => navigate("/")}
            className="
              bg-emerald-600
              hover:bg-emerald-700
              text-white
              px-5 py-2.5
              rounded-xl
              font-medium
              transition
              active:scale-95
            "
          >
            Go Home
          </button>

          <button
            onClick={() => navigate(-1)}
            className="
              bg-slate-100
              hover:bg-slate-200
              text-slate-700
              px-5 py-2.5
              rounded-xl
              font-medium
              transition
              active:scale-95
            "
          >
            Go Back
          </button>

        </div>
      </div>
    </div>
  );
}