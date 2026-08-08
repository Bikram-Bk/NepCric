import { Link } from "react-router-dom";
import { ShoppingBag, X } from "lucide-react";
import { formatters } from "@/utils/formatters";
import { getImageSrc, handleImageError } from "@/utils/images";

const WishlistItem = ({ item, onRemove, onMoveToCart }) => {
  return (
    <div
      className="flex gap-4 py-4 border-b"
      style={{ borderColor: "#D0C9BA" }}
    >
      {/* Image */}
      <div className="w-24 h-24 sm:w-28 sm:h-28 flex-shrink-0 bg-stone-200 rounded-sm overflow-hidden">
        <img
          src={getImageSrc(item.image)}
          alt={item.name}
          className="w-full h-full object-contain"
          onError={handleImageError}
        />
      </div>

      {/* Info */}
      <div className="flex-1 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <Link to={`/product/${item.id}`}>
            <h3
              className="text-sm font-medium hover:opacity-70 transition-opacity"
              style={{
                fontFamily: "Playfair Display, serif",
                color: "#1C1A17",
              }}
            >
              {item.name}
            </h3>
          </Link>
          <p
            className="text-xs mt-1"
            style={{ color: "#7A7468", fontFamily: "Outfit, sans-serif" }}
          >
            {item.category}
          </p>
          {item.tag && (
            <span
              className="text-xs font-medium"
              style={{ color: "#C4954A", fontFamily: "Outfit, sans-serif" }}
            >
              {item.tag}
            </span>
          )}
        </div>

        <div className="flex items-center gap-4">
          <span
            className="text-sm font-semibold"
            style={{ fontFamily: "Outfit, sans-serif", color: "#C4954A" }}
          >
            {formatters.price(item.price)}
          </span>

          {/* Move to Cart */}
          <button
            onClick={() => onMoveToCart(item)}
            className="px-4 py-2 text-xs font-medium rounded-sm transition-all duration-200 hover:opacity-90 flex items-center gap-1"
            style={{
              backgroundColor: "#C4954A",
              color: "#fff",
              fontFamily: "Outfit, sans-serif",
              letterSpacing: "0.04em",
            }}
          >
            <ShoppingBag size={14} />
            Move to Cart
          </button>

          {/* Remove */}
          <button
            onClick={() => onRemove(item.id)}
            className="w-8 h-8 flex items-center justify-center hover:bg-[#EDE8DE] rounded-full transition-colors"
            aria-label="Remove from wishlist"
          >
            <X size={16} style={{ color: "#7A7468" }} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default WishlistItem;
