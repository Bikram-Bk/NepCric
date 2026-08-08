import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Clock, ShoppingBag } from "lucide-react";
import { products } from "@/data/products";
import { formatters } from "@/utils/formatters";
import { useCart } from "@/context/CartContext";

// Sale products: those with an originalPrice (real discount), top 4
const saleProducts = products
  .filter((p) => p.originalPrice !== null && p.originalPrice > p.price)
  .slice(0, 4);

const FlashSale = () => {
  const { addToCart } = useCart();

  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { hours, minutes, seconds } = prev;

        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        }

        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section
      className="py-10 sm:py-14 lg:py-20"
      style={{ background: "linear-gradient(to right, #FFF8F0, #F5F0E8)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl">⚡</span>
              <h2
                className="text-2xl sm:text-3xl font-bold"
                style={{
                  fontFamily: "Playfair Display, serif",
                  color: "#1c1a17",
                }}
              >
                Flash Sale
              </h2>
            </div>

            {/* Timer */}
            <div
              className="flex items-center gap-2 text-sm font-medium"
              style={{ color: "#1c1a17" }}
            >
              <Clock size={16} />
              <span>Ends in:</span>
              <div className="flex gap-1">
                <span
                  className="px-2 py-1 rounded-sm bg-white shadow-sm"
                  style={{ fontFamily: "Outfit, sans-serif" }}
                >
                  {String(timeLeft.hours).padStart(2, "0")}
                </span>
                <span>:</span>
                <span
                  className="px-2 py-1 rounded-sm bg-white shadow-sm"
                  style={{ fontFamily: "Outfit, sans-serif" }}
                >
                  {String(timeLeft.minutes).padStart(2, "0")}
                </span>
                <span>:</span>
                <span
                  className="px-2 py-1 rounded-sm bg-white shadow-sm"
                  style={{ fontFamily: "Outfit, sans-serif" }}
                >
                  {String(timeLeft.seconds).padStart(2, "0")}
                </span>
              </div>
            </div>
          </div>

          <Link
            to="/shop"
            className="text-sm font-medium underline underline-offset-4 transition-opacity hover:opacity-60"
            style={{ color: "#c4954a", fontFamily: "Outfit, sans-serif" }}
          >
            View All →
          </Link>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {saleProducts.map((product) => {
            const discountPct = Math.round(
              (1 - product.price / product.originalPrice) * 100
            );
            return (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                className="group bg-white rounded-sm shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden block"
              >
                {/* Image area */}
                <div className="relative bg-stone-100" style={{ aspectRatio: "1/1" }}>
                  <div className="absolute top-3 left-3 z-10 px-2 py-1 text-[10px] sm:text-xs font-bold rounded-sm bg-red-500 text-white">
                    {discountPct}% OFF
                  </div>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                {/* Info */}
                <div className="p-3 sm:p-4">
                  <p
                    className="text-[10px] sm:text-xs mb-0.5"
                    style={{ color: "#7a7468", fontFamily: "Outfit, sans-serif" }}
                  >
                    {product.category}
                  </p>
                  <h3
                    className="text-xs sm:text-sm font-medium mb-2 line-clamp-1"
                    style={{
                      fontFamily: "Playfair Display, serif",
                      color: "#1c1a17",
                    }}
                  >
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-2 mb-3">
                    <span
                      className="text-sm sm:text-base font-bold"
                      style={{ color: "#c4954a", fontFamily: "Outfit, sans-serif" }}
                    >
                      {formatters.price(product.price)}
                    </span>
                    <span
                      className="text-xs line-through"
                      style={{ color: "#7a7468", fontFamily: "Outfit, sans-serif" }}
                    >
                      {formatters.price(product.originalPrice)}
                    </span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      addToCart(product, 1);
                    }}
                    className="w-full py-2 text-[10px] sm:text-xs font-medium rounded-sm transition-all duration-200 hover:opacity-90 flex items-center justify-center gap-1.5"
                    style={{
                      backgroundColor: "#c4954a",
                      color: "#fff",
                      fontFamily: "Outfit, sans-serif",
                      letterSpacing: "0.04em",
                    }}
                  >
                    <ShoppingBag size={12} />
                    Add to Cart
                  </button>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FlashSale;
