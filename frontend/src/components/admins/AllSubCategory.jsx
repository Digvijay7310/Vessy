import { useState, useEffect } from "react";
import axiosInstance from "../../utils/axiosInstance";

import {
  Shapes,
  FolderOpen,
} from "lucide-react";

export default function AllSubCategory({ refresh }) {

  const [subcategory, setSubCategory] = useState([]);
  const [count, setCount] = useState(0);

  // ---------------- FETCH ----------------
  const getSubCategory = async () => {

    try {

      const res = await axiosInstance.get(
        "/categories/all-sub-category"
      );

      setSubCategory(res.data.subcategory);
      setCount(res.data.subcategoryCount);

    } catch (error) {

      console.log(error);

    }
  };

  useEffect(() => {
    getSubCategory();
  }, [refresh]);

  return (
    <div
      className="
        bg-white
        border
        rounded-xl
        shadow-sm
        p-3
      "
    >

      {/* HEADER */}
      <div
        className="
          flex items-center justify-between
          mb-3
        "
      >

        <div className="flex items-center gap-2">

          <div className="bg-blue-50 p-1.5 rounded-lg">

            <Shapes
              size={16}
              className="text-blue-500"
            />

          </div>

          <div>

            <h2
              className="
                text-sm font-semibold
                text-gray-800
              "
            >
              SubCategories
            </h2>

            <p
              className="
                text-[11px]
                text-gray-500
              "
            >
              {count} Total
            </p>

          </div>

        </div>

      </div>

      {/* LIST */}
      <div
        className="
          max-h-40
          overflow-y-auto
          space-y-2
          pr-1
        "
      >

        {subcategory.length === 0 ? (

          <div
            className="
              flex flex-col items-center
              justify-center py-6
            "
          >

            <FolderOpen
              size={28}
              className="text-gray-300"
            />

            <p className="text-xs text-gray-400 mt-2">
              No SubCategories
            </p>

          </div>

        ) : (

          subcategory.map((item) => (

            <div
              key={item._id}
              className="
                flex items-center justify-between
                px-2 py-2
                rounded-lg
                hover:bg-gray-50
                transition-all duration-200
              "
            >

              {/* NAME */}
              <p
                className="
                  text-xs font-medium
                  text-gray-700
                  truncate
                "
              >
                {item.name}
              </p>

              {/* IMAGE */}
              <img
                src={item.image}
                alt={item.name}
                className="
                  h-8 w-8
                  object-cover
                  rounded-lg
                  border
                  flex-shrink-0
                "
              />

            </div>
          ))
        )}

      </div>

    </div>
  );
}