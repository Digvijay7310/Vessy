import ProductRemoveButton from "../ProductRemoveButton";

export default function WishListCard({ item, navigate, onRemove }) {
  const image = item?.image?.[0] || item?.image;

  return (
    <div
      className="
        group relative

        bg-white
        border border-slate-200/60

        rounded-xl
        overflow-hidden

        shadow-sm
        hover:shadow-md

        transition-all duration-300

        flex items-center gap-4
      "
    >
      {/* IMAGE LEFT */}
      <div
        onClick={() =>
          navigate(`/products/product/${item._id}`)
        }
        className="
          w-20 h-20 sm:w-24 sm:h-24

          flex-shrink-0
          bg-slate-50

          rounded-lg
          overflow-hidden

          flex items-center justify-center
          cursor-pointer
        "
      >
        <img
          src={image}
          alt={item.name}
          className="
            w-full h-full object-contain
            group-hover:scale-105
            transition-transform duration-300
          "
        />
      </div>

      {/* TEXT MIDDLE */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-slate-800 line-clamp-2">
          {item.name}
        </p>

        <p className="text-emerald-600 font-bold mt-1">
          ₹{item.price}
        </p>

        <span className="text-[10px] text-slate-400">
          Saved in wishlist
        </span>
      </div>

      {/* ACTION RIGHT */}
      <div className="flex flex-col items-end gap-2">

        {/* REMOVE BUTTON */}
        <div
          onClick={(e) => {
            e.stopPropagation();
            onRemove(item._id);
          }}
        >
          <ProductRemoveButton />
        </div>

        {/* BADGE */}
        <span className="
          text-[10px]
          px-2 py-1
          bg-rose-100 text-rose-600
          rounded-full
        ">
          Wishlist
        </span>

      </div>
    </div>
  );
}