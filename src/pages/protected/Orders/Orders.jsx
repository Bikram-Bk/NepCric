import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { Package, ShoppingBag } from "lucide-react";
import OrderCard from "@/components/orders/OrderCard";
import { orderService } from "@/services/orderService";

const Orders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadOrders = () => {
    setIsLoading(true);
    const allOrders = orderService.getOrders();
    const userOrders = allOrders.filter(
      (order) => order.userId === user?.id || order.userId === "guest",
    );
    setOrders(userOrders);
    setIsLoading(false);
  };

  useEffect(() => {
    loadOrders();
  }, [user]);

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-t-[#C4954A] border-gray-200 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="pt-20 pb-8 sm:pt-24 sm:pb-12 lg:pt-28 lg:pb-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-10">
      <div className="flex items-center gap-3 mb-8">
        <Package size={28} style={{ color: "#C4954A" }} />
        <h1
          className="text-2xl sm:text-3xl font-bold"
          style={{ fontFamily: "Playfair Display, serif", color: "#1C1A17" }}
        >
          My Orders
        </h1>
        <span
          className="text-sm"
          style={{ color: "#7A7468", fontFamily: "Outfit, sans-serif" }}
        >
          ({orders.length} {orders.length === 1 ? "order" : "orders"})
        </span>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-24 h-24 rounded-full bg-[#EDE8DE] flex items-center justify-center mx-auto mb-4">
            <ShoppingBag size={40} style={{ color: "#C4954A" }} />
          </div>
          <h2
            className="text-2xl font-bold mb-2"
            style={{ fontFamily: "Playfair Display, serif", color: "#1C1A17" }}
          >
            No Orders Yet
          </h2>
          <p
            className="text-sm mb-6"
            style={{ color: "#7A7468", fontFamily: "Outfit, sans-serif" }}
          >
            You haven't placed any orders yet. Start shopping!
          </p>
          <Link
            to="/shop"
            className="px-6 py-2.5 text-sm font-medium rounded-sm transition-all duration-200 hover:opacity-90 inline-block"
            style={{
              backgroundColor: "#C4954A",
              color: "#fff",
              fontFamily: "Outfit, sans-serif",
              letterSpacing: "0.06em",
            }}
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              onOrderUpdate={loadOrders}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
