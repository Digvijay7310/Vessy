import React from 'react'
import { useCart } from '../context/CartContext'
import axiosInstance from '../utils/axiosInstance'

export default function useCartActions() {

    const { fetchCart } = useCart()

    const add = async (productId) => {

        try {

            console.log("PRODUCT ID:", productId)

            const res = await axiosInstance.post(
                "/cart/add-cart",
                { productId }
            )

            console.log("ADD RESPONSE:", res.data)

            fetchCart()

        } catch (error) {

            console.log("FULL ERROR:", error)

            console.log("ERROR RESPONSE:", error.response)

            console.log("ERROR DATA:", error.response?.data)

        }
    }

    const decrease = async(productId) => {
        await axiosInstance.post("/cart/decrease-cart", {productId})
        fetchCart()
    }

    const remove = async(productId) => {
        await axiosInstance.post("/cart/remove-cart", {productId})
        fetchCart()
    }

    return { add, decrease, remove }
}