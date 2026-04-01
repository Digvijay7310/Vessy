import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axios";
import AddCategory from "./AddCategory";
import AddSubCategory from "./AddSubCategory";

function CategoryAndSubCategory() {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);



  const fetchData = async () => {
    try {
      const res = await axiosInstance.get(
        "/categories/all-category-and-sub-category"
      );

      setCategories(res.data.data.categoryName);
      setSubCategories(res.data.data.subCategoryName);
      // console.log(res.data.data.subCategoryName)

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const deleteCategory = async(id) => {
    try {
      await axiosInstance.delete(`/categories/category/${id}`, {withCredentials: true})
      fetchData()
    } catch (error) {
      console.log(error)
    }
  }

  const deleteSubCategory = async(id) => {
    try {
      await axiosInstance.delete(`/categories/subcategory/${id}`, {withCredentials: true})
      fetchData()
    } catch (error) {
      console.log(error)
    }
  }



  return (
    <div className="mt-3 space-y-4">

      {/* GRID */}
      <div className="grid md:grid-cols-2 gap-4">

        {/* CATEGORY */}
        <div className="p-3 border rounded bg-yellow-50 max-h-40 overflow-y-auto">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold">Categories</h3>

          </div>

          <div className="space-y-0.5">
            {categories.map((cat, idx) => (
              
              <div
                key={idx}
                className="flex justify-between items-center bg-white p-1 rounded"
              >
                <span className="text-xs">{cat.name}</span>

                <button
                  onClick={() => deleteCategory(cat._id)}
                  className="text-xs bg-black text-white p-1 rounded"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* SUBCATEGORY */}
        <div className="p-3 border rounded bg-yellow-50 max-h-40 overflow-y-auto">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold">SubCategories</h3>

          </div>

          <div className="space-y-2">
            {subCategories.map((sub, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between bg-white rounded"
              >
                  <img src={sub.image?.optimized} alt={sub.name} className="w-10 border rounded object-contain" />
                  <span className="text-xs">{sub.name}</span>
                  <button
                  onClick={() => deleteSubCategory(sub._id)}
                  className="bg-red-500  p-1 text-white rounded">Delete</button>
                
              </div>
            ))}
          </div>
        </div>

      </div>

        {/* Add Category */}
       <AddCategory refreshCategories={fetchData} />
       <AddSubCategory refreshCategories={fetchData} /> 

    </div>
  );
}

export default CategoryAndSubCategory;