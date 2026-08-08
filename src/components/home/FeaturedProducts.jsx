import { Link } from "react-router-dom";
import { products } from "@/data/products";
import ProductCard from "@/components/product/ProductCard";

// New arrivals: products with isNew flag, take first 4
const newArrivals = products.filter((p) => p.isNew).slice(0, 4);

const FeaturedProducts = () => {
  return (
    <section
      id="featured"
      className="py-10 sm:py-14 lg:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-10"
    >
      <div className="flex items-end justify-between mb-10 sm:mb-14 flex-wrap gap-3 sm:gap-4">
        <div>
          <p
            className="text-[10px] sm:text-xs font-medium tracking-widest uppercase mb-2 sm:mb-3"
            style={{ color: "#C4954A", fontFamily: "Outfit, sans-serif" }}
          >
            Just Arrived
          </p>
          <h2
            className="leading-tight"
            style={{
              fontFamily: "Playfair Display, serif",
              fontSize: "clamp(1.5rem, 4vw, 3rem)",
              fontWeight: 500,
              color: "#1C1A17",
            }}
          >
            New Arrivals
          </h2>
        </div>
        <Link
          to="/shop"
          className="text-[10px] sm:text-sm font-medium underline underline-offset-4 transition-opacity hover:opacity-60"
          style={{ color: "#1C1A17", fontFamily: "Outfit, sans-serif" }}
        >
          View All Products →
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
        {newArrivals.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;
