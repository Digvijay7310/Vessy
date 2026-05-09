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
    <div className="px-4 md:px-10 lg:px-20 py-6 space-y-10">

      {/* LOADING SKELETON */}
      {loading && (
        <div className="space-y-8">
          {[1, 2, 3].map((i) => (
            <div key={i}>
              <div className="h-6 w-40 bg-gray-200 animate-pulse rounded mb-4"></div>

              <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-8 gap-3">
                {[...Array(8)].map((_, j) => (
                  <div
                    key={j}
                    className="h-24 bg-gray-200 animate-pulse rounded-lg"
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
          <div key={index} className="space-y-4">

            {/* CATEGORY HEADER */}
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900">
                {cat.categoryName}
              </h2>
            </div>

            {/* SUBCATEGORY GRID */}
            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-7 lg:grid-cols-9 gap-4">

              {cat.subCategories.map((sub, i) => (
                <div
                  key={i}
                  onClick={() =>
                    navigate(`/sub-category/${sub._id}`)
                  }
                  className="
                    cursor-pointer bg-white border border-gray-100
                    rounded-xl p-3 flex flex-col items-center
                    shadow-sm hover:shadow-lg hover:-translate-y-1
                    transition duration-200
                  "
                >
                  {/* IMAGE */}
                  <div className="w-10 h-10 sm:w-14 sm:h-14 flex items-center justify-center">
                    <img
                      src={sub.image}
                      alt={sub.name}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  {/* NAME */}
                  <p className="text-[8px] sm:text-xs text-center mt-2 font-medium text-gray-700 line-clamp-2">
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