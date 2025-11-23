import { useNavigate } from "react-router-dom";

export default function ProductCard({ product }) {
    const navigate = useNavigate();

    return (
        <div
            className="border rounded shadow hover:shadow-lg p-4 cursor-pointer"
            onClick={() => navigate(`/products/${product._id}`)}
        >
            <img
                src={product.images[0]}
                alt={product.title}
                className="w-full h-48 object-cover mb-4 rounded"
            />
            <h2 className="text-lg font-semibold mb-2">{product.title}</h2>
            <p className="text-gray-600 mb-2">${product.price}</p>
        </div>
    );
}
