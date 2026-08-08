import { Link } from "react-router-dom";
import { formatters } from "@/utils/formatters";
import { constants } from "@/utils/constants";

const CartSummary = ({ subtotal, onCheckout }) => {
  // ✅ Updated: Use constants from utils
  const shipping = subtotal > constants.FREE_SHIPPING_THRESHOLD ? 0 : constants.SHIPPING_COST;
  const tax = subtotal * constants.TAX_RATE;

  return (
    <div className="bg-[#EDE8DE] p-6 rounded-sm border border-[#D0C9BA]">
      <h3
        className="text-lg font-bold mb-4"
        style={{ fontFamily: "Playfair Display, serif", color: "#1C1A17" }}
      >
        Order Summary
      </h3>

      <div className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span style={{ color: "#7A7468", fontFamily: "Outfit, sans-serif" }}>
            Subtotal
          </span>
          {/* ✅ Updated: Subtotal in NPR */}
          <span style={{ fontFamily: "Outfit, sans-serif", color: "#1C1A17" }}>
            {formatters.price(subtotal)}
          </span>
        </div>
        <div className="flex justify-between">
          <span style={{ color: "#7A7468", fontFamily: "Outfit, sans-serif" }}>
            Shipping
          </span>
          {/* ✅ Updated: Shipping in NPR */}
          <span style={{ fontFamily: "Outfit, sans-serif", color: "#1C1A17" }}>
            {shipping === 0 ? "Free" : formatters.price(shipping)}
          </span>
        </div>
        <div className="flex justify-between">
          <span style={{ color: "#7A7468", fontFamily: "Outfit, sans-serif" }}>
            VAT (13%)
          </span>
          {/* ✅ Updated: Tax in NPR */}
          <span style={{ fontFamily: "Outfit, sans-serif", color: "#1C1A17" }}>
            {formatters.price(tax)}
          </span>
        </div>

        <div className="border-t pt-3 mt-3" style={{ borderColor: "#D0C9BA" }}>
          <div className="flex justify-between text-lg font-bold">
            <span
              style={{ fontFamily: "Outfit, sans-serif", color: "#1C1A17" }}
            >
              Total
            </span>
            {/* ✅ Updated: Total in NPR */}
            <span
              style={{ fontFamily: "Outfit, sans-serif", color: "#C4954A" }}
            >
              {formatters.price(subtotal + shipping + tax)}
            </span>
          </div>
        </div>
      </div>

      <button
        onClick={onCheckout}
        className="w-full mt-6 py-3 text-sm font-medium rounded-sm transition-all duration-200 hover:opacity-90"
        style={{
          backgroundColor: "#C4954A",
          color: "#fff",
          fontFamily: "Outfit, sans-serif",
          letterSpacing: "0.06em",
        }}
      >
        Proceed to Checkout
      </button>

      <Link
        to="/shop"
        className="block text-center mt-3 text-sm transition-colors hover:opacity-60"
        style={{ color: "#7A7468", fontFamily: "Outfit, sans-serif" }}
      >
        Continue Shopping →
      </Link>
    </div>
  );
};

export default CartSummary;