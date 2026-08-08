import { Link } from "react-router-dom";
import OrderStatusBadge from "./OrderStatusBadge";
import { formatters } from "@/utils/formatters";

const OrderCard = ({ order }) => {
  const itemCount =
    order.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;

  return (
    <div className="bg-white p-6 rounded-sm border border-[#D0C9BA] hover:shadow-md transition-shadow">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
        <div>
          <div className="flex items-center gap-3 flex-wrap">
            <Link to={`/orders/${order.id}`}>
              <span
                className="text-sm font-semibold hover:opacity-70 transition-opacity"
                style={{ fontFamily: "Outfit, sans-serif", color: "#C4954A" }}
              >
                #{order.id}
              </span>
            </Link>
            <OrderStatusBadge status={order.status} />
          </div>
          <p
            className="text-xs mt-1"
            style={{ color: "#7A7468", fontFamily: "Outfit, sans-serif" }}
          >
            {formatters.date(order.createdAt)}
          </p>
        </div>
        <div className="text-right">
          {/* ✅ Updated: Order total in NPR */}
          <p
            className="text-lg font-bold"
            style={{ fontFamily: "Outfit, sans-serif", color: "#C4954A" }}
          >
            {formatters.price(order.total)}
          </p>
          <p
            className="text-xs"
            style={{ color: "#7A7468", fontFamily: "Outfit, sans-serif" }}
          >
            {itemCount} {itemCount === 1 ? "item" : "items"}
          </p>
        </div>
      </div>

      {/* Items Preview */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {order.items?.slice(0, 4).map((item) => (
          <div
            key={item.id}
            className="w-10 h-10 flex-shrink-0 bg-stone-200 rounded-sm overflow-hidden"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-contain"
            />
          </div>
        ))}
        {order.items?.length > 4 && (
          <div
            className="w-10 h-10 flex-shrink-0 bg-[#EDE8DE] rounded-sm flex items-center justify-center text-xs font-medium"
            style={{ color: "#7A7468" }}
          >
            +{order.items.length - 4}
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3 mt-4 pt-4 border-t border-[#D0C9BA]">
        <Link
          to={`/orders/${order.id}`}
          className="px-4 py-2 text-xs font-medium rounded-sm transition-all duration-200 hover:opacity-90"
          style={{
            backgroundColor: "#C4954A",
            color: "#fff",
            fontFamily: "Outfit, sans-serif",
            letterSpacing: "0.04em",
          }}
        >
          View Details
        </Link>
        {order.status === "pending" && (
          <button
            onClick={() => {
              /* TODO: Implement cancel order */
            }}
            className="px-4 py-2 text-xs font-medium rounded-sm transition-all duration-200 hover:opacity-90"
            style={{
              backgroundColor: "#ef4444",
              color: "#fff",
              fontFamily: "Outfit, sans-serif",
              letterSpacing: "0.04em",
            }}
          >
            Cancel Order
          </button>
        )}
        {order.status === "delivered" && (
          <button
            onClick={() => {
              /* TODO: Implement reorder */
            }}
            className="px-4 py-2 text-xs font-medium rounded-sm transition-all duration-200 hover:opacity-90"
            style={{
              backgroundColor: "#22c55e",
              color: "#fff",
              fontFamily: "Outfit, sans-serif",
              letterSpacing: "0.04em",
            }}
          >
            Reorder
          </button>
        )}
      </div>
    </div>
  );
};

export default OrderCard;
