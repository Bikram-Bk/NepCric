import { formatters } from "@/utils/formatters";

const OrderSummary = ({ cart, subtotal, shipping, tax, total, onBack }) => {
  return (
    <div className="bg-[#EDE8DE] p-6 rounded-sm border border-[#D0C9BA]">
      <h3
        className="text-lg font-bold mb-4"
        style={{ fontFamily: "Playfair Display, serif", color: "#1C1A17" }}
      >
        Order Summary
      </h3>

      {/* Cart Items */}
      <div className="space-y-3 max-h-60 overflow-y-auto mb-4">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-3 pb-3 border-b border-[#D0C9BA]"
          >
            <div className="w-12 h-12 flex-shrink-0 bg-stone-200 rounded-sm overflow-hidden">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex-1">
              <p
                className="text-sm font-medium"
                style={{
                  fontFamily: "Playfair Display, serif",
                  color: "#1C1A17",
                }}
              >
                {item.name}
              </p>
              <p
                className="text-xs"
                style={{ color: "#7A7468", fontFamily: "Outfit, sans-serif" }}
              >
                Qty: {item.quantity}
              </p>
            </div>
            <span
              className="text-sm font-semibold"
              style={{ fontFamily: "Outfit, sans-serif", color: "#C4954A" }}
            >
              {formatters.price(item.price * item.quantity)}
            </span>
          </div>
        ))}
      </div>

      {/* Totals */}
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span style={{ color: "#7A7468", fontFamily: "Outfit, sans-serif" }}>
            Subtotal
          </span>
          <span style={{ fontFamily: "Outfit, sans-serif", color: "#1C1A17" }}>
            {formatters.price(subtotal)}
          </span>
        </div>
        <div className="flex justify-between">
          <span style={{ color: "#7A7468", fontFamily: "Outfit, sans-serif" }}>
            Shipping
          </span>
          <span style={{ fontFamily: "Outfit, sans-serif", color: "#1C1A17" }}>
            {shipping === 0 ? "Free" : formatters.price(shipping)}
          </span>
        </div>
        <div className="flex justify-between">
          <span style={{ color: "#7A7468", fontFamily: "Outfit, sans-serif" }}>
            Estimated Tax
          </span>
          <span style={{ fontFamily: "Outfit, sans-serif", color: "#1C1A17" }}>
            {formatters.price(tax)}
          </span>
        </div>

        <div className="border-t pt-2 mt-2" style={{ borderColor: "#D0C9BA" }}>
          <div className="flex justify-between text-lg font-bold">
            <span
              style={{ fontFamily: "Outfit, sans-serif", color: "#1C1A17" }}
            >
              Total
            </span>
            <span
              style={{ fontFamily: "Outfit, sans-serif", color: "#C4954A" }}
            >
              {formatters.price(total)}
            </span>
          </div>
        </div>
      </div>

      <button
        onClick={onBack}
        className="w-full mt-4 py-2 text-sm rounded-sm transition-colors hover:bg-[#D0C9BA]"
        style={{
          backgroundColor: "#EDE8DE",
          color: "#1C1A17",
          fontFamily: "Outfit, sans-serif",
          border: "1px solid #D0C9BA",
        }}
      >
        Back to Cart
      </button>
    </div>
  );
};

export default OrderSummary;
