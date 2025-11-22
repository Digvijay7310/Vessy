import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../api/productApi";
import { addToCart } from "../api/cartApi";
import {  useToast } from "../hooks/useToast";

export default function ProductDetails() {
    const { toast } = useToast();
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(false);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        fetchProduct();
    }, [productId]);

    const fetchProduct = async () => {
        setLoading(true);
        try {
            const res = await getProductById(productId);
            setProduct(res.data.data);
        } catch (error) {
            console.error(error);
            toast.error(error?.response?.data?.message || "Failed to fetch product");
        } finally {
            setLoading(false);
        }
    };

    const handleAddToCart = async () => {
        try {
            await addToCart({ productId: product._id, quantity });
            toast.success("Product added to cart");
        } catch (error) {
            console.error(error);
            toast.error(error?.response?.data?.message || "Failed to add product to cart");
        }
    };

    if (loading) return <p className="text-center mt-10">Loading...</p>;
    if (!product) return <p className="text-center mt-10">Product not found</p>;

    return (
        <div className="container mx-auto p-4">
            <div className="flex flex-col md:flex-row gap-6">
                {/* Product Images */}
                <div className="md:w-1/2">
                    <img
                        src={product.images[0]}
                        alt={product.title}
                        className="w-full h-auto rounded"
                    />
                </div>

                {/* Product Info */}
                <div className="md:w-1/2">
                    <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
                    <p className="text-gray-700 mb-4">{product.description}</p>
                    <p className="text-xl font-semibold mb-4">${product.price}</p>

                    <div className="flex items-center gap-2 mb-4">
                        <button
                            className="px-3 py-1 border"
                            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                        >
                            -
                        </button>
                        <span>{quantity}</span>
                        <button
                            className="px-3 py-1 border"
                            onClick={() => setQuantity((q) => q + 1)}
                        >
                            +
                        </button>
                    </div>

                    <button
                        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                        onClick={handleAddToCart}
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
}
