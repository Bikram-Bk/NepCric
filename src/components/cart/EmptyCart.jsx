import { Link } from "react-router-dom";
import { ShoppingBag } from "lucide-react";

const EmptyCart = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-24 h-24 rounded-full bg-[#EDE8DE] flex items-center justify-center mb-4">
        <ShoppingBag size={40} style={{ color: "#C4954A" }} />
      </div>
      <h2
        className="text-2xl font-bold mb-2"
        style={{ fontFamily: "Playfair Display, serif", color: "#1C1A17" }}
      >
        Your Cart is Empty
      </h2>
      <p
        className="text-sm mb-6"
        style={{ color: "#7A7468", fontFamily: "Outfit, sans-serif" }}
      >
        Looks like you haven't added any items to your cart yet.
      </p>
      <Link
        to="/shop"
        className="px-6 py-2.5 text-sm font-medium rounded-sm transition-all duration-200 hover:opacity-90"
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
  );
};

export default EmptyCart;
