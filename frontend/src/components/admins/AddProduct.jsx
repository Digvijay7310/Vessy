import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { UploadCloud } from "lucide-react";

export default function AddProduct({ refresh }) {

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    subCategory: "",
  });

  const [image, setImage] = useState(null);

  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  // ---------------- FETCH CATEGORIES ----------------
  useEffect(() => {

    const fetchCategories = async () => {
      try {

        const res = await axiosInstance.get("/categories/all-category");

        setCategories(res.data.category);

      } catch (error) {
        console.log(error);
      }
    };

    fetchCategories();

  }, []);

  // ---------------- FETCH SUBCATEGORIES ----------------
  useEffect(() => {

    const fetchSubCategories = async () => {
      try {

        const res = await axiosInstance.get("/categories/all-sub-category");

        setSubCategories(res.data.subcategory);

      } catch (error) {
        console.log(error);
      }
    };

    fetchSubCategories();

  }, []);

  // ---------------- HANDLE CHANGE ----------------
  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  };

  // ---------------- SUBMIT ----------------
  const handleSubmit = async (e) => {

    e.preventDefault();

    if (
      !form.name ||
      !form.price ||
      !form.category ||
      !form.subCategory
    ) {
      return alert("All fields required");
    }

    if (!image) {
      return alert("Image required");
    }

    try {

      setLoading(true);

      const data = new FormData();

      data.append("name", form.name);
      data.append("price", form.price);
      data.append("description", form.description);
      data.append("category", form.category);
      data.append("subCategory", form.subCategory);
      data.append("image", image);

      await axiosInstance.post(
        "/products/create-product",
        data
      );

      // reset
      setForm({
        name: "",
        price: "",
        description: "",
        category: "",
        subCategory: "",
      });

      setImage(null);

      if (refresh) refresh();

    } catch (err) {

      console.log(err.response?.data || err.message);

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border p-5 md:p-6">

      {/* Heading */}
      <div className="mb-6">

        <h2 className="text-2xl font-bold text-gray-800">
          Add Product
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          Create a new product for your store
        </p>

      </div>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-5"
      >

        {/* Product Name */}
        <div>
          <label className="text-sm font-medium text-gray-700">
            Product Name
          </label>

          <input
            type="text"
            name="name"
            placeholder="Enter product name"
            value={form.name}
            onChange={handleChange}
            className="
              w-full mt-2
              border border-gray-300
              rounded-xl
              px-4 py-3
              outline-none
              focus:ring-2 focus:ring-red-400
            "
          />
        </div>

        {/* Price */}
        <div>
          <label className="text-sm font-medium text-gray-700">
            Price
          </label>

          <input
            type="number"
            name="price"
            placeholder="Enter product price"
            value={form.price}
            onChange={handleChange}
            className="
              w-full mt-2
              border border-gray-300
              rounded-xl
              px-4 py-3
              outline-none
              focus:ring-2 focus:ring-red-400
            "
          />
        </div>

        {/* Category */}
        <div>
          <label className="text-sm font-medium text-gray-700">
            Category
          </label>

          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="
              w-full mt-2
              border border-gray-300
              rounded-xl
              px-4 py-3
              outline-none
              focus:ring-2 focus:ring-red-400
            "
          >

            <option value="">
              Select Category
            </option>

            {categories.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}

          </select>
        </div>

        {/* SubCategory */}
        <div>
          <label className="text-sm font-medium text-gray-700">
            SubCategory
          </label>

          <select
            name="subCategory"
            value={form.subCategory}
            onChange={handleChange}
            className="
              w-full mt-2
              border border-gray-300
              rounded-xl
              px-4 py-3
              outline-none
              focus:ring-2 focus:ring-red-400
            "
          >

            <option value="">
              Select SubCategory
            </option>

            {subCategories.map((s) => (
              <option key={s._id} value={s._id}>
                {s.name}
              </option>
            ))}

          </select>
        </div>

        {/* Description */}
        <div className="md:col-span-2">

          <label className="text-sm font-medium text-gray-700">
            Description
          </label>

          <textarea
            rows={5}
            name="description"
            placeholder="Write product description..."
            value={form.description}
            onChange={handleChange}
            className="
              w-full mt-2
              border border-gray-300
              rounded-xl
              px-4 py-3
              outline-none
              resize-none
              focus:ring-2 focus:ring-red-400
            "
          />

        </div>

        {/* Image Upload */}
        <div className="md:col-span-2">

          <label className="text-sm font-medium text-gray-700">
            Product Image
          </label>

          <label
            className="
              mt-2
              border-2 border-dashed
              border-gray-300
              rounded-2xl
              p-6
              flex flex-col items-center justify-center
              cursor-pointer
              hover:border-red-400
              transition-all
            "
          >

            <UploadCloud
              className="text-gray-400 mb-2"
              size={40}
            />

            <p className="text-sm text-gray-500">
              Click to upload product image
            </p>

            <input
              type="file"
              className="hidden"
              onChange={(e) =>
                setImage(e.target.files[0])
              }
            />

          </label>

          {/* Preview */}
          {image && (
            <div className="mt-4">

              <img
                src={URL.createObjectURL(image)}
                alt="preview"
                className="
                  w-32 h-32
                  object-cover
                  rounded-xl
                  border
                "
              />

            </div>
          )}

        </div>

        {/* Button */}
        <div className="md:col-span-2">

          <button
            disabled={loading}
            className={`
              w-full
              py-3 rounded-xl
              font-semibold
              text-white
              transition-all duration-300

              ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-red-500 hover:bg-red-600"
              }
            `}
          >

            {loading
              ? "Creating Product..."
              : "Add Product"}

          </button>

        </div>

      </form>

    </div>
  );
}