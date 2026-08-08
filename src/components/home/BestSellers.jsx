import { Link } from "react-router-dom";
import { products } from "@/data/products";
import ProductCard from "@/components/product/ProductCard";

const bestSellers = products
  .filter((p) => p.tag === "Best Seller" || p.tag === "Bestseller")
  .sort((a, b) => b.rating - a.rating)
  .slice(0, 4);

const BestSellers = () => {
  return (
    <section className="py-10 sm:py-14 lg:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
      <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
        <div>
          <p
            className="text-xs font-medium tracking-widest uppercase mb-2"
            style={{ color: "#c4954a", fontFamily: "Outfit, sans-serif" }}
          >
            Popular Picks
          </p>
          <h2
            className="text-2xl sm:text-3xl font-bold"
            style={{
              fontFamily: "Playfair Display, serif",
              color: "#1c1a17",
            }}
          >
            Best Sellers
          </h2>
        </div>
        <Link
          to="/shop"
          className="text-sm font-medium underline underline-offset-4 transition-opacity hover:opacity-60"
          style={{ color: "#1c1a17", fontFamily: "Outfit, sans-serif" }}
        >
          View All →
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        {bestSellers.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default BestSellers;
