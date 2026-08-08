import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import { orderService } from "@/services/orderService";
import { formatters } from "@/utils/formatters";

const OrderSuccess = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("orderId");
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (orderId) {
      const foundOrder = orderService.getOrder(orderId);
      setOrder(foundOrder);
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [orderId]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-t-[#C4954A] border-gray-200 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
        <div className="text-6xl mb-4">🔍</div>
        <h2
          className="text-2xl font-bold mb-2"
          style={{ fontFamily: "Playfair Display, serif", color: "#1C1A17" }}
        >
          Order Not Found
        </h2>
        <p
          className="text-sm mb-6"
          style={{ color: "#7A7468", fontFamily: "Outfit, sans-serif" }}
        >
          We couldn't find your order. Please check your order ID.
        </p>
        <Link
          to="/shop"
          className="px-6 py-2.5 text-sm font-medium rounded-sm"
          style={{
            backgroundColor: "#C4954A",
            color: "#fff",
            fontFamily: "Outfit, sans-serif",
            letterSpacing: "0.06em",
          }}
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="py-8 sm:py-12 lg:py-16 max-w-3xl mx-auto px-4 sm:px-6 lg:px-10">
      <div className="bg-white p-8 rounded-sm border border-[#D0C9BA] text-center">
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
          <CheckCircle size={40} className="text-green-600" />
        </div>

        <h1
          className="text-2xl sm:text-3xl font-bold mb-2"
          style={{ fontFamily: "Playfair Display, serif", color: "#1C1A17" }}
        >
          Order Placed Successfully!
        </h1>
        <p
          className="text-sm mb-6"
          style={{ color: "#7A7468", fontFamily: "Outfit, sans-serif" }}
        >
          Thank you for your order. We'll send you a confirmation email shortly.
        </p>

        <div className="bg-[#EDE8DE] p-6 rounded-sm text-left mb-8">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p
                className="text-xs font-medium uppercase tracking-wider"
                style={{ color: "#7A7468", fontFamily: "Outfit, sans-serif" }}
              >
                Order ID
              </p>
              <p
                className="text-sm font-semibold"
                style={{ fontFamily: "Outfit, sans-serif", color: "#1C1A17" }}
              >
                {order.id}
              </p>
            </div>
            <div>
              <p
                className="text-xs font-medium uppercase tracking-wider"
                style={{ color: "#7A7468", fontFamily: "Outfit, sans-serif" }}
              >
                Date
              </p>
              <p
                className="text-sm font-semibold"
                style={{ fontFamily: "Outfit, sans-serif", color: "#1C1A17" }}
              >
                {formatters.date(order.createdAt)}
              </p>
            </div>
            <div>
              <p
                className="text-xs font-medium uppercase tracking-wider"
                style={{ color: "#7A7468", fontFamily: "Outfit, sans-serif" }}
              >
                Total
              </p>
              {/* ✅ Updated: Order total in NPR */}
              <p
                className="text-sm font-semibold"
                style={{ fontFamily: "Outfit, sans-serif", color: "#C4954A" }}
              >
                {formatters.price(order.total)}
              </p>
            </div>
            <div>
              <p
                className="text-xs font-medium uppercase tracking-wider"
                style={{ color: "#7A7468", fontFamily: "Outfit, sans-serif" }}
              >
                Status
              </p>
              <p
                className="text-sm font-semibold"
                style={{ fontFamily: "Outfit, sans-serif", color: "#f59e0b" }}
              >
                {formatters.orderStatus(order.status)}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            to="/orders"
            className="flex-1 py-3 text-sm font-medium rounded-sm transition-all duration-200 hover:opacity-90"
            style={{
              backgroundColor: "#C4954A",
              color: "#fff",
              fontFamily: "Outfit, sans-serif",
              letterSpacing: "0.06em",
            }}
          >
            View Orders
          </Link>
          <Link
            to="/shop"
            className="flex-1 py-3 text-sm font-medium rounded-sm transition-all duration-200 hover:opacity-90"
            style={{
              backgroundColor: "#EDE8DE",
              color: "#1C1A17",
              fontFamily: "Outfit, sans-serif",
              border: "1px solid #D0C9BA",
            }}
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
