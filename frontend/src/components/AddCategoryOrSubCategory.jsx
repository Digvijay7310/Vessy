import React, { useState } from "react";
import axiosInstance from "../utils/axios";

function AddCategoryOrSubCategory({ type, categories, refresh, close }) {
  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (type === "category") {
        await axiosInstance.post("/category", { name });

      } else {
        if (!image) {
          alert("Image required");
          return;
        }

        const formData = new FormData();
        formData.append("name", name);
        formData.append("categoryId", categoryId);
        formData.append("image", image);

        await axiosInstance.post("/subcategory", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }

      refresh();   // 🔥 reload list
      close();     // 🔥 hide form

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mt-3 p-3 border rounded bg-orange-50">
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">

        <h4 className="font-semibold">
          {type === "category" ? "Add Category" : "Add SubCategory"}
        </h4>

        {/* Name */}
        <input
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded"
          required
        />

        {/* SubCategory Fields */}
        {type === "sub" && (
          <>
            <select
              onChange={(e) => setCategoryId(e.target.value)}
              className="border p-2 rounded"
              required
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>

            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              required
            />

            {/* Preview */}
            {image && (
              <img
                src={URL.createObjectURL(image)}
                alt="preview"
                className="w-16 h-16 object-cover rounded border"
              />
            )}
          </>
        )}

        {/* Buttons */}
        <div className="flex gap-2">
          <button className="bg-green-500 text-white px-3 py-1 rounded">
            Submit
          </button>
          <button
            type="button"
            onClick={close}
            className="bg-gray-400 text-white px-3 py-1 rounded"
          >
            Cancel
          </button>
        </div>

      </form>
    </div>
  );
}

export default AddCategoryOrSubCategory;