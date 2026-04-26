import {} from 'react'
import axiosInstance from '../utils/axiosInstance'
import { createContext } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useContext } from 'react'

const CartContext = createContext()

export const CartProvider = ({children}) => {
    const [cart, setCart] = useState(null)

    const fetchCart = async() => {
        const res = await axiosInstance.get("/cart/");
        setCart(res.data)
    }

    useEffect(() => {
        fetchCart()
    }, [])

    return (
        <CartContext.Provider value={{cart, setCart, fetchCart}}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => useContext(CartContext)