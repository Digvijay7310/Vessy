import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyWishlist } from "../../data/dummyWishlist";
import WishListCard from '../../components/customers/WishListCard'


export default function WishlistPage() {
  const navigate = useNavigate();
  const [wishlist, setWishlist] = useState(dummyWishlist);
  const [loading] = useState(false);

  // REMOVE ITEM
  const removeFromWishlist = (id) => {
    setWishlist((prev) => prev.filter((item) => item._id !== id));
  };

  // EMPTY STATE
  if (!loading && wishlist.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-gray-500">
        <p className="text-lg font-medium">Your wishlist is empty 💔</p>
        <p className="text-sm mt-1">Start adding products you love</p>
      </div>
    );
  }

  return (
    <div className="">

      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          My Wishlist ❤️
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Saved products you like
        </p>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">

        {wishlist.map((item) => (
          <WishListCard
            key={item._id}
            item={item}
            navigate={navigate}
            onRemove={removeFromWishlist}
          />
        ))}

      </div>
    </div>
  );
}