import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FolderArchive } from "lucide-react";
import axiosInstance from "../utils/axiosInstance";

export default function SearchSuggestions({
  search,
  show,
  setShow,
}) {
  const navigate = useNavigate();

  const [data, setData] = useState({
    products: [],
    categories: [],
    subCategories: [],
  });

  // FETCH SUGGESTIONS
  useEffect(() => {
    const timer = setTimeout(async () => {
      const query = search.trim();

      if (!query) {
        setData({
          products: [],
          categories: [],
          subCategories: [],
        });
        return;
      }

      try {
        const { data } = await axiosInstance.get(
          "/products/search-suggestion",
          {
            params: { q: query },
          }
        );

        setData(data);
      } catch (err) {
        console.log(err);
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [search]);

  const hasData =
    data.products.length ||
    data.categories.length ||
    data.subCategories.length;

  if (!show) return null;

  return (
    <div
      className="
        absolute top-[calc(100%+8px)]
        left-0 right-0
        bg-white border border-slate-200
        rounded-2xl shadow-xl
        z-50 overflow-hidden
      "
    >
      {!hasData ? (
        <div className="p-6 text-sm text-slate-400 text-center">
          Type to search products...
        </div>
      ) : (
        <>
          {/* PRODUCTS */}
          {data.products.map((p) => (
            <button
              key={p._id}
              onClick={() => {
                navigate(`/products/product/${p._id}`);
                setShow(false);
              }}
              className="flex items-center gap-3 w-full px-4 py-3 hover:bg-slate-50"
            >
              <img
                src={p.image?.[0]}
                className="w-10 h-10 rounded-lg object-cover border"
              />
              <span className="text-sm font-medium">
                {p.name}
              </span>
            </button>
          ))}

          {/* CATEGORIES */}
          {data.categories.map((c) => (
            <button
              key={c._id}
              onClick={() => {
                navigate(`/category/${c._id}`);
                setShow(false);
              }}
              className="flex items-center gap-3 w-full px-4 py-3 hover:bg-slate-50"
            >
              <FolderArchive size={16} />
              {c.name}
            </button>
          ))}

          {/* SUBCATEGORIES */}
          {data.subCategories.map((s) => (
            <button
              key={s._id}
              onClick={() => {
                navigate(`/sub-category/${s._id}`);
                setShow(false);
              }}
              className="flex items-center gap-3 w-full px-4 py-3 hover:bg-slate-50"
            >
              <FolderArchive size={16} />
              {s.name}
            </button>
          ))}
        </>
      )}
    </div>
  );
}