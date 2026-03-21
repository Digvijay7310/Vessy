import {useState} from "react";
import QuantityButton from "./QuantityButton";

function ProductCard({ 
  image = "https://picsum.photos/400/300", 
  title = "Sample Product Title", 
  description = "This is a short description of the product that gives customers an overview and entices them to buy."
}) 

{
  return (
    <div className="border flex flex-col gap-2 bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow duration-300">
      
      {/* Product Image */}
      <div className="w-full h-48 md:h-60 flex items-center justify-center bg-gray-100">
        <img 
          src={image} 
          alt={title} 
          className="object-contain w-full h-full p-0.5"
        />
      </div>
      
      {/* Product Info */}
      <div className="p-1 flex flex-col gap-2 flex-1">
        <h3 className="font-semibold text-sm md:text-base line-clamp-2 md:line-clamp-3">
          {title}
        </h3>
        <p className="text-xs text-gray-600 line-clamp-2 md:line-clamp-3">
          {description}
        </p>
      </div>
      
      {/* Button */}
      <div className="p-1 border-t border-gray-200">
        <QuantityButton />
      </div>
    </div>
  );
}

export default ProductCard;