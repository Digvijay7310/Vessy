import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axiosInstance from '../utils/axiosInstance'

export default function ProductDetails() {
    const { id } = useParams()
    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(false)

    const fetchProduct = async () => {
        try {
            setLoading(true)
            const res = await axiosInstance.get(`/products/product/${id}`)
            setProduct(res.data)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchProduct()
    }, [id])

    if (loading) {
        return <div className="text-center mt-10">Loading...</div>
    }

    if (!product) {
        return <div className="text-center mt-10">No Product Found</div>
    }

    return (
        <div className="max-w-6xl mx-auto p-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Image Section */}
                <div className="w-full">
                    <img
                        src={product.image?.[0]}
                        alt={product.name}
                        className="w-full h-64 md:h-96 object-fit rounded-xl shadow"
                    />
                </div>

                {/* Details Section */}
                <div className="flex flex-col gap-4">
                    <h1 className="text-sm md:text-xl font-semibold">
                        {product.name}
                    </h1>

                    <p className="text-gray-600 text-xs md:text-base">
                        {product.description}
                    </p>

                    <div className="text-green-600 text-lg md:text-2xl font-bold">
                        ₹{product.price}
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-3 mt-4">
                        <button className="bg-green-500 text-white px-5 py-2 rounded-lg hover:bg-green-600 transition">
                            Add to Cart
                        </button>

                        <button className="border border-green-500 text-green-600 px-5 py-2 rounded-lg hover:bg-green-50 transition">
                            Buy Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}