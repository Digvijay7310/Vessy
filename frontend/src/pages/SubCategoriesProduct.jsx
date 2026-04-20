import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axiosInstance from '../utils/axiosInstance'
import ProductList from '../components/ProductList'

export default function SubCategoriesProduct() {
    const { id } = useParams()
    const [products, setProduct] = useState([])
    const [loading, setLoading] = useState(true)

    const navigate = useNavigate()

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
        <div className="bg-gray-50 min-h-screen p-1 md:p-6">
            
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
            <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-5">
                {products.map((product) => (
                    <ProductList key={product._id} product={product} />
                ))}
            </div>
        </div>
    )
}