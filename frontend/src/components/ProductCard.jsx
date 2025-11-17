import React from 'react';

function ProductCard() {
  // 12 dummy products
  const mensdress = new Array(12).fill(null);

  return (
    <div className="p-2">
      <h2 className="text-2xl font-bold mb-4">Mens Dresses</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {mensdress.map((_, idx) => (
          <div
            key={idx}
            className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <img
              src="https://levi.in/cdn/shop/files/Artboard_2_22981c42-9bec-4432-8563-d6091cc4d2d7.png?v=1759226217"
              alt="dress"
              className="w-full h-64 object-contain p-4 bg-gray-50"
            />
            <div className="p-4">
              <p className="font-medium text-gray-800 truncate">Mens Dresskjfjkgsjkshvjgvhgvfdhg</p>
              <p className="text-red-600 font-semibold mt-2">Rs. 1999</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductCard;
