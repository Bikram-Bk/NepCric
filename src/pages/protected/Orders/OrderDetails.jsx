import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { orderService } from "@/services/orderService";
import OrderStatusBadge from "@/components/orders/OrderStatusBadge";
import OrderTimeline from "@/components/orders/OrderTimeline";
import { formatters } from "@/utils/formatters";
import { ArrowLeft } from "lucide-react";

const OrderDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadOrder = () => {
      setIsLoading(true);
      const foundOrder = orderService.getOrder(id);

      // Check if order belongs to current user
      if (
        foundOrder &&
        (foundOrder.userId === user?.id || foundOrder.userId === "guest")
      ) {
        setOrder(foundOrder);
      }
      setIsLoading(false);
    };

    loadOrder();
  }, [id, user]);

  if (isLoading) {
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
          The order you're looking for doesn't exist or you don't have access to
          it.
        </p>
        <Link
          to="/orders"
          className="px-6 py-2.5 text-sm font-medium rounded-sm transition-all duration-200 hover:opacity-90"
          style={{
            backgroundColor: "#C4954A",
            color: "#fff",
            fontFamily: "Outfit, sans-serif",
            letterSpacing: "0.06em",
          }}
        >
          Back to Orders
        </Link>
      </div>
    );
  }

  return (
    <div className="py-8 sm:py-12 lg:py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-10">
      {/* Breadcrumb */}
      <div
        className="flex items-center gap-2 text-sm mb-6"
        style={{ fontFamily: "Outfit, sans-serif" }}
      >
        <Link
          to="/"
          className="hover:opacity-60 transition-opacity"
          style={{ color: "#C4954A" }}
        >
          Home
        </Link>
        <span style={{ color: "#7A7468" }}>/</span>
        <Link
          to="/orders"
          className="hover:opacity-60 transition-opacity"
          style={{ color: "#C4954A" }}
        >
          My Orders
        </Link>
        <span style={{ color: "#7A7468" }}>/</span>
        <span style={{ color: "#1C1A17" }}>Order #{order.id}</span>
      </div>

      {/* Back Button */}
      <button
        onClick={() => navigate("/orders")}
        className="flex items-center gap-2 text-sm transition-colors hover:opacity-60 mb-6"
        style={{ color: "#7A7468", fontFamily: "Outfit, sans-serif" }}
      >
        <ArrowLeft size={16} />
        Back to Orders
      </button>

      {/* Order Header */}
      <div className="bg-white p-6 rounded-sm border border-[#D0C9BA] mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 flex-wrap">
              <h1
                className="text-xl font-bold"
                style={{
                  fontFamily: "Playfair Display, serif",
                  color: "#1C1A17",
                }}
              >
                Order #{order.id}
              </h1>
              <OrderStatusBadge status={order.status} />
            </div>
            <p
              className="text-sm mt-1"
              style={{ color: "#7A7468", fontFamily: "Outfit, sans-serif" }}
            >
              Placed on {formatters.dateTime(order.createdAt)}
            </p>
          </div>
          <div className="text-right">
            <p
              className="text-sm"
              style={{ color: "#7A7468", fontFamily: "Outfit, sans-serif" }}
            >
              Total
            </p>
            {/* ✅ Updated: Order total in NPR */}
            <p
              className="text-2xl font-bold"
              style={{ fontFamily: "Outfit, sans-serif", color: "#C4954A" }}
            >
              {formatters.price(order.total)}
            </p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Order Items */}
        <div className="md:col-span-2">
          <div className="bg-white p-6 rounded-sm border border-[#D0C9BA]">
            <h2
              className="text-lg font-bold mb-4"
              style={{
                fontFamily: "Playfair Display, serif",
                color: "#1C1A17",
              }}
            >
              Order Items
            </h2>
            <div className="space-y-3">
              {order.items?.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 py-3 border-b border-[#D0C9BA] last:border-0"
                >
                  <div className="w-16 h-16 flex-shrink-0 bg-stone-200 rounded-sm overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="flex-1">
                    <Link to={`/product/${item.id}`}>
                      <h4
                        className="text-sm font-medium hover:opacity-70 transition-opacity"
                        style={{
                          fontFamily: "Playfair Display, serif",
                          color: "#1C1A17",
                        }}
                      >
                        {item.name}
                      </h4>
                    </Link>
                    <p
                      className="text-xs"
                      style={{
                        color: "#7A7468",
                        fontFamily: "Outfit, sans-serif",
                      }}
                    >
                      Qty: {item.quantity}
                    </p>
                  </div>
                  {/* ✅ Updated: Item total in NPR */}
                  <span
                    className="text-sm font-semibold"
                    style={{
                      fontFamily: "Outfit, sans-serif",
                      color: "#C4954A",
                    }}
                  >
                    {formatters.price(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Order Summary & Timeline */}
        <div className="space-y-6">
          {/* Order Summary */}
          <div className="bg-white p-6 rounded-sm border border-[#D0C9BA]">
            <h2
              className="text-lg font-bold mb-4"
              style={{
                fontFamily: "Playfair Display, serif",
                color: "#1C1A17",
              }}
            >
              Order Summary
            </h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span
                  style={{ color: "#7A7468", fontFamily: "Outfit, sans-serif" }}
                >
                  Subtotal
                </span>
                {/* ✅ Updated: Subtotal in NPR */}
                <span
                  style={{ fontFamily: "Outfit, sans-serif", color: "#1C1A17" }}
                >
                  {formatters.price(order.subtotal)}
                </span>
              </div>
              <div className="flex justify-between">
                <span
                  style={{ color: "#7A7468", fontFamily: "Outfit, sans-serif" }}
                >
                  Shipping
                </span>
                {/* ✅ Updated: Shipping in NPR */}
                <span
                  style={{ fontFamily: "Outfit, sans-serif", color: "#1C1A17" }}
                >
                  {order.shipping === 0
                    ? "Free"
                    : formatters.price(order.shipping)}
                </span>
              </div>
              <div className="flex justify-between">
                <span
                  style={{ color: "#7A7468", fontFamily: "Outfit, sans-serif" }}
                >
                  Tax
                </span>
                {/* ✅ Updated: Tax in NPR */}
                <span
                  style={{ fontFamily: "Outfit, sans-serif", color: "#1C1A17" }}
                >
                  {formatters.price(order.tax)}
                </span>
              </div>
              <div
                className="border-t pt-2 mt-2"
                style={{ borderColor: "#D0C9BA" }}
              >
                <div className="flex justify-between text-lg font-bold">
                  <span
                    style={{
                      fontFamily: "Outfit, sans-serif",
                      color: "#1C1A17",
                    }}
                  >
                    Total
                  </span>
                  {/* ✅ Updated: Total in NPR */}
                  <span
                    style={{
                      fontFamily: "Outfit, sans-serif",
                      color: "#C4954A",
                    }}
                  >
                    {formatters.price(order.total)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Shipping Address */}
          {order.shippingDetails && (
            <div className="bg-white p-6 rounded-sm border border-[#D0C9BA]">
              <h2
                className="text-lg font-bold mb-4"
                style={{
                  fontFamily: "Playfair Display, serif",
                  color: "#1C1A17",
                }}
              >
                Shipping Address
              </h2>
              <p
                className="text-sm"
                style={{ color: "#7A7468", fontFamily: "Outfit, sans-serif" }}
              >
                {order.shippingDetails.firstName}{" "}
                {order.shippingDetails.lastName}
                <br />
                {order.shippingDetails.address}
                <br />
                {order.shippingDetails.city}, {order.shippingDetails.state}{" "}
                {order.shippingDetails.zipCode}
                <br />
                {order.shippingDetails.country}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Order Timeline */}
      <div className="bg-white p-6 rounded-sm border border-[#D0C9BA] mt-6">
        <h2
          className="text-lg font-bold mb-4"
          style={{ fontFamily: "Playfair Display, serif", color: "#1C1A17" }}
        >
          Order Tracking
        </h2>
        <OrderTimeline order={order} />
      </div>
    </div>
  );
};

export default OrderDetails;
