import { Link } from "react-router-dom";
import { products } from "@/data/products";
import { formatters } from "@/utils/formatters";

const spotlightProduct = products.find((p) => p.id === 6);

const FeatureBanner = () => {
  if (!spotlightProduct) return null;

  return (
    <section
      id="spotlight"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-10 sm:py-14 lg:py-20"
    >
      <div
        className="grid lg:grid-cols-2 rounded-sm overflow-hidden min-h-[380px]"
        style={{ backgroundColor: "#2C2A26" }}
      >
        <div className="flex flex-col justify-center px-10 lg:px-16 py-16 lg:py-20">
          <p
            className="text-xs font-medium tracking-widest uppercase mb-5"
            style={{ color: "#C4954A", fontFamily: "Outfit, sans-serif" }}
          >
            Spotlight Piece
          </p>
          <h2
            className="leading-tight mb-6"
            style={{
              fontFamily: "Playfair Display, serif",
              fontSize: "clamp(2rem, 3.5vw, 2.75rem)",
              fontWeight: 500,
              color: "#F5F0E8",
            }}
          >
            The{" "}
            <em>
              {spotlightProduct.brand}
              <br />
              Pro Bat
            </em>
          </h2>
          <p
            className="text-base leading-relaxed mb-8 max-w-sm"
            style={{
              color: "rgba(245,240,232,0.65)",
              fontFamily: "Outfit, sans-serif",
              fontWeight: 300,
            }}
          >
            {spotlightProduct.description}
          </p>
          <div className="flex gap-4 flex-wrap items-end">
            <div>
              <div
                className="text-2xl font-bold"
                style={{
                  fontFamily: "Playfair Display, serif",
                  color: "#C4954A",
                }}
              >
                {formatters.price(spotlightProduct.price)}
              </div>
              {spotlightProduct.originalPrice && (
                <div
                  className="text-sm line-through mt-0.5"
                  style={{
                    color: "rgba(245,240,232,0.4)",
                    fontFamily: "Outfit, sans-serif",
                  }}
                >
                  {formatters.price(spotlightProduct.originalPrice)}
                </div>
              )}
              <div
                className="text-xs mt-0.5"
                style={{
                  color: "rgba(245,240,232,0.45)",
                  fontFamily: "Outfit, sans-serif",
                }}
              >
                {spotlightProduct.brand} · {spotlightProduct.specifications?.material}
              </div>
            </div>
          </div>
          <Link
            to={`/product/${spotlightProduct.id}`}
            className="mt-8 px-8 py-3.5 text-sm font-medium rounded-sm self-start transition-all duration-200 hover:opacity-90 inline-block"
            style={{
              backgroundColor: "#C4954A",
              color: "#fff",
              fontFamily: "Outfit, sans-serif",
              letterSpacing: "0.06em",
            }}
          >
            SHOP NOW
          </Link>
        </div>
        <div className="relative min-h-64 lg:min-h-0 bg-stone-700">
          <img
            src="/images/bats/gn-pro-bat.jpg"
            alt={spotlightProduct.name}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default FeatureBanner;