import { useState, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";

export default function CategoryWithSubCategory() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const fetchCatAndSub = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get(
        "/categories/category-with-sub-category"
      );
      setData(res.data || []);
    } catch (error) {
      console.log("Error in fetch category with subcategory");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCatAndSub();
  }, []);

  return (
    <div className="px-2 md:px-10 lg:px-20 py-6 space-y-12">

      {/* LOADING SKELETON */}
      {loading && (
        <div className="space-y-10">
          {[1, 2, 3].map((i) => (
            <div key={i}>
              <div className="h-5 w-48 bg-gray-200 animate-pulse rounded mb-5"></div>

              <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-4">
                {[...Array(8)].map((_, j) => (
                  <div
                    key={j}
                    className="h-24 bg-gray-200 animate-pulse rounded-xl"
                  ></div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* CATEGORY LIST */}
      {!loading &&
        data.map((cat, index) => (
          <div key={index} className="space-y-5">

            {/* CATEGORY HEADER */}
            <div className="flex items-center gap-3">
              <div className="w-1 h-6 bg-blue-600 rounded"></div>

              <h2 className="text-xl font-semibold text-gray-900">
                {cat.categoryName}
              </h2>
            </div>

            {/* SUBCATEGORY GRID */}
            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-4">

              {cat.subCategories.map((sub) => (
                <div
                  key={sub._id}
                  onClick={() => navigate(`/sub-category/${sub._id}`)}
                  className="
                    cursor-pointer group bg-white
                    border border-gray-100 rounded-xl
                    p-3 flex flex-col items-center
                    shadow-sm hover:shadow-xl
                    hover:-translate-y-1
                    transition-all duration-300
                  "
                >
                  {/* IMAGE */}
                  <div className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center">
                    <img
                      src={sub.image}
                      alt={sub.name}
                      className="
                        w-full h-full object-contain
                        group-hover:scale-110 transition-transform duration-300
                      "
                    />
                  </div>

                  {/* NAME */}
                  <p className="text-[10px] sm:text-xs text-center mt-2 font-medium text-gray-700 line-clamp-2 group-hover:text-blue-600">
                    {sub.name}
                  </p>
                </div>
              ))}

            </div>
          </div>
        ))}
    </div>
  );
}