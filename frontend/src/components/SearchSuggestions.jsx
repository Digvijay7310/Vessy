import { FolderArchive } from "lucide-react";

export default function SearchSuggestions({
  data,
  show,
  activeIndex,
  onSelect,
}) {
  if (!show) return null;

  const items = [
    ...data.products.map((item) => ({
      ...item,
      type: "product",
    })),
    ...data.categories.map((item) => ({
      ...item,
      type: "category",
    })),
    ...data.subCategories.map((item) => ({
      ...item,
      type: "subcategory",
    })),
  ];

  return (
    <div
      className="
        absolute
        top-[calc(100%+8px)]
        left-0
        right-0
        bg-white
        border
        border-slate-200
        rounded-2xl
        shadow-xl
        overflow-hidden
        z-50
        max-h-96
        overflow-y-auto
      "
    >
      {!items.length ? (
        <div className="p-5 text-center text-sm text-slate-400">
          Type to search...
        </div>
      ) : (
        items.map((item, index) => (
          <button
            key={`${item.type}-${item._id}`}
            onClick={() => onSelect(item)}
            className={`
              w-full
              flex
              items-center
              gap-3
              p-2
              text-left
              transition

              ${
                activeIndex === index
                  ? "bg-emerald-50"
                  : "hover:bg-slate-50"
              }
            `}
          >
            {item.type === "product" ? (
              <>
                <img
                  src={item.image?.[0]}
                  alt={item.name}
                  className="
                    w-10
                    h-10
                    rounded-lg
                    object-cover
                    border
                  "
                />

                <span className="text-sm font-medium">
                  {item.name}
                </span>
              </>
            ) : (
              <>
                <FolderArchive size={16} />

                <span className="text-sm">
                  {item.name}
                </span>
              </>
            )}
          </button>
        ))
      )}
    </div>
  );
}