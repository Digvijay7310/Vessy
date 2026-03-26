import { createContext, useContext, useEffect, useState } from "react";
import axiosInstance from "../utils/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchAdmin = async () => {
    try {
      const res = await axiosInstance.get("/admins/me", {
        withCredentials: true,
      });
      setAdmin(res.data.data);
    } catch (err) {
      setAdmin(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmin();
  }, []);

  const logout = async () => {
    try {
      await axiosInstance.post("/admins/logout", {}, { withCredentials: true });
      setAdmin(null);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <AuthContext.Provider value={{ admin, setAdmin, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);