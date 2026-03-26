import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axios";
import AddCategoryOrSubCategory from "./AddCategoryOrSubCategory";

function CategoryAndSubCategory() {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  const [showForm, setShowForm] = useState(null); // "category" | "sub"

  const fetchData = async () => {
    try {
      const res = await axiosInstance.get(
        "/categories/all-category-and-sub-category"
      );

      setCategories(res.data.data.categoryName);
      setSubCategories(res.data.data.subCategoryName);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ✅ DELETE CATEGORY
  const deleteCategory = async (id) => {
    try {
      await axiosInstance.delete(`/category/${id}`);
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  // ✅ DELETE SUBCATEGORY
  const deleteSubCategory = async (id) => {
    try {
      await axiosInstance.delete(`/subcategory/${id}`);
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mt-3 space-y-4">

      {/* GRID */}
      <div className="grid md:grid-cols-2 gap-4">

        {/* CATEGORY */}
        <div className="p-3 border rounded bg-yellow-50">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold">Categories</h3>
            <button
              onClick={() => setShowForm("category")}
              className="bg-red-500 text-white px-2 py-1 rounded text-sm"
            >
              + Add
            </button>
          </div>

          <div className="space-y-2">
            {categories.map((cat, idx) => (
              <div
                key={idx}
                className="flex justify-between items-center bg-white border px-2 py-1 rounded"
              >
                <span>{cat}</span>

                <button
                  onClick={() => deleteCategory(cat._id)}
                  className="text-xs bg-black text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* SUBCATEGORY */}
        <div className="p-3 border rounded bg-yellow-50">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold">SubCategories</h3>
            <button
              onClick={() => setShowForm("sub")}
              className="bg-red-500 text-white px-2 py-1 rounded text-sm"
            >
              + Add
            </button>
          </div>

          <div className="space-y-2">
            {subCategories.map((sub) => (
              <div
                key={sub._id}
                className="flex items-center justify-between bg-white border px-2 py-1 rounded"
              >
                <div className="flex items-center gap-2">
                  <img
                    src={sub.image}
                    alt={sub.name}
                    className="w-10 h-10 object-cover rounded"
                  />
                  <span>{sub.name}</span>
                </div>

                <button
                  onClick={() => deleteSubCategory(sub._id)}
                  className="text-xs bg-black text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* FORM AREA */}
      {showForm && (
        <AddCategoryOrSubCategory
          type={showForm}
          categories={categories}
          refresh={fetchData}
          close={() => setShowForm(null)}
        />
      )}

    </div>
  );
}

export default CategoryAndSubCategory;