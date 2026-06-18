import ProductRemoveButton from "../ProductRemoveButton";

export default function WishlistCard({ item, navigate, onRemove }) {
  return (
    <div className="flex items-center gap-3 p-2 bg-white border rounded-lg">

      {/* IMAGE */}
      <img
        onClick={() => navigate(`/product/${item._id}`)}
        src={item.image}
        className="w-12 h-12 object-contain cursor-pointer"
      />

      {/* TEXT */}
      <div className="flex-1">
        <p className="text-xs font-medium line-clamp-1">
          {item.name}
        </p>

        <p className="text-xs text-green-600">
          ₹{item.price}
        </p>
      </div>

      {/* REMOVE */}
      <ProductRemoveButton
        onClick={() => onRemove(item._id)}
      />

    </div>
  );
}