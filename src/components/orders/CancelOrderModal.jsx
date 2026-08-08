import { AlertTriangle, X } from "lucide-react";
import { formatters } from "@/utils/formatters";

const CancelOrderModal = ({
  isOpen,
  onClose,
  onConfirm,
  isCancelling,
  order,
}) => {
  if (!isOpen || !order) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
      onClick={onClose}
    >
      <div
        className="bg-white max-w-md w-full rounded-sm shadow-2xl border border-[#D0C9BA] p-6 relative overflow-hidden transform transition-all duration-300 scale-100"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          disabled={isCancelling}
          className="absolute top-4 right-4 p-1 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
          aria-label="Close dialog"
        >
          <X size={18} />
        </button>

        <div className="w-12 h-12 rounded-full bg-red-50 text-red-600 flex items-center justify-center mb-4">
          <AlertTriangle size={24} />
        </div>

        <h3
          className="text-xl font-bold mb-2"
          style={{ fontFamily: "Playfair Display, serif", color: "#1C1A17" }}
        >
          Cancel Order?
        </h3>

        <div
          className="p-3 mb-4 rounded-sm bg-[#FAF8F5] border border-[#EDE8DE] text-xs flex justify-between items-center"
          style={{ fontFamily: "Outfit, sans-serif" }}
        >
          <div>
            <span className="font-semibold text-[#1C1A17]">
              Order #{order.id}
            </span>
            <p className="text-[#7A7468] mt-0.5">
              {order.items?.length || 0}{" "}
              {order.items?.length === 1 ? "item" : "items"}
            </p>
          </div>
          <span className="font-bold text-[#C4954A] text-sm">
            {formatters.price(order.total)}
          </span>
        </div>

        <p
          className="text-sm mb-6 leading-relaxed"
          style={{ color: "#7A7468", fontFamily: "Outfit, sans-serif" }}
        >
          Are you sure you want to cancel this order? This action cannot be
          undone and your items will not be shipped.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            disabled={isCancelling}
            className="w-full sm:w-auto px-5 py-2.5 text-xs font-medium rounded-sm border border-[#D0C9BA] transition-all duration-200 hover:bg-[#EDE8DE] text-[#1C1A17]"
            style={{
              fontFamily: "Outfit, sans-serif",
              letterSpacing: "0.04em",
            }}
          >
            Keep My Order
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={isCancelling}
            className="w-full sm:w-auto px-5 py-2.5 text-xs font-medium rounded-sm transition-all duration-200 hover:opacity-90 disabled:opacity-50 text-white flex items-center justify-center gap-2"
            style={{
              backgroundColor: "#ef4444",
              fontFamily: "Outfit, sans-serif",
              letterSpacing: "0.04em",
            }}
          >
            {isCancelling ? (
              <>
                <svg
                  className="animate-spin h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Cancelling...
              </>
            ) : (
              "Yes, Cancel Order"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CancelOrderModal;
