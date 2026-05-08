import CategoryWithSubCategory from "../components/CategoryWithSubCategory";

export default function Home() {
  return (
    <div className="flex flex-col gap-6">

      {/* HERO SECTION (future slider place) */}
      <div className="w-full bg-gradient-to-r from-gray-900 to-gray-700 text-white p-10 rounded-xl">
        <h1 className="text-3xl font-bold">Welcome to Your Store</h1>
        <p className="text-gray-300 mt-2">
          Discover products, deals & categories in one place
        </p>
      </div>

      {/* CATEGORY SECTION */}
      <CategoryWithSubCategory />

    </div>
  );
}