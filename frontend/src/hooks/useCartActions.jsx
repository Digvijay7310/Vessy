import React from 'react'
import { useCart } from '../context/CartContext'
import axiosInstance from '../utils/axiosInstance'

export default function useCartActions() {
    const {fetchCart} = useCart()

    const add = async(productId) => {
        await axiosInstance.post("/cart/add-cart", {productId})
        fetchCart()
    }

    const decrease = async(productId) => {
        await axiosInstance.post("/cart/decrease-cart", {productId})
        fetchCart()
    }

    const remove = async(productId) => {
        await axiosInstance.post("/cart/remove-cart", {productId})
        fetchCart()
    }
  return (
    {add, decrease, remove}
  )
}
