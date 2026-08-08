import { ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useNavigate } from "react-router-dom";
import CartItem from "@/components/cart/CartItem";
import EmptyCart from "@/components/cart/EmptyCart";
import CartSummary from "@/components/cart/CartSummary";

const Cart = () => {
  const { cart, total, itemCount, updateQuantity, removeFromCart, clearCart } =
    useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate("/checkout");
  };

  if (cart.length === 0) {
    return (
      <div className="pt-20 pb-8 sm:pt-24 sm:pb-12 lg:pt-28 lg:pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <EmptyCart />
      </div>
    );
  }

  return (
    <div className="pt-20 pb-8 sm:pt-24 sm:pb-12 lg:pt-28 lg:pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <ShoppingBag size={28} style={{ color: "#C4954A" }} />
          <h1
            className="text-2xl sm:text-3xl font-bold"
            style={{ fontFamily: "Playfair Display, serif", color: "#1C1A17" }}
          >
            Your Cart
          </h1>
          <span
            className="text-sm"
            style={{ color: "#7A7468", fontFamily: "Outfit, sans-serif" }}
          >
            ({itemCount} items)
          </span>
        </div>
        <button
          onClick={clearCart}
          className="text-sm transition-colors hover:opacity-60"
          style={{ color: "#7A7468", fontFamily: "Outfit, sans-serif" }}
        >
          Clear Cart
        </button>
      </div>

      {/* Cart Content */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          {cart.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onUpdateQuantity={updateQuantity}
              onRemove={removeFromCart}
            />
          ))}
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <CartSummary
            subtotal={total}
            total={total}
            onCheckout={handleCheckout}
          />
        </div>
      </div>
    </div>
  );
};

export default Cart;
