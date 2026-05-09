import { useState, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance"

export default function useAuth(){
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await axiosInstance.get("/customer/me");
                if(res.status === 200) setIsLoggedIn(true)
            } catch (error) {
                setIsLoggedIn(false)
            }
        }
        checkAuth()
    }, [])

    return isLoggedIn
}