import { Link } from "react-router-dom";
import { products } from "@/data/products";
import { formatters } from "@/utils/formatters";

// Pick a naturally horizontal landscape product for the banner image
// Kookaburra Cricket Bag (id:5) — landscape aspect ratio, fits banner perfectly
const bannerProduct = products.find((p) => p.id === 5);

// Get the real max discount across all sale products
const maxDiscount = Math.max(
  ...products
    .filter((p) => p.originalPrice)
    .map((p) => Math.round((1 - p.price / p.originalPrice) * 100))
);

const PromotionalBanner = () => {
  return (
    <section className="py-10 sm:py-14 lg:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
      <div
        className="grid md:grid-cols-2 rounded-sm overflow-hidden min-h-[320px] md:min-h-[360px]"
        style={{ backgroundColor: "#2c2a26" }}
      >
        {/* Left Content */}
        <div className="flex flex-col justify-center px-8 sm:px-12 py-10 sm:py-14">
          <p
            className="text-xs font-medium tracking-widest uppercase mb-3"
            style={{ color: "#c4954a", fontFamily: "Outfit, sans-serif" }}
          >
            Limited Time Offer
          </p>
          <h2
            className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight mb-4"
            style={{
              fontFamily: "Playfair Display, serif",
              color: "#f5f0e8",
            }}
          >
            Season Cricket <span style={{ color: "#c4954a" }}>Collection</span>
          </h2>
          <p
            className="text-sm md:text-base leading-relaxed mb-6 max-w-md"
            style={{
              color: "rgba(245,240,232,0.7)",
              fontFamily: "Outfit, sans-serif",
            }}
          >
            Get up to{" "}
            <span style={{ color: "#c4954a", fontWeight: "bold" }}>
              {maxDiscount}% off
            </span>{" "}
            on selected cricket equipment. Premium gear from top brands.
          </p>
          <div className="flex flex-wrap items-center gap-6">
            <Link
              to="/shop"
              className="px-7 py-3 text-xs sm:text-sm font-medium rounded-sm transition-all duration-200 hover:opacity-90 inline-block"
              style={{
                backgroundColor: "#c4954a",
                color: "#fff",
                fontFamily: "Outfit, sans-serif",
                letterSpacing: "0.06em",
              }}
            >
              SHOP NOW
            </Link>
            <div className="flex items-center gap-4">
              <div>
                <p
                  className="text-lg sm:text-xl font-bold"
                  style={{
                    color: "#f5f0e8",
                    fontFamily: "Playfair Display, serif",
                  }}
                >
                  {maxDiscount}%
                </p>
                <p
                  className="text-xs"
                  style={{
                    color: "rgba(245,240,232,0.5)",
                    fontFamily: "Outfit, sans-serif",
                  }}
                >
                  Max Off
                </p>
              </div>
              <div
                className="w-px h-8"
                style={{ backgroundColor: "rgba(245,240,232,0.2)" }}
              />
              <div>
                <p
                  className="text-lg sm:text-xl font-bold"
                  style={{
                    color: "#f5f0e8",
                    fontFamily: "Playfair Display, serif",
                  }}
                >
                  25
                </p>
                <p
                  className="text-xs"
                  style={{
                    color: "rgba(245,240,232,0.5)",
                    fontFamily: "Outfit, sans-serif",
                  }}
                >
                  Products
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Content - Real Product Image */}
        <div
          className="relative min-h-[240px] md:min-h-full overflow-hidden"
          style={{ backgroundColor: "#23211E" }}
        >
          {bannerProduct && (
            <>
              <img
                src={bannerProduct.image}
                alt={bannerProduct.name}
                className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105"
              />
              {/* Overlay gradient for readability of price tag */}
              <div
                className="absolute inset-0 z-10 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(to top, rgba(28,26,23,0.85) 0%, rgba(28,26,23,0.2) 60%, transparent 100%)",
                }}
              />
              {/* Price tag floating label */}
              <div className="absolute bottom-5 right-6 z-20 text-right">
                <p
                  className="text-xs mb-0.5"
                  style={{
                    color: "rgba(245,240,232,0.7)",
                    fontFamily: "Outfit, sans-serif",
                  }}
                >
                  {bannerProduct.name}
                </p>
                <p
                  className="text-base font-bold"
                  style={{ color: "#C4954A", fontFamily: "Outfit, sans-serif" }}
                >
                  {formatters.price(bannerProduct.price)}
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default PromotionalBanner;
