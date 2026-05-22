import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import axiosInstance from "../utils/axiosInstance";

const CartContext = createContext();

export const CartProvider = ({ children }) => {

  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  // FETCH CART
  const fetchCart = async () => {
    try {
      setLoading(true);

      const res = await axiosInstance.get("/cart");

      setCart(res.data.items || []);
    } catch (error) {
      console.log("Cart Fetch Error:", error);
      setCart([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // TOTAL ITEMS
  const totalItems = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.quantity, 0);
  }, [cart]);

  // TOTAL PRICE
  const totalPrice = useMemo(() => {
    return cart.reduce(
      (acc, item) =>
        acc + item.quantity * item.product.price,
      0
    );
  }, [cart]);

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        fetchCart,
        loading,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);