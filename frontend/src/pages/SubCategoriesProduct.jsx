import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axiosInstance from '../utils/axiosInstance'

export default function SubCategoriesProduct() {
    const { id } = useParams()
    const [products, setProduct] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchProductBySubCategory = async () => {
        try {
            const res = await axiosInstance.get(`/categories/sub-category/${id}`)
            setProduct(res.data)
        } catch (error) {
            console.log("Error in finding product with subCategory")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchProductBySubCategory()
    }, [id])

    return (
        <div className="bg-gray-50 min-h-screen p-4 md:p-6">
            
            {/* Title */}
            <h2 className="text-2xl font-semibold mb-5">Products</h2>

            {/* Loading */}
            {loading && (
                <div className="text-center text-gray-500">Loading products...</div>
            )}

            {/* Empty State */}
            {!loading && products.length === 0 && (
                <div className="flex flex-col items-center justify-center mt-20 text-gray-500">
                    <p className="text-lg">😕 No products found</p>
                    <p className="text-sm">Try another category</p>
                </div>
            )}

            {/* Product Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {products.map((product) => (
                    <div
                        key={product._id}
                        className="bg-white rounded-xl shadow-sm hover:shadow-md transition duration-300 p-3 cursor-pointer"
                    >
                        {/* Image */}
                        <div className="h-36 flex items-center justify-center mb-2">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="h-full object-contain"
                            />
                        </div>

                        {/* Info */}
                        <h5 className="text-sm font-semibold line-clamp-1">
                            {product.name}
                        </h5>

                        <p className="text-xs text-gray-500 line-clamp-2 mb-2">
                            {product.description}
                        </p>

                        {/* Price (optional if exists) */}
                        {product.price && (
                            <p className="text-sm font-bold text-green-600">
                                ₹{product.price}
                            </p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}