// context/CartContext.jsx
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user, loading: authLoading } = useAuth();

  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/cart");
      setCart(res.data.items || []);
    } catch (err) {
      setCart([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authLoading) return;

    if (!user) {
      setCart([]);
      return;
    }

    fetchCart();
  }, [user, authLoading]);

  const totalItems = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }, [cart]);

  const totalPrice = useMemo(() => {
    return cart.reduce(
      (sum, item) => sum + item.quantity * item.product.price,
      0
    );
  }, [cart]);

  return (
    <CartContext.Provider
      value={{ cart, setCart, fetchCart, loading, totalItems, totalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);