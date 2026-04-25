import { useLocation } from "react-router-dom"

export default function SearchResult() {
  const location = useLocation()

  const products = location.state?.products || []
  const total = location.state?.total || 0

  return (
    <div className="p-1 md:px-6">
      
      <h2 className="text-lg font-semibold mb-3">
        Search Results ({total})
      </h2>

      {products.length === 0 ? (
        <p>No products found</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2">
          {products.map((item) => (
            <div
              key={item._id}
              className="bg-white p-3 shadow rounded"
            >
              <img
                src={item.image?.[0]}
                alt={item.name}
                className="h-24 w-full object-contain"
              />

              <h3 className="text-[8px] md:text-xs font-semibold mt-2">
                {item.name}
              </h3>
              <p className="text-[6px] md:text-[10px] mt-1 text-gray-500 line-clamp-3">{item.description}</p>

              <p className="text-green-800 text-[10px] md:text-sm font-semibold mt-1">
                ₹{item.price}
              </p>
            </div>
          ))}
        </div>
      )}

    </div>
  )
}