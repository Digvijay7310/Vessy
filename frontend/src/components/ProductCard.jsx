import React from "react";

function ProductCard({ 
  image = "https://picsum.photos/400/300", 
  title = "Sample Product Title", 
  description = "This is a short description of the product that gives customers an overview and entices them to buy.", 
  buttonText = "Add to Cart" 
}) {
  return (
    <div className="flex flex-col bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow duration-300">
      
      {/* Product Image */}
      <div className="w-full h-48 md:h-60 flex items-center justify-center bg-gray-100">
        <img 
          src={image} 
          alt={title} 
          className="object-contain w-full h-full p-2"
        />
      </div>
      
      {/* Product Info */}
      <div className="p-3 flex flex-col gap-2 flex-1">
        <h3 className="font-semibold text-sm md:text-base line-clamp-2 md:line-clamp-3">
          {title}
        </h3>
        <p className="text-xs text-gray-600 line-clamp-2 md:line-clamp-3">
          {description}
        </p>
      </div>
      
      {/* Button */}
      <div className="p-3 border-t border-gray-200">
        <button className="w-full bg-red-500 hover:bg-red-600 text-white text-sm md:text-base font-medium py-2 rounded transition-colors duration-200">
          {buttonText}
        </button>
      </div>
    </div>
  );
}

export default ProductCard;