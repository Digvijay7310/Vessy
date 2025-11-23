import { createContext, useState, useEffect } from "react";
import { getMyProfile, userLogout } from "../api/userApi";

export const UserAuthContext = createContext();

export default function UserAuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMyProfile()
      .then((res) => setUser(res.data.data))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  const logout = async () => {
    await userLogout();
    setUser(null);
  };

  return (
    <UserAuthContext.Provider value={{ user, setUser, logout, loading }}>
      {children}
    </UserAuthContext.Provider>
  );
}
