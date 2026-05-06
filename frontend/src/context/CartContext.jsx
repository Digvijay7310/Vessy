import React, { createContext, useContext, useEffect, useState } from 'react'
import axiosInstance from '../utils/axiosInstance'

const CartContext = createContext()

export const CartProvider = ({children}) => {
  const [cart, setCart] = useState([])

  const fetchCart = async () => {
    try {
      const res = await axiosInstance.get("/cart")
      setCart(res.data.items || [])
    } catch (error) {
      console.log("Cart fetch Error")
    }
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