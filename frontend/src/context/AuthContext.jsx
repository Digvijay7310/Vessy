// context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // CHECK LOGIN ON APP LOAD
  const loadUser = async () => {
    try {
      const res = await axiosInstance.get("/customer/me");
      setUser(res.data.customer);
    } catch (err) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  // LOGIN (after API success)
  const login = (customer) => {
    setUser(customer);
  };

  // LOGOUT
  const logout = async () => {
    try {
      await axiosInstance.post("/customer/logout");
    } catch (err) {
      console.log(err);
    } finally {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, login, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);