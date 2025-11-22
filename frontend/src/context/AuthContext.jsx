import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import { adminLogout, adminMe } from "../api/adminApi";


export const AuthContext = createContext()

export default function AuthProvider({children}) {
    const [admin, setAdmin] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        adminMe()
        .then((res) => setAdmin(res.data.data))
        .catch(() => setAdmin(null))
        .finally(() => setLoading(false))
    }, []);

    const logout = async() => {
        await adminLogout();
        setAdmin(null);
    }

    return (
        <AuthContext.Provider value={{admin, setAdmin, logout, loading}}>
            {children}
        </AuthContext.Provider>
    )
}