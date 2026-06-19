// context/WishlistContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { useAuth } from "./AuthContext";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const { user, loading: authLoading } = useAuth();

  const [wishlist, setWishlist] = useState([]);

  const fetchWishlist = async () => {
    try {
      const res = await axiosInstance.get("/products/wishlist");
      setWishlist(res.data.data.wishlist || []);
    } catch (err) {
      setWishlist([]);
    }
  };

  useEffect(() => {
    if (authLoading) return;

    if (!user) {
      setWishlist([]);
      return;
    }

    fetchWishlist();
  }, [user, authLoading]);

  const toggleWishlist = async (productId) => {
    try {
      const res = await axiosInstance.post(
        `/products/wishlist/toggle/${productId}`
      );
      setWishlist(res.data.data.wishlist);
    } catch (err) {
      console.log(err);
    }
  };

  const isWishlisted = (productId) => {
    return wishlist.some((item) =>
      (typeof item === "string" ? item : item._id) === productId
    );
  };

  return (
    <WishlistContext.Provider
      value={{ wishlist, toggleWishlist, isWishlisted }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);