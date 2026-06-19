import { createContext, useContext, useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);

  /* FETCH WISHLIST */
  const fetchWishlist = async () => {
    try {
      const res = await axiosInstance.get("/products/wishlist");
      setWishlist(res.data.data.wishlist || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  /* TOGGLE */
  const toggleWishlist = async (productId) => {
    try {
      const res = await axiosInstance.post(
        `/products/wishlist/toggle/${productId}`
      );

      setWishlist(res.data.data.wishlist);
    } catch (error) {
      console.log(error);
    }
  };

  /* CHECK IF WISHLISTED */
  const isWishlisted = (productId) => {
    return wishlist.some(
      (item) =>
        (typeof item === "string"
          ? item
          : item._id
        ) === productId
    );
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        toggleWishlist,
        isWishlisted,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);