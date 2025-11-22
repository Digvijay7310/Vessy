import { useEffect, useState } from "react";
import { getAllProducts } from "../api/productApi";
import ProductCard from "../components/ProductCard";
import { useToast } from "../hooks/useToast";

export default function Home() {
    const { toast } = useToast();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const res = await getAllProducts();
            console.log("Products response:", res.data); // debug
            // Access the products array correctly
            setProducts(Array.isArray(res.data.data.products) ? res.data.data.products : []);
        } catch (error) {
            console.error(error);
            toast.error(error?.response?.data?.message || "Failed to fetch products");
            setProducts([]); // fallback
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6 text-center">Our Products</h1>

            {loading ? (
                <p className="text-center">Loading products...</p>
            ) : products.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {products.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
            ) : (
                <p className="text-center">No products available</p>
            )}
        </div>
    );
}
