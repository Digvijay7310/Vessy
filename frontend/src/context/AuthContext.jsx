import { createContext, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { adminMe, adminLogout } from "../api/adminApi";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const res = await adminMe();
        setAdmin(res.data.data);
      } catch (err) {
        setAdmin(null);
      } finally {
        setLoading(false);
      }
    };

    // Only fetch admin if on /admins routes
    if (location.pathname.startsWith("/admins") && location.pathname !== "/admins/login") {
      fetchAdmin();
    } else {
      setLoading(false); // don't fetch if not admin route
    }
  }, [location.pathname]); // <-- dependency ensures useEffect only runs when path changes

  const logout = async () => {
    try {
      await adminLogout();
    } finally {
      setAdmin(null);
      navigate("/admins/login", { replace: true });
    }
  };

  if(loading){
    return <p>Loading...</p>
  }

  return (
    <AuthContext.Provider value={{ admin, setAdmin, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
