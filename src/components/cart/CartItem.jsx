import { Link } from "react-router-dom";
import { Minus, Plus, X } from "lucide-react";
import { formatters } from "@/utils/formatters"; // ✅ Added import

const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
  return (
    <div
      className="flex gap-4 py-4 border-b"
      style={{ borderColor: "#D0C9BA" }}
    >
      {/* Image */}
      <div className="w-24 h-24 sm:w-28 sm:h-28 flex-shrink-0 bg-stone-200 rounded-sm overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-contain"
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
          {/* ✅ Updated: Total price in NPR */}
          <p
            className="text-sm font-semibold mt-1"
            style={{ fontFamily: "Outfit, sans-serif", color: "#C4954A" }}
          >
            {formatters.price(item.price * item.quantity)}
          </p>
        </div>

        <div className="flex items-center gap-4">
          {/* Quantity */}
          <div
            className="flex items-center border rounded-sm"
            style={{ borderColor: "#D0C9BA" }}
          >
            <button
              onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
              className="w-8 h-8 flex items-center justify-center hover:bg-[#EDE8DE] transition-colors"
              disabled={item.quantity <= 1}
            >
              <Minus size={14} />
            </button>
            <span
              className="w-10 text-center text-sm font-medium"
              style={{ fontFamily: "Outfit, sans-serif", color: "#1C1A17" }}
            >
              {item.quantity}
            </span>
            <button
              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
              className="w-8 h-8 flex items-center justify-center hover:bg-[#EDE8DE] transition-colors"
            >
              <Plus size={14} />
            </button>
          </div>

          {/* ✅ Updated: Individual item price in NPR */}
          <span
            className="text-sm font-semibold w-20 text-right"
            style={{ fontFamily: "Outfit, sans-serif", color: "#1C1A17" }}
          >
            {formatters.price(item.price * item.quantity)}
          </span>

          {/* Remove */}
          <button
            onClick={() => onRemove(item.id)}
            className="w-8 h-8 flex items-center justify-center hover:bg-[#EDE8DE] rounded-full transition-colors"
            aria-label="Remove item"
          >
            <X size={16} style={{ color: "#7A7468" }} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
