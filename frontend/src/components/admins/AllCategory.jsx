import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";

import {
  Layers3,
  FolderOpen,
} from "lucide-react";

export default function AllCategory({ refresh }) {

  const [category, setCategory] = useState([]);
  const [count, setCount] = useState(0);

  // ---------------- FETCH CATEGORY ----------------
  const getCategory = async () => {

    try {

      const res = await axiosInstance.get(
        "/categories/all-category"
      );

      setCategory(res.data.category);
      setCount(res.data.categoryCount);

    } catch (error) {

      console.log(error);

    }
  };

  useEffect(() => {
    getCategory();
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

          <div
            className="
              bg-red-50
              p-1.5
              rounded-lg
            "
          >

            <Layers3
              size={16}
              className="text-red-500"
            />

          </div>

          <div>

            <h2
              className="
                text-sm font-semibold
                text-gray-800
              "
            >
              Categories
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

      {/* CATEGORY LIST */}
      <div
        className="
          max-h-40
          overflow-y-auto
          space-y-1
          pr-1
        "
      >

        {category.length === 0 ? (

          <div
            className="
              flex flex-col items-center
              justify-center
              py-6
            "
          >

            <FolderOpen
              size={28}
              className="text-gray-300"
            />

            <p
              className="
                text-xs text-gray-400
                mt-2
              "
            >
              No Categories
            </p>

          </div>

        ) : (

          category.map((item) => (

            <div
              key={item._id}
              className="
                flex items-center
                justify-between

                px-2 py-1.5

                rounded-lg

                hover:bg-gray-50

                transition-all duration-200
              "
            >

              <p
                className="
                  text-xs
                  font-medium
                  text-gray-700
                  truncate
                "
              >
                {item.name}
              </p>

            </div>
          ))
        )}

      </div>

    </div>
  );
}