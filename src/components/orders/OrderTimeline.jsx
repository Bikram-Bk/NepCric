import { Check, Clock } from "lucide-react";
import { formatters } from "@/utils/formatters";

const OrderTimeline = ({ order }) => {
  const statuses = [
    { key: "pending", label: "Order Placed", icon: Check },
    { key: "processing", label: "Processing", icon: Check },
    { key: "shipped", label: "Shipped", icon: Check },
    { key: "delivered", label: "Delivered", icon: Check },
  ];

  const currentStatusIndex = statuses.findIndex((s) => s.key === order.status);
  const isCancelled = order.status === "cancelled";

  if (isCancelled) {
    return (
      <div className="text-center py-4">
        <p
          className="text-sm font-medium"
          style={{ color: "#ef4444", fontFamily: "Outfit, sans-serif" }}
        >
          This order has been cancelled.
        </p>
      </div>
    );
  }

  return (
    <div className="relative">
      {statuses.map((status, index) => {
        const isCompleted = index <= currentStatusIndex;
        const isCurrent = index === currentStatusIndex;

        return (
          <div
            key={status.key}
            className="flex items-start gap-4 pb-6 last:pb-0 relative"
          >
            {index < statuses.length - 1 && (
              <div
                className="absolute left-4 top-8 w-0.5 h-12"
                style={{
                  backgroundColor: isCompleted ? "#C4954A" : "#D0C9BA",
                }}
              />
            )}
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                isCompleted
                  ? "bg-[#C4954A] text-white"
                  : "bg-[#EDE8DE] text-[#7A7468]"
              }`}
            >
              {isCompleted ? <Check size={16} /> : <Clock size={16} />}
            </div>

            <div className="flex-1 pt-1">
              <div className="flex items-center gap-3">
                <span
                  className={`text-sm font-medium ${
                    isCompleted ? "text-[#1C1A17]" : "text-[#7A7468]"
                  }`}
                  style={{ fontFamily: "Outfit, sans-serif" }}
                >
                  {status.label}
                </span>
                {isCurrent && (
                  <span
                    className="text-xs px-2 py-0.5 rounded-full"
                    style={{
                      backgroundColor: "#C4954A20",
                      color: "#C4954A",
                      fontFamily: "Outfit, sans-serif",
                    }}
                  >
                    Current
                  </span>
                )}
              </div>
              {isCompleted && (
                <p
                  className="text-xs mt-0.5"
                  style={{ color: "#7A7468", fontFamily: "Outfit, sans-serif" }}
                >
                  {formatters.dateTime(order.createdAt)}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default OrderTimeline;
