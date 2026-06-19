import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import WishListCard from "../../components/customers/WishListCard";

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState([]);
  const navigate = useNavigate();

  const fetchWishlist = async () => {
    try {
      const res = await axiosInstance.get("/products/wishlist");
      setWishlist(res.data.data.wishlist || []);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  const handleRemove = async (id) => {
    try {
      await axiosInstance.post(`/products/wishlist/toggle/${id}`);
      fetchWishlist();
    } catch (err) {
      console.log(err);
    }
  };

  if (!wishlist.length) {
    return (
      <div className="text-center py-20 text-slate-500">
        No items in wishlist 💔
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">

      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">
          My Wishlist ❤️
        </h1>
        <p className="text-sm text-slate-500">
          Saved items you love
        </p>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {wishlist.map((item) => (
          <WishListCard
            key={item._id}
            item={item}
            navigate={navigate}
            onRemove={handleRemove}
          />
        ))}
      </div>

    </div>
  );
}