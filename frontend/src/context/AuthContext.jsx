import { createContext, useState, useEffect, useContext } from "react";
import axiosInstance from "../api/axiosInstance";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true);

    const fetchProfile = async() => {
        try {
            const res = await axiosInstance.get("/auth/my-profile")
            setUser(res);
        } catch (error) {
            setUser(null);
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchProfile()
    }, [])

    return (
        <AuthContext.Provider value={{user,setUser, loading}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)